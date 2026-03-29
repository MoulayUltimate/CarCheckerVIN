import { 
  AlertTriangle, 
  Wrench, 
  Users, 
  FileText,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const reportCategories = [
  {
    icon: AlertTriangle,
    title: 'Accident Data',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    items: [
      'Accident History',
      'Damage Severity (Severe/Minor)',
      'Damage Location/Point of Impact',
      'Records of Damage Repair',
      'Airbag Deployment',
      'Structural Damage',
    ],
  },
  {
    icon: Wrench,
    title: 'Service History',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    items: [
      'Oil Changes',
      'Tire Rotations',
      'Open Recalls',
      'Brake Rotor Replacement',
      'Transmission Replacement',
      'Safety Inspections',
    ],
  },
  {
    icon: Users,
    title: 'Type of Use',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    items: [
      'Personal Vehicle',
      'Rental Vehicle',
      'Leased Vehicle',
      'Commercial Vehicle',
      'Used as a Taxi',
      'Used as a Police Vehicle',
    ],
  },
  {
    icon: FileText,
    title: 'Ownership History',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    items: [
      '1, 2 or 3+ Previous Owners',
      'States/Provinces Owned In',
      'Length of Ownership',
      'Last Reported Mileage',
      'Odometer Rollback',
      'Flood or Lemon Title',
    ],
  },
]

export function ReportChecks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Every Vehicle History Report Checks For...
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Our comprehensive reports analyze critical vehicle data from multiple sources
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reportCategories.map((category) => (
            <Card key={category.title} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <CardTitle className="mt-3 text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${category.color}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link 
            href="/sample-report" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View Sample Report
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
