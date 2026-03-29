import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { VinSearch } from '@/components/vin-search'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">VIN Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            We couldn&apos;t find any vehicle information for this VIN. Please check the VIN and try again.
          </p>
          
          <div className="mt-8">
            <VinSearch variant="compact" />
          </div>

          <div className="mt-6">
            <Link href="/">
              <Button variant="ghost">Return to Homepage</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
