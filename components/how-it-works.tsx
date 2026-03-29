import { Search, FileText, Shield } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Enter Your VIN',
    description: 'Find the 17-character VIN on your dashboard, door jamb, or vehicle registration and enter it in our search.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Get Instant Results',
    description: 'Our system decodes the VIN instantly, pulling data from multiple authoritative sources.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Make Informed Decisions',
    description: 'Review the comprehensive report including specs, recalls, and ownership costs to make confident decisions.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Get your vehicle report in three simple steps
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-border md:block" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <span className="mt-4 text-sm font-semibold text-primary">{step.number}</span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
