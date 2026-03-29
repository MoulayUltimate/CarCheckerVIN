import { NextRequest, NextResponse } from 'next/server'

const API_BASE = 'https://api.auto.dev'
const API_KEY = process.env.AUTO_DEV_API_KEY

async function fetchWithAuth(endpoint: string) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
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

  const cleanVin = vin.toUpperCase().trim()

  try {
    const response = await fetchWithAuth(`/recalls/${cleanVin}`)

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: error.error || 'Failed to fetch recalls', code: error.code },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Recalls API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle recalls', code: 'API_ERROR' },
      { status: 500 }
    )
  }
}
