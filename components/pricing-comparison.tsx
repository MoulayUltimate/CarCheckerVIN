'use client'

import { Check, X, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const packages = [
  { count: 1, price: 7.99, popular: false },
  { count: 3, price: 14.99, popular: false },
  { count: 5, price: 19.99, popular: true },
  { count: 10, price: 34.99, popular: false },
]

export function PricingComparison() {
  const handleScrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-muted/20 border-y relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance mb-4">
            Same Data. A Fraction of the Price.
          </h2>
          <p className="text-lg text-muted-foreground">
            Why pay $44.99 elsewhere when you can access the exact same NMVTIS federal databases and dealership records for substantially less?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Direct Comparison */}
          <div className="bg-background rounded-3xl border shadow-xl overflow-hidden order-2 lg:order-1">
             <div className="grid grid-cols-3 bg-muted border-b font-semibold text-sm">
               <div className="p-4 text-muted-foreground uppercase">Features</div>
               <div className="p-4 text-center border-x">Other Guys</div>
               <div className="p-4 text-center text-primary bg-primary/5">VinCheck Pro</div>
             </div>

             {/* Row 1 */}
             <div className="grid grid-cols-3 border-b text-sm items-center">
               <div className="p-4 font-medium">NMVTIS Records</div>
               <div className="p-4 flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>
               <div className="p-4 flex justify-center bg-primary/5"><Check className="w-5 h-5 text-primary" /></div>
             </div>
             {/* Row 2 */}
             <div className="grid grid-cols-3 border-b text-sm items-center">
               <div className="p-4 font-medium">Auction Photos</div>
               <div className="p-4 flex justify-center"><X className="w-5 h-5 text-red-500/50" /></div>
               <div className="p-4 flex justify-center bg-primary/5"><Check className="w-5 h-5 text-primary" /></div>
             </div>
             {/* Row 3 */}
             <div className="grid grid-cols-3 border-b text-sm items-center">
               <div className="p-4 font-medium">AI Risk Insights</div>
               <div className="p-4 flex justify-center"><X className="w-5 h-5 text-red-500/50" /></div>
               <div className="p-4 flex justify-center bg-primary/5"><Check className="w-5 h-5 text-primary" /></div>
             </div>
             {/* Price Row */}
             <div className="grid grid-cols-3 text-sm items-center font-bold">
               <div className="p-4">Price per report</div>
               <div className="p-4 text-center text-red-500 border-x text-lg">$44.99</div>
               <div className="p-4 text-center text-primary bg-primary/5 text-xl flex flex-col items-center justify-center">
                 $7.99 
                 <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mt-1">Starting at</span>
               </div>
             </div>
          </div>

          {/* Pricing Grid */}
          <div className="order-1 lg:order-2 space-y-8">
             <div className="flex items-center gap-3 text-xl font-bold">
                <ShieldCheck className="w-8 h-8 text-primary" />
                Select Your Report Package
             </div>
             <div className="grid sm:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.count}
                    className={`relative rounded-2xl border p-6 flex flex-col transition-all cursor-pointer hover:-translate-y-1 ${
                      pkg.popular 
                        ? 'border-primary ring-2 ring-primary/20 bg-background shadow-xl' 
                        : 'bg-background shadow-sm hover:shadow-md'
                    }`}
                    onClick={handleScrollToSearch}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-4 -translate-y-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <h4 className="text-lg font-medium text-muted-foreground">
                      {pkg.count} {pkg.count === 1 ? 'Report' : 'Reports'}
                    </h4>
                    <div className="my-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight">${pkg.price}</span>
                      <span className="text-sm font-medium text-muted-foreground">total</span>
                    </div>
                    
                    <Button 
                      variant={pkg.popular ? "default" : "outline"} 
                      className="w-full mt-auto"
                    >
                      Check VIN Now
                    </Button>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
