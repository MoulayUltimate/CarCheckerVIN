'use client'

import { useState, useEffect } from 'react'
import { 
  Gauge, 
  History, 
  Camera, 
  AlertOctagon, 
  Settings, 
  ShieldAlert,
  ChevronRight,
  Battery,
  AlertTriangle,
  Users,
  CheckCircle2,
  Calendar,
  Factory
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Data Structure
const features = [
  {
    id: 'instant',
    title: 'Instant Delivery',
    headline: "Average 60 seconds. Get your report instantly.",
    icon: Gauge,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'no-account',
    title: 'No Account Required',
    headline: "Hassle-Free. No mandatory sign-ups.",
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'preview',
    title: 'Preview First',
    headline: "Preview your report details before you pay.",
    icon: Camera,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    id: 'damage',
    title: 'Accident History',
    headline: "Damage Check - Has this vehicle been in any major accidents or floods?",
    icon: AlertOctagon,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    id: 'technical',
    title: 'Technical Data',
    headline: "Technical Data - What are the vehicle's true specifications and build data?",
    icon: Settings,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  },
  {
    id: 'stolen',
    title: 'Stolen VIN Check',
    headline: "Stolen Check - Is this vehicle legally clear to purchase and register?",
    icon: ShieldAlert,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  }
]

// Mockup Subcomponents
function MockupFrame({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col bg-card w-full h-[380px] rounded-xl border shadow-2xl overflow-hidden transition-all duration-300">
      {/* Fake App header */}
      <div className="flex items-center gap-2 bg-muted/50 px-4 py-3 border-b">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="mx-auto bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground invisible md:visible border">
          {title}
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  )
}

function TechnicalMockup() {
  return (
    <MockupFrame title="Technical Data">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-500" />
          Vehicle Specifications
        </h3>
        
        <div className="grid grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg text-sm border">
           <div className="flex flex-col items-center">
              <Calendar className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-muted-foreground text-xs">Year</span>
              <span className="font-semibold">2021</span>
           </div>
           <div className="flex flex-col items-center">
              <Factory className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-muted-foreground text-xs">Make</span>
              <span className="font-semibold">Aston Martin</span>
           </div>
           <div className="flex flex-col items-center">
              <Gauge className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-muted-foreground text-xs">Fuel Type</span>
              <span className="font-semibold">Gasoline</span>
           </div>
           <div className="flex flex-col items-center">
              <Settings className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="text-muted-foreground text-xs">Made in</span>
              <span className="font-semibold">UK</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm">
           <div className="flex justify-between border-b pb-1">
             <span className="text-muted-foreground">Engine Cylinders:</span>
             <span className="font-medium">8</span>
           </div>
           <div className="flex justify-between border-b pb-1">
             <span className="text-muted-foreground">Horsepower:</span>
             <span className="font-medium">542 hp</span>
           </div>
           <div className="flex justify-between border-b pb-1">
             <span className="text-muted-foreground">Drive Type:</span>
             <span className="font-medium">AWD</span>
           </div>
           <div className="flex justify-between border-b pb-1">
             <span className="text-muted-foreground">Transmission:</span>
             <span className="font-medium">Automatic</span>
           </div>
        </div>

        <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-medium text-sm flex items-center gap-2">
           <Battery className="w-4 h-4" /> Battery Info Verified
        </div>
      </div>
    </MockupFrame>
  )
}

function DamageMockup() {
  return (
    <MockupFrame title="Damage Check">
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
           <div className="flex gap-3">
             <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
             <div>
               <h4 className="font-semibold text-red-700 dark:text-red-400">Severe Damage Reported</h4>
               <p className="text-sm text-red-600/80 dark:text-red-300/80 mt-1">Vehicle involved in a major front-end collision. Structural damage reported on 12/04/2022.</p>
             </div>
           </div>
         </div>
         <div className="bg-muted p-4 rounded-lg flex items-center justify-between text-sm">
           <span className="font-medium">Airbag Deployment</span>
           <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">YES</span>
         </div>
         <div className="bg-muted p-4 rounded-lg flex items-center justify-between text-sm">
           <span className="font-medium">Lemon Title</span>
           <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">NO</span>
         </div>
         <div className="bg-muted p-4 rounded-lg flex items-center justify-between text-sm">
           <span className="font-medium">Flood Damage</span>
           <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">NO</span>
         </div>
      </div>
    </MockupFrame>
  )
}

function OdometerMockup() {
  return (
    <MockupFrame title="Odometer Rollback Check">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full justify-center">
         <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
               <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold">Odometer is Consistent</h3>
            <p className="text-sm text-muted-foreground w-3/4 mx-auto">No odometer rollback detected. The mileage progression aligns with registration data.</p>
         </div>
         
         <div className="relative pt-4 w-4/5 mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
            <div className="absolute top-1/2 left-0 w-3/4 h-1 bg-emerald-500 -translate-y-1/2 rounded-full" />
            <div className="flex justify-between relative z-10 text-xs font-medium mt-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-background mb-1" />
                24k mi
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-background mb-1" />
                48k mi
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-muted ring-4 ring-background mb-1" />
                Cur.
              </div>
            </div>
         </div>
      </div>
    </MockupFrame>
  )
}

function DefaultMockup({ feature }: { feature: any }) {
  return (
    <MockupFrame title={feature.title}>
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className={`p-4 rounded-full ${feature.bgColor}`}>
          <feature.icon className={`w-12 h-12 ${feature.color}`} />
        </div>
        <h3 className="text-lg font-semibold">{feature.title} Verified</h3>
        <p className="text-sm text-muted-foreground max-w-[250px]">Securely pulling live data from trusted NMVTIS records and dealership databases.</p>
        <div className="w-full max-w-[200px] h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[100%] rounded-full animate-pulse" />
        </div>
      </div>
    </MockupFrame>
  )
}


export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(features[0].id)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const intervalId = setInterval(() => {
      setActiveTab((currentId) => {
        const currentIndex = features.findIndex((f) => f.id === currentId)
        const nextIndex = (currentIndex + 1) % features.length
        return features[nextIndex].id
      })
    }, 4000)

    return () => clearInterval(intervalId)
  }, [isAutoPlaying])

  const handleScrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeFeature = features.find(f => f.id === activeTab) || features[4]

  const renderMockup = () => {
    switch (activeFeature.id) {
      case 'technical': return <TechnicalMockup key="tech" />
      case 'damage': return <DamageMockup key="damage" />
      case 'odometer': return <OdometerMockup key="odo" />
      default: return <DefaultMockup key={activeFeature.id} feature={activeFeature} />
    }
  }

  return (
    <section 
      className="py-24 bg-muted/20 border-y overflow-hidden relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar border-b border-border mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => {
                setActiveTab(feature.id)
                setIsAutoPlaying(false) // Pause if manually clicked
              }}
              className={cn(
                "whitespace-nowrap px-6 py-4 text-sm md:text-base font-medium transition-all relative outline-none hover:bg-muted/50",
                activeTab === feature.id 
                  ? "text-foreground font-semibold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {feature.title}
              {activeTab === feature.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-sm animate-in fade-in zoom-in-95 duration-200" />
              )}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[400px]">
          
          {/* Left: Mockup UI */}
          <div className="relative order-2 lg:order-1 w-full max-w-md mx-auto lg:max-w-none">
            {/* Soft backdrop glow to make the mockup pop */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 opacity-50" />
            <div className="relative z-10 w-full">
               {renderMockup()}
            </div>
          </div>

          {/* Right: Pitch & CTA */}
          <div className="order-1 lg:order-2 space-y-6 max-w-lg animate-in fade-in slide-in-from-right-8 duration-700">
            <div className={cn("inline-flex items-center justify-center p-3 rounded-2xl", activeFeature.bgColor)}>
              <activeFeature.icon className={cn("w-8 h-8", activeFeature.color)} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance leading-tight">
              {activeFeature.headline}
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Don&apos;t buy blind. Instantly uncover the dirty secrets or the pristine track record of any vehicle in America using our multi-database verification standard.
            </p>

            <Button 
              size="lg" 
              onClick={handleScrollToSearch}
              className="rounded-full px-8 font-semibold shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5 group"
            >
              Check Your Car
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
