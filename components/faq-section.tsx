import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FaqSectionData } from "@/sanity/lib/queries"

// ── Used only as a FALLBACK if Sanity has no "Homepage FAQ" content yet ──
const DEFAULT_LABEL = "Frequently Asked Questions"
const DEFAULT_HEADING = "Frequently Asked Questions"

const DEFAULT_FAQS = [
  {
    question: "What services does Beno Support offer?",
    answer: "We offer end-to-end technology services including core engineering, Agentic AI, Cloud Platform engineering, cybersecurity, digital experience design, and strategic tech governance.",
  },
  {
    question: "Which industries do you specialize in?",
    answer: "We serve Fintech, Healthcare, IT SaaS, Government, Travel, Hospitality, E-commerce, Telecom, Insurance, Gaming, and more.",
  },
  {
    question: "How can you help with AI consulting?",
    answer: "We design and deploy enterprise AI agents, LLM-powered workflows, and intelligent automation systems tailored to your operational goals.",
  },
  {
    question: "Do you provide cloud modernization services?",
    answer: "Yes. We migrate, optimize, and manage cloud infrastructure across AWS, Azure, and Google Cloud with a focus on cost efficiency and scalability.",
  },
  {
    question: "How do you ensure SaaS scalability?",
    answer: "We build on top-tier cloud systems with distributed architecture, automated testing, and continuous monitoring to ensure reliable scaling.",
  },
  {
    question: "What is your approach to Cybersecurity?",
    answer: "Our risk management is aligned to global benchmarks including CMMI Dev Level 5, ISO 27001, and ISO 9001, with proactive monitoring built into every practice.",
  },
  {
    question: "Do you offer Managed IT services?",
    answer: "Yes, we provide flexible managed services including Time & Materials, Fixed Cost, Distributed Squads, and Fully Outsourced models.",
  },
  {
    question: "Where is Beno Support located?",
    answer: "We operate state-of-the-art delivery hubs across India and serve clients in the USA, Europe, Middle East, SE Asia, and Australia.",
  },
]

type FaqSectionProps = {
  faqData?: FaqSectionData
}

export function FaqSection({ faqData }: FaqSectionProps) {
  const label = faqData?.sectionLabel || DEFAULT_LABEL
  const heading = faqData?.heading || DEFAULT_HEADING
  const faqs = faqData?.items && faqData.items.length > 0 ? faqData.items : DEFAULT_FAQS

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="type-label font-semibold section-label-light">
            {label}
          </span>
          <h2 className="mt-2 text-balance type-heading font-bold text-primary">
            {heading}
          </h2>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="type-body text-secondary">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
