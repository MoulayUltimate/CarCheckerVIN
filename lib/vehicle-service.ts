import { VehicleData, VINProvider, Recall, DetailedSpecs, TCOData } from './types'

class NHTSAProvider implements VINProvider {
    async decode(vin: string): Promise<VehicleData> {
        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
            if (!response.ok) throw new Error('NHTSA API request failed')
            const data = await response.json()
            const results = data.Results || []
            const getField = (name: string) => results.find((r: any) => r.Variable === name)?.Value
            
            // Check for valid decode - NHTSA Error Code "0" means Success
            const errorCode = getField('Error Code')
            const isValid = errorCode === '0'

            return {
                vin,
                vinValid: isValid,
                year: parseInt(getField('Model Year')),
                make: getField('Make'),
                model: getField('Model'),
                trim: getField('Trim'),
                bodyClass: getField('Body Class'),
                engineCylinders: getField('Engine Number of Cylinders'),
                engineDisplacement: getField('Displacement (L)'),
                fuelType: getField('Fuel Type - Primary'),
                driveType: getField('Drive Type'),
                vehicleType: getField('Vehicle Type'),
                manufacturer: getField('Manufacturer Name'),
                origin: getField('Plant Country'),
                photos: [],
                recalls: { count: 0 },
                error: isValid ? undefined : getField('Error Text')
            }
        } catch (error) {
            console.error('NHTSA Provider Error:', error)
            return { vin, vinValid: false, error: 'Failed to decode VIN' }
        }
    }

    async getRecalls(vin: string): Promise<Recall[]> {
        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getrecallsbyvin/${vin}?format=json`)
            if (!response.ok) return []
            const data = await response.json()
            return (data.Results || []).map((r: any) => ({
                manufacturer: r.Manufacturer,
                nhtsaCampaignNumber: r.NHTSACampaignNumber,
                reportReceivedDate: r.ReportReceivedDate,
                component: r.Component,
                summary: r.Summary,
                consequence: r.Consequence,
                remedy: r.Remedy,
            }))
        } catch {
            return []
        }
    }

    async getSpecs(vin: string): Promise<DetailedSpecs> {
        const data = await this.decode(vin)
        return {
            vehicle: { 
                year: data.year || 0, 
                make: data.make || '', 
                model: data.model || '' 
            },
            specs: {
                bodyClass: data.bodyClass,
                engine: data.engineDisplacement,
                drive: data.driveType,
                cylinders: data.engineCylinders,
                origin: data.origin,
                manufacturer: data.manufacturer
            }
        }
    }

    async getTCO(vin: string): Promise<TCOData> {
        return { vin } // NHTSA doesn't have TCO
    }
}

class AutoDevProvider implements VINProvider {
    private apiKey: string
    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    private async fetchWithAuth(endpoint: string) {
        return fetch(`https://api.auto.dev${endpoint}`, {
            headers: { 'Authorization': `Bearer ${this.apiKey}` },
            cache: 'no-store',
        })
    }

    async decode(vin: string): Promise<VehicleData> {
        try {
            const response = await this.fetchWithAuth(`/vin/${vin}`)
            if (!response.ok) throw new Error('Auto.dev API request failed')
            const data = await response.json()
            
            let photos: string[] = []
            try {
                const photoRes = await this.fetchWithAuth(`/photos/${vin}`)
                if (photoRes.ok) {
                    const photoData = await photoRes.json()
                    const retailPhotos = photoData?.data?.retail || []
                    const wholesalePhotos = photoData?.data?.wholesale || []
                    const extractUrl = (p: any): string => typeof p === 'string' ? p : (p.url || p.href || p.link || '')
                    photos = [...retailPhotos.map(extractUrl), ...wholesalePhotos.map(extractUrl)].filter(Boolean)
                }
            } catch (e) {
                console.error('Auto.dev API photos failed:', e)
            }

            return {
                vin: data.vin,
                vinValid: data.vinValid,
                year: data.vehicle?.year,
                make: data.make,
                model: data.model,
                trim: data.trim,
                bodyClass: data.body,
                engineCylinders: data.engine?.split(' ')[0],
                engineDisplacement: data.engine,
                fuelType: '',
                driveType: data.drive,
                vehicleType: data.type,
                manufacturer: data.vehicle?.manufacturer,
                origin: data.origin,
                photos: photos,
                recalls: { count: 0 },
            }
        } catch (error) {
            console.error('Auto.dev Provider Error:', error)
            return { vin, vinValid: false, error: 'Failed to decode VIN' }
        }
    }

    async getRecalls(vin: string): Promise<Recall[]> {
        try {
            const response = await this.fetchWithAuth(`/recalls/${vin}`)
            if (!response.ok) return []
            return response.json()
        } catch {
            return []
        }
    }

    async getSpecs(vin: string): Promise<DetailedSpecs> {
        try {
            const response = await this.fetchWithAuth(`/specs/${vin}`)
            if (!response.ok) return {} as DetailedSpecs
            return response.json()
        } catch {
            return {} as DetailedSpecs
        }
    }

    async getTCO(vin: string): Promise<TCOData> {
        try {
            const response = await this.fetchWithAuth(`/tco/${vin}`)
            if (!response.ok) return { vin }
            return response.json()
        } catch {
            return { vin }
        }
    }
}

export class VehicleService {
    private provider: VINProvider
    private fallbackProvider: VINProvider

    constructor() {
        this.fallbackProvider = new NHTSAProvider()
        if (process.env.AUTO_DEV_API_KEY) {
            this.provider = new AutoDevProvider(process.env.AUTO_DEV_API_KEY)
        } else {
            this.provider = this.fallbackProvider
        }
    }

    async decodeVin(vin: string): Promise<VehicleData> {
        const result = await this.provider.decode(vin)
        
        // If primary provider fails or returns incomplete invalid data, try fallback
        if (!result.vinValid && this.provider !== this.fallbackProvider) {
            console.warn(`Primary provider failed for VIN ${vin}. Falling back to NHTSA.`)
            const fallbackResult = await this.fallbackProvider.decode(vin)
            
            // Try salvaging photos even on fallback
            if (this.provider instanceof AutoDevProvider) {
                try {
                    const autoDev = this.provider as AutoDevProvider;
                    const authFetch = autoDev['fetchWithAuth'].bind(autoDev);
                    const photoRes = await authFetch(`/photos/${vin}`);
                    if (photoRes.ok) {
                        const photoData = await photoRes.json()
                        const extractUrl = (p: any): string => typeof p === 'string' ? p : (p.url || p.href || p.link || '')
                        const photos = [...(photoData?.data?.retail || []), ...(photoData?.data?.wholesale || [])].map(extractUrl).filter(Boolean)
                        if (photos.length > 0) fallbackResult.photos = photos
                    }
                } catch {}
            }
            return fallbackResult
        }
        return result
    }

    async getRecalls(vin: string): Promise<Recall[]> {
        // Try primary
        let recalls = this.provider.getRecalls ? await this.provider.getRecalls(vin) : []
        
        // If primary has none and we have a fallback, try fallback
        if ((!recalls || recalls.length === 0) && this.provider !== this.fallbackProvider) {
            recalls = await this.fallbackProvider.getRecalls!(vin)
        }
        return recalls
    }

    async getSpecs(vin: string): Promise<DetailedSpecs> {
        // Try primary
        let specs = this.provider.getSpecs ? await this.provider.getSpecs(vin) : {} as DetailedSpecs
        
        // If primary has no detailed specs (Auto.dev often returns an object with vehicle but no actual specs)
        const hasDetailedSpecs = specs && specs.specs && Object.keys(specs.specs).length > 2
        
        if (!hasDetailedSpecs && this.provider !== this.fallbackProvider) {
            const fallbackSpecs = await this.fallbackProvider.getSpecs!(vin)
            // Merge or replace
            if (!specs.vehicle) {
                specs = fallbackSpecs
            } else {
                specs.specs = { ...(specs.specs || {}), ...fallbackSpecs.specs }
            }
        }
        return specs
    }

    async getTCO(vin: string): Promise<TCOData> {
        return this.provider.getTCO ? this.provider.getTCO(vin) : { vin }
    }
}

export const vehicleService = new VehicleService()
