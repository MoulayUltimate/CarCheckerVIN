import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VinSearch } from '@/components/vin-search'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, AlertTriangle, CheckCircle2, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vehicle Recall Check - VINCheck Pro',
  description: 'Check for open safety recalls on any vehicle. Enter a VIN to get instant recall information from NHTSA.',
}

const recallStats = [
  { value: '50M+', label: 'Vehicles Affected Yearly' },
  { value: '800+', label: 'Active Recall Campaigns' },
  { value: 'FREE', label: 'Recall Lookups' },
]

const recallTypes = [
  {
    icon: AlertTriangle,
    title: 'Safety Defects',
    description: 'Issues that pose a risk to driver, passenger, or pedestrian safety',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    icon: Shield,
    title: 'Compliance Issues',
    description: 'Vehicles that do not meet federal safety standards',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: CheckCircle2,
    title: 'Manufacturer Recalls',
    description: 'Voluntary recalls issued by vehicle manufacturers',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
]

export default function RecallCheckPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-6">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Vehicle Recall Check
              </h1>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Check if your vehicle has any open safety recalls. Enter your VIN below to get instant recall information from NHTSA.
              </p>
            </div>

            <div className="mt-10">
              <VinSearch />
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {recallStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Check Recalls */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-10">Why Check for Recalls?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {recallTypes.map((type) => (
                <Card key={type.title}>
                  <CardContent className="p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${type.bgColor}`}>
                      <type.icon className={`h-6 w-6 ${type.color}`} />
                    </div>
                    <h3 className="mt-4 font-semibold">{type.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">What is a Vehicle Recall?</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground">
                A vehicle recall occurs when a manufacturer or NHTSA determines that a vehicle, equipment, 
                car seat, or tire creates an unreasonable safety risk or fails to meet minimum safety standards.
              </p>
              <p className="text-muted-foreground mt-4">
                When a recall is issued, the manufacturer must fix the problem at no cost to you. This typically 
                involves repairing, replacing, or refunding the defective item.
              </p>
              <h3 className="text-lg font-semibold mt-8 mb-4">Common Recall Issues Include:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Airbag defects (e.g., Takata airbag recalls)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Brake system failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Engine and transmission problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Electrical system issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Steering component failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Fuel system leaks (fire risk)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
