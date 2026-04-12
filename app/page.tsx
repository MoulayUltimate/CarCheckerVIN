import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { Stats } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { SampleReportShowcase } from '@/components/sample-report-showcase'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq-section'
import { CTA } from '@/components/cta'
import { FeatureShowcase } from '@/components/feature-showcase'
import { FeatureChecklist } from '@/components/feature-checklist'
import { AIShowcase } from '@/components/ai-showcase'
import { PricingComparison } from '@/components/pricing-comparison'
import { SellerCTA } from '@/components/seller-cta'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - EpicVIN Style */}
        <HeroSection />
        {/* Stats / Trust Under Hero */}
        <Stats />
        
        {/* How It Works */}
        <HowItWorks />

        {/* Real Report Example */}
        <SampleReportShowcase />

        {/* Feature Checklist (40+) */}
        <FeatureChecklist />

        {/* Feature Showcase Tabbed UX */}
        <FeatureShowcase />

        {/* AI Features */}
        <AIShowcase />

        {/* Pricing Comparison */}
        <PricingComparison />

        {/* Testimonials */}
        <Testimonials />

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
