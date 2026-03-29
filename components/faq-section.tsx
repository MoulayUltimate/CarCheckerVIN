import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is a Vehicle History Report?',
    answer: (
      <>
        Millions of consumers rely on our vehicle history reports every day to help them decide 
        whether or not to buy a used car. Each report contains information about whether the car 
        in question has been in an accident, has any open recalls, previous owners, service history 
        and much, much more.{' '}
        <Link href="/pricing" className="text-primary hover:underline font-medium">
          See Pricing
        </Link>
      </>
    ),
  },
  {
    question: 'Do you have a report for every vehicle?',
    answer: (
      <>
        Reports are available for vehicles manufactured since 1981, when the 17-character VIN was 
        standardized. We have information about cars and light trucks, though some information for 
        other vehicle types may be reported as well. Our database contains billions of records from 
        more than 150,000 domestic and international sources.{' '}
        <Link href="/#search" className="text-primary hover:underline font-medium">
          Check a VIN
        </Link>
      </>
    ),
  },
  {
    question: 'Who is a Vehicle History Report for?',
    answer: (
      <>
        A vehicle history report can be used by anyone who wants to check the history of a used car. 
        You may use a report to check the history of a car you&apos;re about to buy, or a car you own 
        that you&apos;d like to sell to a private party. Shoppers feel more confident buying a used 
        car once they know its history.{' '}
        <Link href="#testimonials" className="text-primary hover:underline font-medium">
          See What Customers Say
        </Link>
      </>
    ),
  },
  {
    question: 'What is a VIN?',
    answer: (
      <>
        VIN stands for a car&apos;s Vehicle Identification Number. A VIN consists of 17 characters 
        and serves as a unique identifier for a specific vehicle. You can use either a VIN or a 
        license plate and state to get a vehicle history report.{' '}
        <Link href="/#search" className="text-primary hover:underline font-medium">
          Check a VIN or License Plate
        </Link>
      </>
    ),
  },
  {
    question: 'Where can I find my VIN?',
    answer: (
      <>
        You can find your VIN in several locations: on the driver&apos;s side dashboard (visible 
        through the windshield), on a sticker inside the driver&apos;s side door jamb, on your 
        vehicle registration card, on your insurance card or policy documents, and on your vehicle 
        title.
      </>
    ),
  },
  {
    question: 'What information is included in a report?',
    answer: (
      <>
        Our comprehensive reports include accident history, service records, ownership history, 
        title information, odometer readings, safety recalls, detailed vehicle specifications, 
        and 5-year total cost of ownership estimates. Each report is sourced from official databases 
        and verified data sources.{' '}
        <Link href="/sample-report" className="text-primary hover:underline font-medium">
          View Sample Report
        </Link>
      </>
    ),
  },
  {
    question: 'How accurate is the vehicle information?',
    answer: (
      <>
        Our data is sourced directly from authoritative databases including NHTSA, manufacturer 
        records, and industry-standard vehicle databases. We maintain a 99.9% accuracy rate across 
        all VIN decodes and continuously update our database with new records.
      </>
    ),
  },
  {
    question: 'Can I use this for commercial purposes?',
    answer: (
      <>
        Yes! We offer API access for businesses including dealerships, insurance companies, and 
        automotive services. Our enterprise plans include high-volume access, dedicated support, 
        and custom integrations.{' '}
        <Link href="/pricing" className="text-primary hover:underline font-medium">
          Contact us for enterprise pricing
        </Link>
      </>
    ),
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Everything you need to know about vehicle history reports
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
