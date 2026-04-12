'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Gauge,
  Fuel,
  Ruler,
  Cog,
  Shield,
  Palette
} from 'lucide-react'

import { VehicleData } from '@/lib/types'

interface VehicleSpecsProps {
  vin: string
  data: VehicleData
}

interface SpecsData {
  vehicle?: {
    year: number
    make: string
    model: string
  }
  specs?: {
    name?: string
    price?: {
      baseMsrp?: number
      baseInvoice?: number
    }
    totalSeating?: number
    color?: {
      exterior?: Array<{ name: string; rgb?: string }>
      interior?: Array<{ name: string; rgb?: string }>
    }
    features?: {
      engine?: Record<string, string | number | boolean>
      fuel?: Record<string, string | number>
      measurements?: Record<string, string | number>
      driveTrain?: Record<string, string>
      warranty?: Record<string, string>
      safety?: Record<string, boolean | string>
    }
  }
}

export function VehicleSpecs({ vin, data }: VehicleSpecsProps) {
  const [specs, setSpecs] = useState<SpecsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSpecs() {
      try {
        const response = await fetch(`/api/vin/${vin}/specs`)
        if (!response.ok) {
          throw new Error('Failed to fetch specifications')
        }
        const specsData = await response.json()
        setSpecs(specsData)
      } catch (err) {
        setError('Specifications not available for this vehicle')
      } finally {
        setLoading(false)
      }
    }
    fetchSpecs()
  }, [vin])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="h-5 w-5" />
          Vehicle Specifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SpecsSkeleton />
        ) : error || !specs?.specs ? (
          <BasicSpecs data={data} />
        ) : (
          <DetailedSpecs specs={specs.specs} data={data} />
        )}
      </CardContent>
    </Card>
  )
}

function BasicSpecs({ data }: { data: VehicleData }) {
  const basicSpecs = [
    { label: 'Engine', value: data.engineDisplacement },
    { label: 'Transmission', value: 'N/A' },
    { label: 'Drivetrain', value: data.driveType },
    { label: 'Body Style', value: data.bodyClass },
  ].filter(spec => spec.value)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {basicSpecs.map((spec) => (
        <div key={spec.label} className="rounded-lg border p-4">
          <p className="text-sm font-medium text-muted-foreground">{spec.label}</p>
          <p className="mt-1 text-lg font-semibold">{spec.value}</p>
        </div>
      ))}
      <p className="col-span-full text-sm text-muted-foreground">
        Detailed specifications require a premium plan. Basic vehicle information shown above.
      </p>
    </div>
  )
}

function DetailedSpecs({ specs, data }: { specs: NonNullable<SpecsData['specs']>; data: VehicleSpecsProps['data'] }) {
  const { features, color, price } = specs

  return (
    <Tabs defaultValue="engine" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
        <TabsTrigger value="engine" className="gap-1">
          <Gauge className="h-4 w-4 hidden sm:inline" />
          Engine
        </TabsTrigger>
        <TabsTrigger value="fuel" className="gap-1">
          <Fuel className="h-4 w-4 hidden sm:inline" />
          Fuel
        </TabsTrigger>
        <TabsTrigger value="dimensions" className="gap-1">
          <Ruler className="h-4 w-4 hidden sm:inline" />
          Size
        </TabsTrigger>
        <TabsTrigger value="drivetrain" className="gap-1">
          <Cog className="h-4 w-4 hidden sm:inline" />
          Drive
        </TabsTrigger>
        <TabsTrigger value="safety" className="gap-1">
          <Shield className="h-4 w-4 hidden sm:inline" />
          Safety
        </TabsTrigger>
        <TabsTrigger value="colors" className="gap-1">
          <Palette className="h-4 w-4 hidden sm:inline" />
          Colors
        </TabsTrigger>
      </TabsList>

      <TabsContent value="engine" className="mt-4">
        <SpecGrid specs={features?.engine || { engine: data.engineDisplacement || 'N/A' }} />
      </TabsContent>

      <TabsContent value="fuel" className="mt-4">
        <SpecGrid specs={features?.fuel || {}} />
      </TabsContent>

      <TabsContent value="dimensions" className="mt-4">
        <SpecGrid specs={features?.measurements || {}} />
      </TabsContent>

      <TabsContent value="drivetrain" className="mt-4">
        <SpecGrid specs={features?.driveTrain || { drivetrain: data.driveType || 'N/A', transmission: 'N/A' }} />
      </TabsContent>

      <TabsContent value="safety" className="mt-4">
        <SafetySpecs specs={features?.safety || {}} />
      </TabsContent>

      <TabsContent value="colors" className="mt-4">
        <ColorSpecs colors={color} />
      </TabsContent>
    </Tabs>
  )
}

function SpecGrid({ specs }: { specs: Record<string, string | number | boolean> }) {
  const entries = Object.entries(specs).filter(([, value]) => value !== undefined && value !== null && value !== '')

  if (entries.length === 0) {
    return <p className="text-muted-foreground">No data available</p>
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-lg border p-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {formatLabel(key)}
          </p>
          <p className="mt-1 font-medium">{String(value)}</p>
        </div>
      ))}
    </div>
  )
}

function SafetySpecs({ specs }: { specs: Record<string, boolean | string> }) {
  const entries = Object.entries(specs)

  if (entries.length === 0) {
    return <p className="text-muted-foreground">No safety data available</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([key, value]) => (
        <Badge
          key={key}
          variant={value === true || value === 'yes' ? 'default' : 'secondary'}
          className={value === true || value === 'yes' ? 'bg-accent text-accent-foreground' : ''}
        >
          {formatLabel(key)}
        </Badge>
      ))}
    </div>
  )
}

function ColorSpecs({ colors }: { colors?: NonNullable<SpecsData['specs']>['color'] }) {
  if (!colors) {
    return <p className="text-muted-foreground">No color data available</p>
  }

  return (
    <div className="space-y-4">
      {colors.exterior && colors.exterior.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Exterior Colors</p>
          <div className="flex flex-wrap gap-2">
            {colors.exterior.map((color: { name: string; rgb?: string }, i: number) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border px-3 py-2">
                {color.rgb && (
                  <div
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: `rgb(${color.rgb})` }}
                  />
                )}
                <span className="text-sm">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {colors.interior && colors.interior.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Interior Colors</p>
          <div className="flex flex-wrap gap-2">
            {colors.interior.map((color: { name: string; rgb?: string }, i: number) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border px-3 py-2">
                {color.rgb && (
                  <div
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: `rgb(${color.rgb})` }}
                  />
                )}
                <span className="text-sm">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SpecsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-20 shrink-0" />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    </div>
  )
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/(\d+)/g, ' $1')
    .trim()
}
