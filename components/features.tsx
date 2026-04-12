import { 
  Shield, 
  FileSearch, 
  DollarSign, 
  Clock, 
  Car, 
  AlertTriangle,
  CheckCircle2,
  Gauge
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: FileSearch,
    title: 'Free VIN Decoder',
    description: 'Instantly decode any VIN to reveal exact make, model, trim, engine, and build data for free.',
  },
  {
    icon: Shield,
    title: 'Window Sticker Retrieval',
    description: 'Access the original factory window sticker to see exact MSRP, interior colors, and optional equipment.',
  },
  {
    icon: Car,
    title: 'Multi-Vehicle Support',
    description: 'Comprehensive support for cars, trucks, motorcycles, RVs, and Canadian vehicle history records.',
  },
  {
    icon: DollarSign,
    title: 'Market Valuation',
    description: 'Calculate accurate trade-in, private party, and dealer retail values based on localized market data.',
  },
  {
    icon: AlertTriangle,
    title: 'Accident & Salvage Check',
    description: 'Detect hidden damage, airbag deployments, total loss declarations, and rebuilt salvage titles.',
  },
  {
    icon: Clock,
    title: 'Instant 60s Delivery',
    description: 'Get comprehensive vehicle history reports delivered to your inbox in an average of 60 seconds.',
  },
]

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9', label: 'Average App Rating' },
  { value: '<60s', label: 'Average Delivery Time' },
  { value: '24/7', label: 'Customer Support' },
]

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything You Need to Know About Any Vehicle
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Our comprehensive reports give you the complete picture before you buy, sell, or insure any vehicle.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Stats() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefits = [
  'Avoid hidden problems and costly repairs',
  'Verify vehicle specifications before purchase',
  'Check for open safety recalls',
  'Compare ownership costs with similar vehicles',
  'Access market pricing information',
  'Get instant, accurate results',
]

export function Benefits() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Make Informed Decisions With Confidence
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Whether you&apos;re buying a used car, selling your vehicle, or just curious about a VIN, our comprehensive reports give you the information you need.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/20 p-8 lg:p-12">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Gauge className="h-24 w-24 text-primary/40" />
                <p className="mt-6 text-lg font-medium text-muted-foreground">
                  Trusted by millions of car buyers and sellers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
