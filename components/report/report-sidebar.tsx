'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Download, 
  Share2, 
  Printer, 
  Car, 
  MapPin,
  Building2,
  CheckCircle2
} from 'lucide-react'
import { VinSearch } from '@/components/vin-search'

interface ReportSidebarProps {
  data: {
    vin: string
    vinValid: boolean
    make?: string
    model?: string
    trim?: string
    body?: string
    origin?: string
    vehicle?: {
      year: number
      make: string
      model: string
      manufacturer?: string
    }
  }
}

export function ReportSidebar({ data }: ReportSidebarProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.vehicle?.year} ${data.make} ${data.model} - VIN Report`,
          text: `Check out this vehicle report for VIN ${data.vin}`,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share Report
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </CardContent>
      </Card>

      {/* Vehicle Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Vehicle Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">
                {data.vehicle?.year} {data.make || data.vehicle?.make} {data.model || data.vehicle?.model}
              </p>
              {data.trim && (
                <p className="text-sm text-muted-foreground">{data.trim}</p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <SummaryItem 
              icon={CheckCircle2} 
              label="VIN Status" 
              value={data.vinValid ? 'Verified' : 'Invalid'}
              valueClassName={data.vinValid ? 'text-accent' : 'text-destructive'}
            />
            {data.origin && (
              <SummaryItem 
                icon={MapPin} 
                label="Origin" 
                value={data.origin} 
              />
            )}
            {data.vehicle?.manufacturer && (
              <SummaryItem 
                icon={Building2} 
                label="Manufacturer" 
                value={data.vehicle.manufacturer} 
              />
            )}
            {data.body && (
              <SummaryItem 
                icon={Car} 
                label="Body Style" 
                value={data.body} 
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Another VIN */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Search Another VIN</CardTitle>
        </CardHeader>
        <CardContent>
          <VinSearch variant="compact" />
        </CardContent>
      </Card>

      {/* Premium Upgrade */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Badge className="bg-primary">PRO</Badge>
            Unlock Full Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Full vehicle specifications
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Detailed recall history
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Ownership cost analysis
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Market value estimates
            </li>
          </ul>
          <Button className="w-full">
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryItem({ 
  icon: Icon, 
  label, 
  value,
  valueClassName
}: { 
  icon: React.ElementType
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <span className={`text-sm font-medium ${valueClassName || ''}`}>{value}</span>
    </div>
  )
}
