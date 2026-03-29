import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Car Buyer',
    content: 'Saved me from buying a car with hidden recall issues. The report was comprehensive and easy to understand.',
    rating: 5,
    initials: 'MC',
  },
  {
    name: 'Sarah Johnson',
    role: 'Used Car Dealer',
    content: 'We use this for every vehicle we purchase. The instant results and accuracy have been invaluable for our business.',
    rating: 5,
    initials: 'SJ',
  },
  {
    name: 'David Rodriguez',
    role: 'First-time Buyer',
    content: 'As a first-time car buyer, this gave me the confidence to negotiate. Knowing the true specs and history was a game-changer.',
    rating: 5,
    initials: 'DR',
  },
  {
    name: 'Emily Thompson',
    role: 'Fleet Manager',
    content: 'Managing 50+ vehicles requires reliable data. This service has streamlined our acquisition and maintenance processes.',
    rating: 5,
    initials: 'ET',
  },
  {
    name: 'James Wilson',
    role: 'Mechanic',
    content: 'The specification data helps me prepare for repairs before the car even arrives. Excellent detail on engine and drivetrain.',
    rating: 5,
    initials: 'JW',
  },
  {
    name: 'Lisa Park',
    role: 'Insurance Agent',
    content: 'Quick and accurate VIN decoding helps me provide better quotes. The recall information is especially valuable.',
    rating: 5,
    initials: 'LP',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Trusted by Thousands of Users
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 bg-card shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
