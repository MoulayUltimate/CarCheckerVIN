import { NextRequest, NextResponse } from 'next/server'
import { vehicleService } from '@/lib/vehicle-service'

export const dynamic = 'force-dynamic'


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params
  const cleanVin = vin.toUpperCase().trim()

  try {
    const data = await vehicleService.decodeVin(cleanVin)

    if (!data.vinValid) {
      return NextResponse.json(
        { error: data.error || 'Failed to decode VIN', code: 'DECODE_ERROR' },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('VIN API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data', code: 'API_ERROR' },
      { status: 500 }
    )
  }
}
