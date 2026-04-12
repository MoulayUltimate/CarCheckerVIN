import { VehicleData, VINProvider, Recall, DetailedSpecs, TCOData } from './types'

class NHTSAProvider implements VINProvider {
    async decode(vin: string): Promise<VehicleData> {
        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
            if (!response.ok) throw new Error('NHTSA API request failed')
            const data = await response.json()
            const results = data.Results || []
            const getField = (name: string) => results.find((r: any) => r.Variable === name)?.Value

            return {
                vin,
                vinValid: true,
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
        // NHTSA doesn't have a specific "specs" API like Auto.dev, 
        // but the decode call already returns most specs.
        // For now, we return a basic structure.
        const data = await this.decode(vin)
        return {
            vehicle: { year: data.year || 0, make: data.make || '', model: data.model || '' },
            specs: {
                bodyClass: data.bodyClass,
                engine: data.engineDisplacement,
                drive: data.driveType,
            }
        }
    }

    async getTCO(vin: string): Promise<TCOData> {
        return { vin, data: {} } // No TCO from NHTSA
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
            
            // Fetch real photos from auto.dev
            let photos: string[] = []
            try {
                const photoRes = await this.fetchWithAuth(`/photos/${vin}`)
                if (photoRes.ok) {
                    const photoData = await photoRes.json()
                    const retailPhotos = photoData?.data?.retail || []
                    const wholesalePhotos = photoData?.data?.wholesale || []
                    // Photos could be strings or objects with a url property
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
        const response = await this.fetchWithAuth(`/recalls/${vin}`)
        if (!response.ok) return []
        return response.json()
    }

    async getSpecs(vin: string): Promise<DetailedSpecs> {
        const response = await this.fetchWithAuth(`/specs/${vin}`)
        if (!response.ok) return {} as DetailedSpecs
        return response.json()
    }

    async getTCO(vin: string): Promise<TCOData> {
        const response = await this.fetchWithAuth(`/tco/${vin}`)
        if (!response.ok) return { vin }
        return response.json()
    }
}

export class VehicleService {
    private provider: VINProvider

    constructor() {
        if (process.env.CLEARVIN_TOKEN) {
            this.provider = new NHTSAProvider()
        } else if (process.env.AUTO_DEV_API_KEY) {
            this.provider = new AutoDevProvider(process.env.AUTO_DEV_API_KEY)
        } else {
            this.provider = new NHTSAProvider()
        }
    }

    async decodeVin(vin: string): Promise<VehicleData> {
        const result = await this.provider.decode(vin)
        // If Auto.dev API fails or throws a 500 error, gracefully fallback to the federal NHTSA database
        if (!result.vinValid && this.provider instanceof AutoDevProvider) {
            console.warn(`AutoDevProvider failed for VIN ${vin}. Falling back to NHTSAProvider.`)
            const fallbackProvider = new NHTSAProvider()
            const fallbackResult = await fallbackProvider.decode(vin)
            
            // Even if we fallback to NHTSA, try to salvage photos from Auto.dev since their photo API often works while the VIN api fails
            try {
                const autoDev = this.provider as AutoDevProvider;
                // Exposing private fetchWithAuth is tricky, let's just make a new direct fetch call or just cast it
                const authFetch = autoDev['fetchWithAuth'].bind(autoDev);
                const photoRes = await authFetch(`/photos/${vin}`);
                if (photoRes.ok) {
                    const photoData = await photoRes.json()
                    const retailPhotos = photoData?.data?.retail || []
                    const wholesalePhotos = photoData?.data?.wholesale || []
                    const extractUrl = (p: any): string => typeof p === 'string' ? p : (p.url || p.href || p.link || '')
                    fallbackResult.photos = [...retailPhotos.map(extractUrl), ...wholesalePhotos.map(extractUrl)].filter(Boolean)
                }
            } catch (error) {
                console.error("Failed to salvage photos from Auto.dev during fallback", error)
            }
            
            return fallbackResult
        }
        return result
    }

    async getRecalls(vin: string): Promise<Recall[]> {
        return this.provider.getRecalls ? this.provider.getRecalls(vin) : []
    }

    async getSpecs(vin: string): Promise<DetailedSpecs> {
        return this.provider.getSpecs ? this.provider.getSpecs(vin) : {} as DetailedSpecs
    }

    async getTCO(vin: string): Promise<TCOData> {
        return this.provider.getTCO ? this.provider.getTCO(vin) : { vin }
    }
}

export const vehicleService = new VehicleService()
