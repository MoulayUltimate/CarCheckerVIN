import { VinSearch } from '@/components/vin-search'

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Ready to Check Your Vehicle?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80 text-pretty">
            Enter your VIN now and get instant access to comprehensive vehicle information.
          </p>
          <div className="mt-10 flex justify-center">
            <VinSearch className="[&_input]:bg-white [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground [&_button]:bg-accent [&_button]:text-accent-foreground [&_button:hover]:bg-accent/90 [&_p]:text-primary-foreground/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
