import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VinSearch } from '@/components/vin-search'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Search, FileText, HelpCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'License Plate Lookup - VINCheck Pro',
  description: 'Look up vehicle information by license plate number. Get VIN and vehicle history.',
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
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                License Plate Lookup
              </h1>
              {plate && state && (
                <p className="mt-4 text-lg text-muted-foreground">
                  Searching for: <span className="font-semibold">{plate}</span> ({state})
                </p>
              )}
            </div>

            <Alert className="mt-8" variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>License Plate Lookup Coming Soon</AlertTitle>
              <AlertDescription>
                License plate lookup is currently in development. For now, please use the VIN 
                to get your vehicle history report. You can find the VIN on your vehicle 
                registration or insurance documents.
              </AlertDescription>
            </Alert>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Where to Find Your VIN
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The VIN (Vehicle Identification Number) is a 17-character code unique to your vehicle. 
                  You can find it in these locations:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-semibold">1.</span>
                    <span>Driver&apos;s side dashboard (visible through windshield)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-semibold">2.</span>
                    <span>Driver&apos;s side door jamb sticker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-semibold">3.</span>
                    <span>Vehicle registration card</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-semibold">4.</span>
                    <span>Insurance card or policy documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-semibold">5.</span>
                    <span>Vehicle title</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Search by VIN Instead</h2>
              <VinSearch />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
