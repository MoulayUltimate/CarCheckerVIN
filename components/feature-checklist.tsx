import { CheckCircle2 } from 'lucide-react'

const checklistCategories = [
  {
    title: 'Condition & Value Data',
    items: [
      'Market Valuation (Trade-in & Retail)',
      'Odometer Verification & Rollbacks',
      'Structural Damage & Total Loss',
      'Accident History & Severity',
      'Junk, Lemon & Flood Brands',
      'NHTSA Crash Test Ratings',
      'Salvage & Auction Photos',
    ]
  },
  {
    title: 'Ownership & Legal Records',
    items: [
      'Detailed Ownership History',
      'Title Brand Records',
      'State Title Registrations',
      'Active Liens & Auto Loans',
      'Theft & Recovery Records',
      'Impound & Export Records',
      'Commercial/Rental Usage',
    ]
  },
  {
    title: 'Technical & Lifecycle Data',
    items: [
      'Original MSRP & Specs',
      'Factory Window Sticker',
      'Active Safety Recalls',
      'Routine Maintenance Logs',
      'Dealership Service History',
      'Airbag Deployment Cases',
      '5-Year Cost of Ownership',
    ]
  }
]

export function FeatureChecklist() {
  return (
    <section className="py-24 bg-muted/30 border-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex md:items-end md:justify-between border-b pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Comprehensive 40+ Point Coverage
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We leverage NMVTIS federal data, dealership networks, and insurance databases to give you the most exhausting vehicle record possible. Here is what's included in every report.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex shrink-0">
             <div className="text-sm font-medium bg-background px-4 py-2 rounded-full border shadow-sm flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Live Database Connection
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {checklistCategories.map((category) => (
            <div key={category.title} className="bg-background rounded-2xl p-8 border shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-foreground">{category.title}</h3>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item} className="flex flex-row items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                    <span className="text-muted-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground border-t pt-4">
                 <span className="text-primary font-bold">+ 10 More Checks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
