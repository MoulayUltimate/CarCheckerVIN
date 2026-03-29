import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Choose the perfect plan for your VIN lookup needs. From free basic decoding to comprehensive vehicle history reports.',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for occasional lookups',
    features: [
      { name: 'Basic VIN decoding', included: true },
      { name: 'Vehicle photos', included: true },
      { name: 'Market listings', included: true },
      { name: '10 lookups per month', included: true },
      { name: 'Full specifications', included: false },
      { name: 'Recall information', included: false },
      { name: 'Cost of ownership', included: false },
      { name: 'API access', included: false },
    ],
    cta: 'Get Started',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Best for regular car buyers',
    features: [
      { name: 'Everything in Free', included: true },
      { name: 'Unlimited lookups', included: true },
      { name: 'Full specifications', included: true },
      { name: 'Complete recall history', included: true },
      { name: 'Cost of ownership analysis', included: true },
      { name: 'Priority support', included: true },
      { name: 'API access', included: false },
      { name: 'Bulk lookups', included: false },
    ],
    cta: 'Start Free Trial',
    variant: 'default' as const,
    popular: true,
  },
  {
    name: 'Business',
    price: '$49',
    period: 'per month',
    description: 'For dealers and professionals',
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'API access', included: true },
      { name: 'Bulk VIN lookups', included: true },
      { name: 'OEM build data', included: true },
      { name: 'White-label reports', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'SLA guarantee', included: true },
    ],
    cta: 'Contact Sales',
    variant: 'outline' as const,
    popular: false,
  },
]

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for business accounts.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Pro plan comes with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What if I need more than 1000 lookups?',
    answer: 'Contact our sales team for custom enterprise pricing with unlimited lookups and dedicated support.',
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
              Choose the plan that fits your needs. Start free and upgrade as you grow.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1 px-3 py-1">
                        <Zap className="h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-accent shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={plan.variant} 
                      className="w-full mt-8"
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg bg-card p-6">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of users who trust VINCheck Pro for their vehicle research.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Start Free Trial</Button>
              <Button size="lg" variant="outline">Contact Sales</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
