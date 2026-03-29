import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FAQ } from '@/components/faq-section'
import { VinSearch } from '@/components/vin-search'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about VIN decoding, vehicle history reports, recalls, and our services.',
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
              Everything you need to know about VIN decoding and vehicle history reports
            </p>
          </div>
        </section>

        <FAQ />

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Still Have Questions?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Try our VIN decoder now or contact our support team.
            </p>
            <div className="mt-8 flex justify-center">
              <VinSearch className="[&_input]:bg-white [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground [&_button]:bg-accent [&_button]:text-accent-foreground [&_button:hover]:bg-accent/90 [&_p]:text-primary-foreground/70" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
