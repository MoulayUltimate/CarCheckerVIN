'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CheckCircle2, Car } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { VehicleData } from '@/lib/types'

interface VehicleHeaderProps {
  data: VehicleData
}

export function VehicleHeader({ data }: VehicleHeaderProps) {
  const [imgError, setImgError] = useState(false)
  const vehicleTitle = data.year
    ? `${data.year} ${data.make} ${data.model}`
    : `${data.make} ${data.model}`

  const imageUrl = data.photos?.[0]
  const showImage = imageUrl && !imgError

  return (
    <div className="bg-card border-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          {/* Vehicle Image */}
          <div className="shrink-0 w-full lg:w-96 xl:w-[480px]">
            <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl bg-muted border border-border">
              {showImage ? (
                <img
                  src={imageUrl}
                  alt={`${vehicleTitle} photo`}
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground/50">
                  <Car className="h-20 w-20 mb-4 opacity-50" />
                  <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60">No Photo Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Car className="h-4 w-4" />
                  <span>VIN: {data.vin}</span>
                  {data.vinValid && (
                    <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  {vehicleTitle}
                </h1>
                {data.trim && (
                  <p className="mt-1 text-lg text-muted-foreground">{data.trim}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {data.bodyClass && (
                  <Badge variant="outline">{data.bodyClass}</Badge>
                )}
                {data.driveType && (
                  <Badge variant="outline">{data.driveType}</Badge>
                )}
                {data.origin && (
                  <Badge variant="outline">Made in {data.origin}</Badge>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <QuickStat label="Engine" value={data.engineDisplacement || 'N/A'} />
              <QuickStat label="Transmission" value={'N/A'} />
              <QuickStat label="Drivetrain" value={data.driveType || 'N/A'} />
              <QuickStat label="Body Style" value={data.bodyClass || 'N/A'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-sm font-semibold truncate" title={value}>{value}</p>
    </div>
  )
}
