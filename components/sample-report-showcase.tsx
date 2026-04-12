import Image from 'next/image'
import { CheckCircle2, AlertTriangle, Search, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function SampleReportShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 transition-colors">
            Real Data. Real Photos.
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance mb-4">
            See What's Inside a Full Report
          </h2>
          <p className="text-lg text-muted-foreground">
            We don't just give you text. If the vehicle went through an auction, was involved in a total-loss claim, or had photos taken during sale, we pull them instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery (Takes 3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted shadow-sm group">
              <Image 
                src="/images/sample/damage.jpg" 
                alt="Vehicle Exterior Condition" 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                 <Badge variant="secondary" className="bg-emerald-500/90 text-white backdrop-blur-sm text-xs uppercase tracking-wider font-bold border-emerald-400">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Clean Title Verified
                 </Badge>
                 <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                   Dealer Lot #14592
                 </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted shadow-sm group">
                  <Image 
                    src="/images/sample/exterior.jpg" 
                    alt="Vehicle Front Angle" 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                     <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-[10px]">Exterior Match</Badge>
                  </div>
               </div>
               <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted shadow-sm group">
                  <Image 
                    src="/images/sample/interior.jpg" 
                    alt="Vehicle Interior Dashboard" 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                     <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-[10px]">Interior Condition</Badge>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Extracted Data Highlights (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border shadow-lg">
               <div className="bg-muted px-6 py-4 border-b flex justify-between items-center">
                 <h3 className="font-bold flex items-center gap-2">
                   <Search className="w-4 h-4 text-primary" />
                   Extracted Report Data
                 </h3>
                 <span className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded border">VIN: 3C6UR...</span>
               </div>
               <CardContent className="p-0">
                  <div className="divide-y text-sm">
                     {/* Data Row 1 */}
                     <div className="p-4 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                        <div className="flex items-start gap-3">
                           <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                           <div>
                             <h4 className="font-bold text-emerald-700 dark:text-emerald-400">No Structural Damage</h4>
                             <p className="text-muted-foreground mt-1">NMVTIS federal database confirms no total loss, salvage, or serious structural damage reported.</p>
                             <div className="mt-2 text-xs font-semibold text-emerald-600">History: Clean</div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Data Row 2 */}
                     <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                           <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                           <div className="w-full">
                             <h4 className="font-bold">Odometer Verification</h4>
                             <div className="flex justify-between items-end mt-2">
                               <p className="text-muted-foreground">Last read:</p>
                               <span className="font-mono font-bold text-lg">42,510 mi</span>
                             </div>
                             <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                                <div className="w-1/2 h-full bg-emerald-500" />
                             </div>
                           </div>
                        </div>
                     </div>

                     {/* Data Row 3 */}
                     <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                           <div className="w-full">
                             <h4 className="font-bold">Market Valuation</h4>
                             <p className="text-muted-foreground mt-1 text-xs">Estimated localized pricing data.</p>
                             <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                                <div className="bg-background border rounded px-2 py-2">
                                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Trade-In</div>
                                  <div className="font-bold text-sm">$32,450</div>
                                </div>
                                <div className="bg-background border rounded px-2 py-2 border-primary/30 ring-1 ring-primary/10">
                                  <div className="text-[10px] text-primary uppercase font-bold">Retail</div>
                                  <div className="font-bold text-sm text-primary">$35,800</div>
                                </div>
                             </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}
