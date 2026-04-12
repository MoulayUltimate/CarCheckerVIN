import { Bot, ShieldAlert, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function AIShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 transition-colors">
            Powered by Advanced AI
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance mb-4">
            Don't just read data. Let AI understand it for you.
          </h2>
          <p className="text-lg text-muted-foreground">
            We are the first vehicle history provider to integrate advanced AI architecture that physically analyzes your report and points out the red flags others miss.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <Card className="border-0 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-2xl overflow-hidden group">
            <div className="h-2 w-full bg-blue-500" />
            <CardContent className="pt-8 pb-8 px-6 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">AI VIN Concierge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Chat directly with your vehicle report. Ask specific questions about accident severity, title history, or maintenance records to get instant, plain-English answers.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="border-0 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-2xl overflow-hidden group relative">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="h-2 w-full bg-primary" />
            <CardContent className="pt-8 pb-8 px-6 space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">AI Risk Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instantly identify "red flags" and potential issues hidden deep within the report data. Our algorithm calculates risk so you can buy with confidence.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="border-0 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-2xl overflow-hidden group">
            <div className="h-2 w-full bg-emerald-500" />
            <CardContent className="pt-8 pb-8 px-6 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">AI Vehicle Storyteller</h3>
              <p className="text-muted-foreground leading-relaxed">
                Skip the raw data points. Our AI generates an easy-to-read narrative describing the car's entire life story, ownership changes, and usage timeline.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="border-0 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-2xl overflow-hidden group">
            <div className="h-2 w-full bg-purple-500" />
            <CardContent className="pt-8 pb-8 px-6 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">AI Vehicle Finder</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get personalized vehicle recommendations and comparisons based on your needs, budget, and desired feature set to find the perfect match.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${className}`}>
      {children}
    </span>
  )
}
