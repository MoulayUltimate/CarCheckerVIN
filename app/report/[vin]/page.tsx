import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VehicleHeader } from '@/components/report/vehicle-header'
import { VehicleSpecs } from '@/components/report/vehicle-specs'
import { VehicleRecalls } from '@/components/report/vehicle-recalls'
import { VehicleTCO } from '@/components/report/vehicle-tco'
import { VehiclePhotos } from '@/components/report/vehicle-photos'
import { ReportSidebar } from '@/components/report/report-sidebar'
import { VehicleData } from '@/lib/types'

const API_BASE = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

async function getVinData(vin: string): Promise<VehicleData | null> {
  try {
    const response = await fetch(`${API_BASE}/api/vin/${vin}`, {
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching VIN data:', error)
    return null
  }
}

interface PageProps {
  params: Promise<{ vin: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vin } = await params
  const data = await getVinData(vin)

  if (!data || !data.vinValid) {
    return {
      title: 'Invalid VIN',
      description: 'The VIN you entered is invalid or could not be decoded.',
    }
  }

  const title = `${data.year} ${data.make} ${data.model} ${data.trim || ''} - Vehicle Report`
  const description = `Get detailed vehicle information for VIN ${vin}. View specs, recalls, ownership costs, and more for this ${data.year} ${data.make} ${data.model}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default async function ReportPage({ params }: PageProps) {
  const { vin } = await params
  const data = await getVinData(vin.toUpperCase())

  if (!data || !data.vinValid) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <VehicleHeader data={data} />

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {data.photos && data.photos.length > 0 && (
                <VehiclePhotos photos={data.photos} />
              )}
              <VehicleSpecs vin={vin} data={data} />
              <VehicleRecalls vin={vin} />
              <VehicleTCO vin={vin} />
            </div>
            <div className="lg:col-span-1">
              <ReportSidebar data={data} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
