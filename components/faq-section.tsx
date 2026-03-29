import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is a VIN and where can I find it?',
    answer: 'A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every vehicle. You can find it on the driver\'s side dashboard (visible through the windshield), on the driver\'s side door jamb, on your vehicle registration, or on your insurance card.',
  },
  {
    question: 'What information does a VIN decode provide?',
    answer: 'A VIN decode provides comprehensive vehicle information including the manufacturer, model year, make, model, trim level, engine type, transmission, body style, country of origin, and more. Our reports also include recall information, specifications, and ownership cost estimates.',
  },
  {
    question: 'Is the VIN decode free?',
    answer: 'Yes! Basic VIN decoding is completely free. You can instantly see the make, model, year, and basic specifications. Premium reports with full history, recalls, and ownership costs are available for a small fee.',
  },
  {
    question: 'How accurate is the vehicle information?',
    answer: 'Our data is sourced directly from authoritative databases including NHTSA, manufacturer records, and industry-standard vehicle databases. We maintain a 99.9% accuracy rate across all VIN decodes.',
  },
  {
    question: 'Can I check for vehicle recalls?',
    answer: 'Yes! Our reports include both historical and active recalls from the NHTSA database. You\'ll see the recall description, potential consequences, and recommended remedies for any affected vehicles.',
  },
  {
    question: 'What is Total Cost of Ownership (TCO)?',
    answer: 'TCO is an estimate of all costs associated with owning a vehicle over 5 years, including depreciation, fuel costs, maintenance, repairs, insurance, and taxes. This helps you understand the true cost of ownership beyond the purchase price.',
  },
  {
    question: 'Do you store my VIN searches?',
    answer: 'We take privacy seriously. VIN searches are used only to provide you with vehicle information and are not sold to third parties. See our Privacy Policy for complete details on how we handle your data.',
  },
  {
    question: 'Can I use this for commercial purposes?',
    answer: 'Yes! We offer API access for businesses including dealerships, insurance companies, and automotive services. Contact us for enterprise pricing and integration support.',
  },
]

export function FAQ() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Everything you need to know about VIN decoding and vehicle history reports
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
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
