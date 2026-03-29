import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Car, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Gauge, 
  Fuel, 
  Shield,
  Cog,
  MapPin,
  Building2,
  Calendar,
  TrendingDown,
  Wrench
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sample Report',
  description: 'View a sample VIN report to see what information is included in our comprehensive vehicle history reports.',
}

// Sample data for demonstration
const sampleVehicle = {
  vin: '3GCUDHEL3NG668790',
  year: 2022,
  make: 'Chevrolet',
  model: 'Silverado 1500',
  trim: 'ZR2',
  body: 'Truck',
  engine: '5.3L V8 OHV 16V FFV',
  transmission: 'Automatic',
  drive: '4WD',
  origin: 'Mexico',
  manufacturer: 'General Motors de Mexico',
}

const sampleSpecs = {
  engine: {
    horsepower: '420 hp @ 5600 rpm',
    torque: '460 lb-ft @ 4000 rpm',
    displacement: '5.3L',
    cylinders: 'V8',
    fuelType: 'Flex Fuel',
  },
  fuel: {
    cityMpg: '15 MPG',
    highwayMpg: '20 MPG',
    combinedMpg: '17 MPG',
    tankCapacity: '24 gal',
  },
  dimensions: {
    length: '233.5 in',
    width: '81.2 in',
    height: '77.7 in',
    wheelbase: '147.4 in',
    curbWeight: '5,365 lbs',
  },
}

const sampleRecalls = [
  {
    component: 'AIRBAGS',
    date: '2023-03-15',
    summary: 'Airbag module software may cause delayed deployment in certain collision scenarios.',
    consequence: 'Delayed airbag deployment could increase the risk of injury.',
    remedy: 'Dealers will update the airbag control module software free of charge.',
    status: 'completed',
  },
  {
    component: 'FUEL SYSTEM',
    date: '2022-08-22',
    summary: 'Fuel tank assembly may have incorrect welds, potentially causing fuel leakage.',
    consequence: 'Fuel leakage increases the risk of fire.',
    remedy: 'Dealers will inspect and replace the fuel tank if necessary, free of charge.',
    status: 'open',
  },
]

const sampleTCO = {
  total: 68500,
  breakdown: [
    { category: 'Depreciation', amount: 28000, percentage: 41 },
    { category: 'Fuel', amount: 15500, percentage: 23 },
    { category: 'Insurance', amount: 12000, percentage: 18 },
    { category: 'Maintenance', amount: 6500, percentage: 9 },
    { category: 'Repairs', amount: 4000, percentage: 6 },
    { category: 'Taxes & Fees', amount: 2500, percentage: 4 },
  ],
}

export default function SampleReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-primary text-primary-foreground py-3 text-center">
          <p className="text-sm">
            This is a sample report. <Link href="/" className="underline font-medium">Enter your VIN</Link> to get a real vehicle report.
          </p>
        </div>

        {/* Vehicle Header */}
        <div className="bg-card border-b">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Car className="h-4 w-4" />
                  <span>VIN: {sampleVehicle.vin}</span>
                  <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Sample Report
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {sampleVehicle.year} {sampleVehicle.make} {sampleVehicle.model}
                </h1>
                <p className="mt-1 text-lg text-muted-foreground">{sampleVehicle.trim}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{sampleVehicle.body}</Badge>
                <Badge variant="outline">{sampleVehicle.drive}</Badge>
                <Badge variant="outline">Made in {sampleVehicle.origin}</Badge>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <QuickStat label="Engine" value={sampleVehicle.engine} />
              <QuickStat label="Transmission" value={sampleVehicle.transmission} />
              <QuickStat label="Drivetrain" value={sampleVehicle.drive} />
              <QuickStat label="Body Style" value={sampleVehicle.body} />
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cog className="h-5 w-5" />
                    Vehicle Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="engine">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="engine" className="gap-1">
                        <Gauge className="h-4 w-4" />
                        Engine
                      </TabsTrigger>
                      <TabsTrigger value="fuel" className="gap-1">
                        <Fuel className="h-4 w-4" />
                        Fuel
                      </TabsTrigger>
                      <TabsTrigger value="dimensions" className="gap-1">
                        <Car className="h-4 w-4" />
                        Dimensions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="engine" className="mt-4">
                      <SpecGrid specs={sampleSpecs.engine} />
                    </TabsContent>
                    <TabsContent value="fuel" className="mt-4">
                      <SpecGrid specs={sampleSpecs.fuel} />
                    </TabsContent>
                    <TabsContent value="dimensions" className="mt-4">
                      <SpecGrid specs={sampleSpecs.dimensions} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Recalls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Safety Recalls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      {sampleRecalls.length} recalls found
                    </p>
                    <Badge variant="destructive" className="gap-1">
                      1 Open Recall
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {sampleRecalls.map((recall, index) => (
                      <div 
                        key={index} 
                        className={`rounded-lg border p-4 ${recall.status === 'open' ? 'border-destructive bg-destructive/5' : ''}`}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={recall.status === 'open' ? 'destructive' : 'secondary'}>
                            {recall.component}
                          </Badge>
                          <Badge variant={recall.status === 'open' ? 'destructive' : 'outline'}>
                            {recall.status === 'open' ? 'Open' : 'Completed'}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{recall.summary}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {recall.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* TCO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    5-Year Cost of Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-primary/10 p-6 text-center mb-6">
                    <p className="text-sm font-medium text-muted-foreground">Estimated 5-Year Total</p>
                    <p className="mt-2 text-4xl font-bold text-primary">
                      ${sampleTCO.total.toLocaleString()}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">$1.14 per mile</p>
                  </div>
                  <div className="space-y-4">
                    {sampleTCO.breakdown.map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.category}</span>
                          <span>
                            ${item.amount.toLocaleString()} ({item.percentage}%)
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24">
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
                        {sampleVehicle.year} {sampleVehicle.make} {sampleVehicle.model}
                      </p>
                      <p className="text-sm text-muted-foreground">{sampleVehicle.trim}</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <SummaryItem icon={CheckCircle2} label="VIN Status" value="Verified" className="text-accent" />
                    <SummaryItem icon={MapPin} label="Origin" value={sampleVehicle.origin} />
                    <SummaryItem icon={Building2} label="Manufacturer" value={sampleVehicle.manufacturer} />
                    <SummaryItem icon={Car} label="Body Style" value={sampleVehicle.body} />
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Get Your Own Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter your VIN to get a comprehensive vehicle report with real data.
                  </p>
                  <Link href="/">
                    <Button className="w-full">Check Your VIN</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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

function SpecGrid({ specs }: { specs: Record<string, string> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="rounded-lg border p-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </p>
          <p className="mt-1 font-medium">{value}</p>
        </div>
      ))}
    </div>
  )
}

function SummaryItem({ 
  icon: Icon, 
  label, 
  value,
  className
}: { 
  icon: React.ElementType
  label: string
  value: string
  className?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <span className={`text-sm font-medium ${className || ''}`}>{value}</span>
    </div>
  )
}
