import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const benefits = [
  'Accident & damage history',
  'Open safety recalls',
  'Service records',
  'Ownership history',
]

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-6 py-16 sm:p-16">
          <div className="mx-auto max-w-2xl text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Don&apos;t Buy a Car Without Knowing Its History
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90 text-pretty">
              Get instant access to comprehensive vehicle history reports. 
              Protect yourself from costly hidden problems.
            </p>
            
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/#search">
                  Check a VIN Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/sample-report">
                  View Sample Report
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
