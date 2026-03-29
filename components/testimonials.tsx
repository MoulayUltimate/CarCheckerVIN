import { Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    content: "If I hadn't run the report on each of the four cars I was considering, we would have bought the wrong car. That means we would have wasted $4,000 to $5,000.",
    author: 'Robin S.',
    location: 'Austin, TX',
  },
  {
    content: "The report actually helped me avoid buying the wrong car when it showed that a vehicle had been in an accident which deployed the airbag. Saved me from a huge mistake!",
    author: 'Steve M.',
    location: 'Denver, CO',
  },
  {
    content: "Thank you! I really believe you saved me $6,500. Your service was worth every penny. I will recommend your service to all of my friends.",
    author: 'Robert T.',
    location: 'Miami, FL',
  },
  {
    content: "As a used car dealer, we run reports on every vehicle we purchase. The instant results and accuracy have been invaluable for our business.",
    author: 'James L.',
    location: 'Phoenix, AZ',
  },
  {
    content: "Found out the car I was about to buy had a salvage title. The seller conveniently forgot to mention that. The report paid for itself 100x over.",
    author: 'Maria G.',
    location: 'Chicago, IL',
  },
  {
    content: "Managing a fleet of 50+ vehicles requires reliable data. This service has streamlined our acquisition process completely.",
    author: 'David K.',
    location: 'Seattle, WA',
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            What Customers Are Saying
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Join thousands of satisfied customers who made smarter car buying decisions
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-card shadow-sm">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30" />
                <blockquote className="mt-4 text-muted-foreground italic">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="mt-6 border-t pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
