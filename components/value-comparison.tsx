import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle } from 'lucide-react'

const comparisons = [
  {
    good: {
      title: 'No Accidents',
      vehicle: '2022 Toyota Camry SE',
      value: '$24,230',
      badge: 'Clean History',
      badgeVariant: 'default' as const,
    },
    bad: {
      title: 'Accidents',
      vehicle: '2022 Toyota Camry SE',
      value: '$22,410',
      badge: 'Accident Reported',
      badgeVariant: 'destructive' as const,
    },
    savings: '$1,820',
  },
  {
    good: {
      title: '1-Owner Vehicle',
      vehicle: '2020 Honda CR-V EX',
      value: '$27,630',
      badge: 'Single Owner',
      badgeVariant: 'default' as const,
    },
    bad: {
      title: '3 Owners',
      vehicle: '2020 Honda CR-V EX',
      value: '$25,020',
      badge: 'Multiple Owners',
      badgeVariant: 'secondary' as const,
    },
    savings: '$2,610',
  },
  {
    good: {
      title: 'Regular Service',
      vehicle: '2021 Ford F-150 XL',
      value: '$33,290',
      badge: 'Service Records',
      badgeVariant: 'default' as const,
    },
    bad: {
      title: 'No Service Records',
      vehicle: '2021 Ford F-150 XL',
      value: '$31,970',
      badge: 'No Records',
      badgeVariant: 'secondary' as const,
    },
    savings: '$1,320',
  },
]

export function ValueComparison() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            A Car&apos;s History Affects Its Value
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            See how vehicle history impacts pricing - knowing before you buy can save thousands
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {comparisons.map((comparison, index) => (
            <div key={index} className="space-y-4">
              {/* Good Card */}
              <Card className="border-2 border-accent/50 bg-accent/5">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-accent">{comparison.good.title}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{comparison.good.vehicle}</p>
                    </div>
                    <Badge variant={comparison.good.badgeVariant} className="bg-accent text-accent-foreground">
                      {comparison.good.badge}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Estimated Value</p>
                    <p className="text-2xl font-bold text-foreground">{comparison.good.value}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Bad Card */}
              <Card className="border-2 border-destructive/30 bg-destructive/5">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span className="font-semibold text-destructive">{comparison.bad.title}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{comparison.bad.vehicle}</p>
                    </div>
                    <Badge variant={comparison.bad.badgeVariant}>
                      {comparison.bad.badge}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Estimated Value</p>
                    <p className="text-2xl font-bold text-foreground">{comparison.bad.value}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Savings Badge */}
              <div className="text-center">
                <Badge variant="outline" className="text-base px-4 py-1.5">
                  Price Difference: <span className="font-bold text-accent ml-1">{comparison.savings}</span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
