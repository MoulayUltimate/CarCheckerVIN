import { NextRequest, NextResponse } from 'next/server'
import { vehicleService } from '@/lib/vehicle-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params
  const cleanVin = vin.toUpperCase().trim()

  try {
    const data = await vehicleService.getRecalls(cleanVin)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Recalls API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle recalls', code: 'API_ERROR' },
      { status: 500 }
    )
  }
}
