import { NextRequest, NextResponse } from 'next/server'

const API_BASE = 'https://api.auto.dev'
const API_KEY = process.env.AUTO_DEV_API_KEY

interface VinDecodeResponse {
  vin: string
  vinValid: boolean
  wmi?: string
  origin?: string
  squishVin?: string
  checkDigit?: string
  checksum?: boolean
  type?: string
  make?: string
  model?: string
  trim?: string
  style?: string
  body?: string
  engine?: string
  drive?: string
  transmission?: string
  vehicle?: {
    vin: string
    year: number
    make: string
    model: string
    manufacturer?: string
  }
  ambiguous?: boolean
}

interface PhotosResponse {
  data: {
    retail: string[]
  }
}

interface ErrorResponse {
  status: number
  error: string
  code: string
  path: string
  requestId?: string
}

async function fetchWithAuth(endpoint: string) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  })
  return response
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  // Validate VIN format
  const cleanVin = vin.toUpperCase().trim()
  if (cleanVin.length !== 17) {
    return NextResponse.json(
      { error: 'VIN must be exactly 17 characters', code: 'INVALID_VIN_FORMAT' },
      { status: 400 }
    )
  }

  if (/[IOQ]/i.test(cleanVin)) {
    return NextResponse.json(
      { error: 'VIN cannot contain letters I, O, or Q', code: 'INVALID_VIN_FORMAT' },
      { status: 400 }
    )
  }

  try {
    // Fetch VIN decode and photos in parallel
    const [vinResponse, photosResponse] = await Promise.all([
      fetchWithAuth(`/vin/${cleanVin}`),
      fetchWithAuth(`/photos/${cleanVin}`),
    ])

    if (!vinResponse.ok) {
      const error: ErrorResponse = await vinResponse.json()
      return NextResponse.json(
        { error: error.error || 'Failed to decode VIN', code: error.code },
        { status: vinResponse.status }
      )
    }

    const vinData: VinDecodeResponse = await vinResponse.json()
    
    let photos: string[] = []
    if (photosResponse.ok) {
      const photosData: PhotosResponse = await photosResponse.json()
      photos = photosData.data?.retail || []
    }

    return NextResponse.json({
      ...vinData,
      photos,
    })
  } catch (error) {
    console.error('VIN API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data', code: 'API_ERROR' },
      { status: 500 }
    )
  }
}
