import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react'

export function SellerCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Selling a Used Car?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90 text-pretty">
              Build trust with potential buyers by providing them with a comprehensive vehicle history report. 
              Transparent sellers get better prices and faster sales.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Get Top Dollar</p>
                  <p className="text-sm text-primary-foreground/80">Clean reports command higher prices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Attract More Buyers</p>
                  <p className="text-sm text-primary-foreground/80">Reports increase buyer confidence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Reduce Liability</p>
                  <p className="text-sm text-primary-foreground/80">Document the vehicle&apos;s condition</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/#search">
                  Get Your Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-2xl bg-primary-foreground/10 p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="text-6xl font-bold">87%</div>
                <p className="mt-4 text-lg text-primary-foreground/90">
                  of buyers say a vehicle history report influences their purchase decision
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
