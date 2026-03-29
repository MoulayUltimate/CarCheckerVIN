'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon,
  Calendar,
  Wrench,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Recall {
  manufacturer: string
  nhtsaCampaignNumber: string
  reportReceivedDate: string
  component: string
  summary: string
  consequence: string
  remedy: string
  parkIt?: boolean
  parkOutSide?: boolean
  overTheAirUpdate?: boolean
}

interface VehicleRecallsProps {
  vin: string
}

export function VehicleRecalls({ vin }: VehicleRecallsProps) {
  const [recalls, setRecalls] = useState<Recall[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchRecalls() {
      try {
        const response = await fetch(`/api/vin/${vin}/recalls`)
        if (!response.ok) {
          throw new Error('Failed to fetch recalls')
        }
        const data = await response.json()
        setRecalls(Array.isArray(data) ? data : data.data || [])
      } catch (err) {
        setError('Unable to fetch recall information')
      } finally {
        setLoading(false)
      }
    }
    fetchRecalls()
  }, [vin])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Safety Recalls
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <RecallsSkeleton />
        ) : error ? (
          <div className="text-center py-8">
            <AlertOctagon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Recall data requires a Growth or Scale plan.
            </p>
          </div>
        ) : recalls.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
            <p className="mt-4 font-medium">No Recalls Found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              This vehicle has no recorded safety recalls.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {recalls.length} recall{recalls.length !== 1 ? 's' : ''} found
              </p>
              {recalls.some(r => r.parkIt || r.parkOutSide) && (
                <Badge variant="destructive" className="gap-1">
                  <AlertOctagon className="h-3 w-3" />
                  Critical Recall Present
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              {recalls.map((recall, index) => (
                <RecallCard
                  key={recall.nhtsaCampaignNumber || index}
                  recall={recall}
                  expanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RecallCard({ 
  recall, 
  expanded, 
  onToggle 
}: { 
  recall: Recall
  expanded: boolean
  onToggle: () => void
}) {
  const isCritical = recall.parkIt || recall.parkOutSide

  return (
    <div 
      className={cn(
        'rounded-lg border p-4 transition-colors',
        isCritical && 'border-destructive bg-destructive/5'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={isCritical ? 'destructive' : 'secondary'}>
              {recall.component}
            </Badge>
            {recall.parkIt && (
              <Badge variant="destructive" className="gap-1">
                <AlertOctagon className="h-3 w-3" />
                Do Not Drive
              </Badge>
            )}
            {recall.parkOutSide && (
              <Badge variant="destructive" className="gap-1">
                <AlertOctagon className="h-3 w-3" />
                Fire Risk
              </Badge>
            )}
            {recall.overTheAirUpdate && (
              <Badge variant="outline" className="gap-1">
                <Wrench className="h-3 w-3" />
                OTA Update
              </Badge>
            )}
          </div>
          <p className="mt-2 text-sm font-medium line-clamp-2">{recall.summary}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(recall.reportReceivedDate)}
            </span>
            {recall.nhtsaCampaignNumber && (
              <span>Campaign: {recall.nhtsaCampaignNumber}</span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Summary</p>
            <p className="mt-1 text-sm">{recall.summary}</p>
          </div>
          {recall.consequence && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Consequence</p>
              <p className="mt-1 text-sm text-destructive">{recall.consequence}</p>
            </div>
          )}
          {recall.remedy && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Remedy</p>
              <p className="mt-1 text-sm">{recall.remedy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RecallsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-24" />
      ))}
    </div>
  )
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}
