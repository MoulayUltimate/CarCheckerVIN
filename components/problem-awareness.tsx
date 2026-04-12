import { AlertTriangle, Clock, RefreshCw, CarFront, Landmark, Car } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const hiddenTraps = [
  {
    icon: RefreshCw,
    title: 'Odometer Rollbacks',
    description: 'Fraudulent sellers often rewind odometers to artificially inflate a vehicle\'s value. We check the chronological mileage history to flag inconsistencies.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  },
  {
    icon: Landmark,
    title: 'Salvage & Junk Titles',
    description: 'A car might look pristine on the outside while carrying a branded title from a previous total loss. We uncover hidden brandings across all 50 states.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    icon: CarFront,
    title: 'Auction History',
    description: 'Often, problem cars are passed through wholesale auctions. We provide actual listing photos and sale conditions from previous auction blocks.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Clock,
    title: 'Open Safety Recalls',
    description: 'Ensure the car you are buying doesn\'t have dangerous, unfixed manufacturer defects ranging from faulty airbags to engine fire risks.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: AlertTriangle,
    title: 'Flood & Hail Damage',
    description: 'Water damage destroys electronics slowly. We check FEMA records and insurance payouts to ensure you aren\'t buying a dried-out flood vehicle.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Car,
    title: 'Rental & Taxi Use',
    description: 'Former fleet, rental, and taxi vehicles suffer incredibly hard wear and tear. Know exactly how the vehicle was utilized before buying it.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  }
]

export function ProblemAwareness() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance mb-4">
            Don't get scammed. Know the hidden traps.
          </h2>
          <p className="text-lg text-muted-foreground">
            Thousands of used cars with dangerous, undisclosed pasts are sold every day. Our multi-point verification flags the exact issues dishonest sellers try to hide.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hiddenTraps.map((trap, index) => (
            <Card key={trap.title} className="group hover:shadow-xl transition-all duration-300 border-border/50">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className={`inline-flex p-3 rounded-2xl ${trap.bgColor} ${trap.color} group-hover:scale-110 transition-transform duration-300`}>
                  <trap.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {trap.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {trap.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
