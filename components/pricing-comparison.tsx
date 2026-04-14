'use client'

import { Check, X, ShieldCheck, Zap, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const packages = [
  { count: 1, price: 9.99, popular: false, saving: 0 },
  { count: 3, price: 19.99, popular: false, saving: 15 },
  { count: 5, price: 29.99, popular: true, saving: 25 },
  { count: 10, price: 49.99, popular: false, saving: 40 },
]

export function PricingComparison() {
  const handleScrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-muted/20 border-y relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Save up to 40% Today
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-balance mb-6">
            Everything You Need, <span className="text-primary italic">At Better Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Why pay $44.99 elsewhere when you can access the exact same NMVTIS federal databases and dealership records for substantially less?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Direct Comparison */}
          <div className="bg-background rounded-[2rem] border shadow-2xl overflow-hidden order-2 lg:order-1 relative group">
             <div className="grid grid-cols-3 bg-muted/50 border-b font-bold text-xs tracking-wider">
               <div className="p-5 text-muted-foreground uppercase">Compare Data</div>
               <div className="p-5 text-center border-x">Top Competitor</div>
               <div className="p-5 text-center text-primary bg-primary/5">CARCHECKVIN</div>
             </div>

             {/* Row 1 */}
             <div className="grid grid-cols-3 border-b text-sm items-center hover:bg-muted/30 transition-colors">
               <div className="p-5 font-semibold text-muted-foreground">Title & Salvage</div>
               <div className="p-5 flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>
               <div className="p-5 flex justify-center bg-primary/5"><Check className="w-5 h-5 text-primary" /></div>
             </div>
             {/* Row 2 */}
             <div className="grid grid-cols-3 border-b text-sm items-center hover:bg-muted/30 transition-colors">
               <div className="p-5 font-semibold text-muted-foreground">Odometer Checks</div>
               <div className="p-5 flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>
               <div className="p-5 flex justify-center bg-primary/5"><Check className="w-5 h-5 text-primary" /></div>
             </div>
             {/* Row 3 */}
             <div className="grid grid-cols-3 border-b text-sm items-center hover:bg-muted/30 transition-colors">
               <div className="p-5 font-semibold text-muted-foreground">Accident History</div>
               <div className="p-5 flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>
               <div className="p-5 flex justify-center bg-primary/5"><Check className="w-5 h-5 text-primary" /></div>
             </div>
             {/* Price Row */}
             <div className="grid grid-cols-3 text-sm items-center font-bold">
               <div className="p-6">Price per report</div>
               <div className="p-6 text-center text-red-500 border-x text-xl">$44.99</div>
               <div className="p-6 text-center text-primary bg-primary/5 text-2xl flex flex-col items-center justify-center">
                 $9.99 
                 <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-2 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">Lowest Price</span>
               </div>
             </div>
          </div>

          {/* Pricing Grid */}
          <div className="order-1 lg:order-2 space-y-10">
             <div className="flex items-center gap-4 text-2xl font-bold tracking-tight">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                   <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                Get Your Official Report
             </div>
             <div className="grid sm:grid-cols-2 gap-5">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.count}
                    className={cn(
                      "relative rounded-3xl border-2 p-8 flex flex-col transition-all cursor-pointer group",
                      pkg.popular 
                        ? 'border-primary bg-background shadow-[0_20px_50px_rgba(37,99,235,0.15)] ring-4 ring-primary/5 scale-105 z-10' 
                        : 'border-border bg-background hover:border-primary/50'
                    )}
                    onClick={handleScrollToSearch}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-lg pulse-shadow">
                          Best Value
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold">
                        {pkg.count} {pkg.count === 1 ? 'Report' : 'Reports'}
                      </h4>
                      {pkg.saving > 0 && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
                          SAVE {pkg.saving}%
                        </span>
                      )}
                    </div>

                    <div className="my-6 flex items-baseline gap-1">
                      <span className="text-4xl font-black tracking-tight">${pkg.price}</span>
                      <span className="text-sm font-medium text-muted-foreground">total</span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-8 flex items-center gap-1.5">
                       <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                       Only ${(pkg.price / pkg.count).toFixed(2)} per report
                    </p>
                    
                    <Button 
                      variant={pkg.popular ? "default" : "outline"} 
                      className={cn(
                        "w-full rounded-2xl h-12 font-bold transition-all",
                        pkg.popular && "shadow-lg shadow-primary/25 hover:shadow-primary/40"
                      )}
                    >
                      Instant Check
                    </Button>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-shadow {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        .pulse-shadow {
          animation: pulse-shadow 2s infinite;
        }
      `}</style>
    </section>
  )
}

