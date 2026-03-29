import { CheckCircle2, Car } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface VehicleHeaderProps {
  data: {
    vin: string
    vinValid: boolean
    make?: string
    model?: string
    trim?: string
    body?: string
    engine?: string
    drive?: string
    transmission?: string
    origin?: string
    vehicle?: {
      year: number
      make: string
      model: string
      manufacturer?: string
    }
  }
}

export function VehicleHeader({ data }: VehicleHeaderProps) {
  const vehicleTitle = data.vehicle 
    ? `${data.vehicle.year} ${data.make || data.vehicle.make} ${data.model || data.vehicle.model}`
    : `${data.make} ${data.model}`

  return (
    <div className="bg-card border-b">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
            {data.body && (
              <Badge variant="outline">{data.body}</Badge>
            )}
            {data.drive && (
              <Badge variant="outline">{data.drive}</Badge>
            )}
            {data.origin && (
              <Badge variant="outline">Made in {data.origin}</Badge>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <QuickStat label="Engine" value={data.engine || 'N/A'} />
          <QuickStat label="Transmission" value={data.transmission || 'N/A'} />
          <QuickStat label="Drivetrain" value={data.drive || 'N/A'} />
          <QuickStat label="Body Style" value={data.body || 'N/A'} />
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
