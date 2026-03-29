'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { DollarSign, TrendingDown, Fuel, Wrench, Shield, FileText, Percent } from 'lucide-react'

interface TCOData {
  vehicle?: {
    year: number
    make: string
    model: string
  }
  zip?: string
  tco?: {
    total?: {
      federalTaxCredit?: number
      insurance?: number
      maintenance?: number
      repairs?: number
      taxesAndFees?: number
      financeInterest?: number
      depreciation?: number
      fuel?: number
      tcoPrice?: number
      averageCostPerMile?: number
    }
    years?: Record<string, Record<string, number>>
  }
}

interface VehicleTCOProps {
  vin: string
}

export function VehicleTCO({ vin }: VehicleTCOProps) {
  const [tco, setTco] = useState<TCOData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTCO() {
      try {
        const response = await fetch(`/api/vin/${vin}/tco`)
        if (!response.ok) {
          throw new Error('Failed to fetch TCO')
        }
        const data = await response.json()
        setTco(data)
      } catch (err) {
        setError('Unable to calculate ownership costs')
      } finally {
        setLoading(false)
      }
    }
    fetchTCO()
  }, [vin])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          5-Year Cost of Ownership
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <TCOSkeleton />
        ) : error || !tco?.tco?.total ? (
          <div className="text-center py-8">
            <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">{error || 'Cost data not available'}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Total Cost of Ownership requires a Growth or Scale plan.
            </p>
          </div>
        ) : (
          <TCOBreakdown tco={tco.tco} />
        )}
      </CardContent>
    </Card>
  )
}

function TCOBreakdown({ tco }: { tco: NonNullable<TCOData['tco']> }) {
  const total = tco.total
  if (!total) return null

  const costs = [
    { 
      label: 'Depreciation', 
      value: total.depreciation || 0, 
      icon: TrendingDown,
      color: 'bg-chart-1',
      description: 'Value lost over time'
    },
    { 
      label: 'Fuel', 
      value: total.fuel || 0, 
      icon: Fuel,
      color: 'bg-chart-2',
      description: 'Estimated fuel costs'
    },
    { 
      label: 'Insurance', 
      value: total.insurance || 0, 
      icon: Shield,
      color: 'bg-chart-3',
      description: 'Average insurance premiums'
    },
    { 
      label: 'Maintenance', 
      value: total.maintenance || 0, 
      icon: Wrench,
      color: 'bg-chart-4',
      description: 'Scheduled maintenance'
    },
    { 
      label: 'Repairs', 
      value: total.repairs || 0, 
      icon: Wrench,
      color: 'bg-chart-5',
      description: 'Expected repairs'
    },
    { 
      label: 'Taxes & Fees', 
      value: total.taxesAndFees || 0, 
      icon: FileText,
      color: 'bg-muted-foreground',
      description: 'Registration, taxes'
    },
    { 
      label: 'Finance Interest', 
      value: total.financeInterest || 0, 
      icon: Percent,
      color: 'bg-primary/60',
      description: 'Loan interest'
    },
  ].filter(cost => cost.value > 0)

  const totalCost = total.tcoPrice || costs.reduce((sum, cost) => sum + cost.value, 0)
  const maxCost = Math.max(...costs.map(c => c.value))

  return (
    <div className="space-y-6">
      {/* Total Summary */}
      <div className="rounded-lg bg-primary/10 p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">5-Year Total Cost of Ownership</p>
        <p className="mt-2 text-4xl font-bold text-primary">
          ${totalCost.toLocaleString()}
        </p>
        {total.averageCostPerMile && (
          <p className="mt-1 text-sm text-muted-foreground">
            ${total.averageCostPerMile.toFixed(2)} per mile
          </p>
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Cost Breakdown</h4>
        {costs.map((cost) => {
          const percentage = (cost.value / totalCost) * 100
          return (
            <div key={cost.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <cost.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{cost.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">${cost.value.toLocaleString()}</span>
                  <span className="ml-2 text-muted-foreground">({percentage.toFixed(1)}%)</span>
                </div>
              </div>
              <Progress value={(cost.value / maxCost) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{cost.description}</p>
            </div>
          )
        })}
      </div>

      {/* Year by Year */}
      {tco.years && Object.keys(tco.years).length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Year-by-Year Breakdown</h4>
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {Object.entries(tco.years).map(([year, costs]) => {
                const yearTotal = Object.values(costs).reduce((sum, val) => sum + (val || 0), 0)
                return (
                  <div key={year} className="w-24 rounded-lg border p-3 text-center">
                    <p className="text-xs font-medium text-muted-foreground">Year {year}</p>
                    <p className="mt-1 text-sm font-bold">${yearTotal.toLocaleString()}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TCOSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
