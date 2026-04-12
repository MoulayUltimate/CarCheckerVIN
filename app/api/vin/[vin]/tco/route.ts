import { NextRequest, NextResponse } from 'next/server'
import { vehicleService } from '@/lib/vehicle-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params
  const { searchParams } = new URL(request.url)
  const zip = searchParams.get('zip') || '90210'

  const cleanVin = vin.toUpperCase().trim()

  try {
    const data = await vehicleService.getTCO(cleanVin)
    return NextResponse.json(data)
  } catch (error) {
    console.error('TCO API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ownership costs', code: 'API_ERROR' },
      { status: 500 }
    )
  }
}
