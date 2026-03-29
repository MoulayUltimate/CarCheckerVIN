import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VinSearch } from '@/components/vin-search'
import { Features, Stats, Benefits } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq-section'
import { CTA } from '@/components/cta'
import { ReportChecks } from '@/components/report-checks'
import { ValueComparison } from '@/components/value-comparison'
import { SellerCTA } from '@/components/seller-cta'
import { CheckCircle2, Shield, Clock, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="search" className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                Vehicle History Reports
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl text-pretty">
                Avoid buying a car with costly hidden problems by getting a comprehensive vehicle history report today.
              </p>
              <div className="mt-10 flex justify-center">
                <VinSearch />
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Trusted by 2M+ users</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Instant results</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>99.9% accuracy</span>
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="text-muted-foreground">No VIN or Plate?</span>
                <a href="/sample-report" className="text-primary hover:underline font-medium">View Sample Report</a>
                <span className="text-muted-foreground">|</span>
                <a href="/pricing" className="text-primary hover:underline font-medium">See Pricing</a>
              </div>
            </div>
          </div>
        </section>

        {/* What Reports Check For */}
        <ReportChecks />

        {/* Value Comparison */}
        <ValueComparison />

        {/* Stats */}
        <Stats />
        
        {/* How It Works */}
        <HowItWorks />

        {/* Features */}
        <Features />

        {/* Testimonials */}
        <Testimonials />

        {/* Benefits */}
        <Benefits />

        {/* FAQ */}
        <FAQ />

        {/* Seller CTA */}
        <SellerCTA />

        {/* Final CTA */}
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
