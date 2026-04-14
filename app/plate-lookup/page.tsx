import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { 
  AlertCircle, 
  Search, 
  ShieldCheck, 
  MapPin, 
  Info, 
  ArrowRight,
  Database,
  Lock,
  History,
  Car
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'License Plate Lookup - Get Car History by Plate',
  description: 'Instantly uncover a vehicle\'s history using just the license plate. Get owner history, title status, and historical records.',
}

export default async function PlateLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ plate?: string; state?: string }>
}) {
  const params = await searchParams
  const plate = params.plate || ''
  const state = params.state || ''

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section for Plate Lookup */}
        <section className="relative pt-20 pb-16 overflow-hidden bg-slate-950 text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 border-primary/30 text-primary-foreground bg-primary/10 px-4 py-1">
                Official U.S. Plate Database
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                Instantly Decode Any <span className="text-primary underline decoration-primary/30 underline-offset-8">License Plate</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Our proprietary system links state DMV records and federal databases to provide you with the most accurate vehicle history available by plate.
              </p>

              {plate && state ? (
                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between mb-6">
                       <div className="text-left">
                          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Target Vehicle</p>
                          <h2 className="text-3xl font-black uppercase tracking-tighter">{plate}</h2>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Registration State</p>
                          <h2 className="text-2xl font-black">{state}</h2>
                       </div>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
                       <div className="h-full bg-primary w-2/3 animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex items-center gap-2 text-sm text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          Secure Processing
                       </div>
                       <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Database className="w-4 h-4 text-emerald-500" />
                          DMV Verified
                       </div>
                    </div>
                 </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/#search">
                    <Button size="lg" className="rounded-full px-10 h-14 font-bold text-lg">
                      Start Search
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-bold text-lg bg-white/5 border-white/20 text-white hover:bg-white/10">
                    How it works
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Informational Blocks */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <InfoCard 
                icon={Lock}
                title="Privacy Protected"
                description="We follow strict DPPA guidelines. Owner information is redacted where required by law to protect your privacy."
              />
              <InfoCard 
                icon={History}
                title="Historical Records"
                description="Get access to title history, odometer readings, and insurance records linked to this plate and its associated VIN."
              />
              <InfoCard 
                icon={MapPin}
                title="Recall Information"
                description="Instantly see if there are any open safety recalls for the vehicle registered under this license plate."
              />
            </div>

            {/* Comparisons */}
            <div className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
               <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                    Plate vs. VIN: <br /><span className="text-primary">What's the difference?</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A license plate is linked to a VIN in our database. When you search by plate, we first identify the unique Vehicle Identification Number (VIN) to pull accurate records.
                  </p>
                  <div className="space-y-4 pt-4">
                     <BenefitItem title="Plate Search" description="Best for when you only have a photo of the car or can't access the door jamb." />
                     <BenefitItem title="VIN Search" description="The gold standard. Provides the most direct and accurate link to federal history records." />
                  </div>
                  <div className="pt-6">
                    <Link href="/#search">
                      <Button variant="link" className="px-0 font-bold text-primary flex items-center gap-2 group">
                        Search by VIN instead
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
                  <Card className="relative z-10 border-2 bg-background shadow-2xl rounded-[2rem]">
                     <CardContent className="p-10 space-y-8">
                        <div className="space-y-2">
                           <h3 className="text-xl font-bold flex items-center gap-2">
                              <Info className="w-5 h-5 text-primary" />
                              Important Notice
                           </h3>
                           <p className="text-muted-foreground leading-relaxed">
                              License plate data availability varies by state. Some states take longer to update registration links than others.
                           </p>
                        </div>
                        <div className="space-y-6">
                           <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border">
                              <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                              <div>
                                 <h4 className="font-bold">Coming Soon Integration</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                    We are currently integrating deeper DMV records for 12 additional states. For immediate processing, use the VIN method.
                                 </p>
                              </div>
                           </div>
                           <Link href="/#search" className="block">
                              <Button className="w-full h-14 rounded-2xl font-bold shadow-xl">
                                 Check VIN Instead
                              </Button>
                           </Link>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
          </div>
        </section>

        {/* VIN Location Guide */}
        <section className="py-24 bg-muted/30 border-t">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold tracking-tight mb-4">Can&apos;t find your VIN?</h2>
                 <p className="text-lg text-muted-foreground">It&apos;s easier to find than you think. Look in these common spots.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <LocationCard number="01" title="Lower Windshield" description="Driver&apos;s side dashboard, visible from outside." />
                 <LocationCard number="02" title="Door Frame" description="Driver&apos;s side door jamb near the latch." />
                 <LocationCard number="03" title="Registration" description="Found on your state vehicle registration card." />
                 <LocationCard number="04" title="Insurance" description="Always listed on your car insurance ID card." />
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function InfoCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="border-none shadow-sm bg-muted/50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-300">
       <CardContent className="p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
             <Icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
       </CardContent>
    </Card>
  )
}

function BenefitItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl transition-colors hover:bg-muted/50">
       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-1">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
       </div>
       <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
       </div>
    </div>
  )
}

function LocationCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="bg-background rounded-3xl p-8 border hover:shadow-lg transition-all group">
       <span className="text-4xl font-black text-primary/10 group-hover:text-primary/20 transition-colors block mb-4">{number}</span>
       <h4 className="font-bold text-lg mb-2">{title}</h4>
       <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

