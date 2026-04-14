import { Quote, Star, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    content: "If I hadn't run the report on each of the four cars I was considering, we would have bought the wrong car. That means we would have wasted $4,000 to $5,000.",
    author: 'Robin S.',
    location: 'Austin, TX',
    avatar: 'RS',
    rating: 5,
  },
  {
    content: "The report actually helped me avoid buying the wrong car when it showed that a vehicle had been in an accident which deployed the airbag. Saved me from a huge mistake!",
    author: 'Steve M.',
    location: 'Denver, CO',
    avatar: 'SM',
    rating: 5,
  },
  {
    content: "Thank you! I really believe you saved me $6,500. Your service was worth every penny. I will recommend your service to all of my friends.",
    author: 'Robert T.',
    location: 'Miami, FL',
    avatar: 'RT',
    rating: 5,
  },
  {
    content: "As a used car dealer, we run reports on every vehicle we purchase. The instant results and accuracy have been invaluable for our business.",
    author: 'James L.',
    location: 'Phoenix, AZ',
    avatar: 'JL',
    rating: 5,
  },
  {
    content: "Found out the car I was about to buy had a salvage title. The seller conveniently forgot to mention that. The report paid for itself 100x over.",
    author: 'Maria G.',
    location: 'Chicago, IL',
    avatar: 'MG',
    rating: 5,
  },
  {
    content: "Managing a fleet of 50+ vehicles requires reliable data. This service has streamlined our acquisition process completely.",
    author: 'David K.',
    location: 'Seattle, WA',
    avatar: 'DK',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle className="w-3.5 h-3.5" />
            Verified Success Stories
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Trusted by 50,000+ Car Buyers
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Join thousands of satisfied customers who made smarter, safer buying decisions with CarCheckVIN.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 duration-300">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary/10 absolute top-8 right-8" />
                
                <blockquote className="text-muted-foreground leading-relaxed relative">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                
                <div className="mt-8 flex items-center gap-4">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                    <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm tracking-tight">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

