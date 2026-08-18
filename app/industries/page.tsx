"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ChevronDown,
  AlertTriangle, TrendingDown, ShieldAlert, Layers, BarChart2, Users2,
  Code2, Bot, ShieldCheck, Cloud, Database, Monitor, Boxes, Cpu,
  Globe,
  Star,
} from "lucide-react"
import UseCasesSection from "./component/useCase"
import { SiteFooter } from "@/components/site-footer"
import { prepareHeadingWordAnimation } from "@/lib/prepare-heading-word-animation"
import { SiteHeader } from "@/components/site-header"
import { INDUSTRY_GRID_ITEMS } from "@/lib/industries-grid-data"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import IndustriesHero from "./component/hero"
import BusinessOutcomes from "./component/outcomeMetrix"
import {
  PageCTAOutlineButton,
  PageCTAPrimaryButton,
  PageCTASection,
} from "@/components/page-cta"
import { useProposalModal } from "@/hooks/use-proposal-modal"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const challengesData = {
  sectionLabel: "Industry Challenges",
  title: "Business & Technology Challenges Across Industries",
  subtitle:
    "Every industry faces unique operational, compliance, security, and scalability challenges. As technology evolves, organizations must balance innovation with efficiency while meeting growing customer expectations.",
  cards: [
    { icon: Code2,         title: "Legacy Systems & Technical Debt",          desc: "Outdated architectures slow agility, inflate maintenance costs, and block cloud adoption." },
    { icon: TrendingDown,  title: "Rising Operational Costs",                 desc: "Manual workflows and siloed tooling eat margins; automation is the fastest lever to pull." },
    { icon: ShieldAlert,   title: "Cybersecurity & Compliance Risks",         desc: "Evolving threat landscapes and tightening regulations require always-on, adaptive security." },
    { icon: Layers,        title: "Scalability Challenges",                   desc: "Monolithic systems buckle under growth; modern distributed architecture removes that ceiling." },
    { icon: BarChart2,     title: "Data Silos & Limited Visibility",          desc: "Fragmented data stacks make real-time decisions impossible — unified pipelines fix that." },
    { icon: Users2,        title: "Customer Experience Expectations",         desc: "Hyper-personalised, always-on digital experiences are now table stakes, not differentiators." },
  ],
}

const solutionsData = {
  sectionLabel: "How beno Support Helps",
  title: "Solving Industry Challenges with Intelligent Technology",
  subtitle:
    "Beno Support combines domain expertise, AI innovation, cloud-native engineering, cybersecurity capabilities, and product-focused delivery to solve complex business challenges across industries.",
  cards: [
    { icon: Code2,        title: "Application Modernisation",        desc: "Migrate monoliths to microservices, rebuild legacy stacks, and modernise entire application portfolios." },
    { icon: Bot,          title: "AI Process Automation",            desc: "Automate repetitive tasks across finance, HR, ops, and support to dramatically reduce manual costs." },
    { icon: ShieldCheck,  title: "Cybersecurity Services",           desc: "Protect critical systems, data, and digital assets with pen-testing, SOC, and compliance tooling." },
    { icon: Cloud,        title: "Cloud Transformation",             desc: "Build cloud-native infrastructure on AWS, Azure, or GCP — multi-region, IaC-managed, FinOps-tuned." },
    { icon: Database,     title: "Data Engineering & Analytics",     desc: "Design real-time data pipelines, warehouses, and BI layers that surface actionable intelligence." },
    { icon: Monitor,      title: "Managed IT Services",              desc: "24/7 monitoring, incident response, patching, and SLA-backed infrastructure management." },
    { icon: Boxes,        title: "Digital Experience Platforms",     desc: "Omni-channel commerce, CMS, and portal solutions with best-in-class UX engineering." },
    { icon: Cpu,          title: "Agile Product Engineering",        desc: "End-to-end product squads — discovery, design, engineering, QA, and launch — in rapid sprints." },
  ],
}

const useCaseTabs = ["Fintech", "IT Services", "Healthcare", "EdTech", "Government"]

const outcomesData = [
  "Reduce Manual Effort by Up to 60%",
  "Accelerate Process Efficiency",
  "Improve Customer Experience",
  "Increase Operational Visibility",
  "Enhance Security Posture",
  "Reduce Infrastructure Costs",
  "Improve Business Agility",
  "Accelerate Time-to-Market",
]

const techStackData = {
  sectionLabel: "Technology We Use",
  title: "Modern Technologies Powering Digital Transformation",
  filters: [
    "AI / Machine Learning",
    "Cloud & DevOps",
    "Data & Analytics",
    "Mobile & Frontend",
    "Security",
    "Integration",
  ],
  stacks: [
    {
      name: "OpenAI",
      category: "AI / Machine Learning",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    },
    {
      name: "TensorFlow",
      category: "AI / Machine Learning",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    },
    {
      name: "PyTorch",
      category: "AI / Machine Learning",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    },
    {
      name: "LangChain",
      category: "AI / Machine Learning",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/langchain.svg",
    },
    {
      name: "Hugging Face",
      category: "AI / Machine Learning",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/huggingface.svg",
    },
    {
      name: "Anthropic (Claude)",
      category: "AI / Machine Learning",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
    },
    {
      name: "AWS",
      category: "Cloud & DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Azure",
      category: "Cloud & DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    },
    {
      name: "GCP",
      category: "Cloud & DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    },
    {
      name: "Docker",
      category: "Cloud & DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Kubernetes",
      category: "Cloud & DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "Terraform",
      category: "Cloud & DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    },
    {
      name: "Snowflake",
      category: "Data & Analytics",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/snowflake.svg",
    },
    {
      name: "PostgreSQL",
      category: "Data & Analytics",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      category: "Data & Analytics",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Apache Kafka",
      category: "Data & Analytics",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
    },
    {
      name: "Databricks",
      category: "Data & Analytics",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/databricks.svg",
    },
    {
      name: "Power BI",
      category: "Data & Analytics",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerbi.svg",
    },
    {
      name: "React Native",
      category: "Mobile & Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Flutter",
      category: "Mobile & Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    },
    {
      name: "React",
      category: "Mobile & Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      category: "Mobile & Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Swift",
      category: "Mobile & Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    },
    {
      name: "Tailwind CSS",
      category: "Mobile & Frontend",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg",
    },
    {
      name: "Okta",
      category: "Security",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/okta.svg",
    },
    {
      name: "Auth0",
      category: "Security",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/auth0.svg",
    },
    {
      name: "Cloudflare",
      category: "Security",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg",
    },
    {
      name: "HashiCorp Vault",
      category: "Security",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vault.svg",
    },
    {
      name: "AWS IAM",
      category: "Security",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "OWASP",
      category: "Security",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/owasp.svg",
    },
    {
      name: "Prisma",
      category: "Integration",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    },
    {
      name: "Zapier",
      category: "Integration",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg",
    },
    {
      name: "Postman",
      category: "Integration",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "GraphQL",
      category: "Integration",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
    {
      name: "Twilio",
      category: "Integration",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twilio.svg",
    },
    {
      name: "Stripe",
      category: "Integration",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
    },
  ],
};

const whyData = {
    sectionLabel: "Why Choose Us",
  title: "Why Leading Organizations Choose Beno Support ",
  subtitle:
    "Beno Support combines domain expertise, AI innovation, cloud-native engineering, cybersecurity capabilities, and product-focused delivery to solve complex business challenges across industries.",
    cards:[
  
  { icon: Star,         title: "15+ Years of Engineering Excellence",      desc: "Proven track record delivering enterprise solutions since 2008 across 20+ countries." },
  { icon: TrendingDown, title: "250+ Projects Delivered",     desc: "A portfolio spanning fintech, healthcare, government, and e-commerce at scale." },
  { icon: ShieldCheck,  title: "Certified & Compliance-Driven",            desc: "CMMI Dev L5, ISO 27001, ISO 9001 — audit-ready, always." },
  { icon: Users2,       title: "Flexible Engagement Models",               desc: "T&M, fixed-cost, dedicated squads, or fully outsourced — structured to your workflow." },
  { icon: Bot,          title: "AI-Native Engineering",                    desc: "AI embedded into delivery pipelines for faster, more accurate, smarter outcomes." },
  { icon: Globe,        title: "End-to-End Technology ",        desc: "Strategy → build → operate: one partner across the full technology lifecycle." },
    { icon: Users2,       title: "Global Delivery Capability",               desc: "Scalable delivery teams supporting organizations across multiple regions and time zones." },
  { icon: Bot,          title: "End-to-End Technology",                    desc: "Supporting businesses from strategy and implementation to ongoing optimization and support." },
]
}



const faqData = [
  { question: "Which industries does Beno Support serve?",                          answer: "We work across fintech, healthcare, government, e-commerce, logistics, education, hospitality, manufacturing, energy, and more. Our cross-domain expertise lets us apply proven patterns from one vertical to accelerate delivery in another." },
  { question: "Can you provide industry-specific digital transformation solutions?", answer: "Absolutely. Every engagement starts with a domain discovery sprint — mapping your regulatory context, existing architecture, and business KPIs — before a single line of code is written." },
  { question: "How can we help with AI consulting?",                                answer: "From use-case identification and data readiness assessment to model selection, MLOps pipeline setup, and production deployment, we handle the full AI consulting and engineering lifecycle." },
  { question: "Do you provide cloud transformation services?",                      answer: "Yes. We design and migrate workloads to AWS, Azure, and GCP using infrastructure-as-code, GitOps, and FinOps practices to optimise both resilience and cost." },
  { question: "Can Beno Support integrate with existing enterprise systems?",       answer: "Integration is a core competency. We connect modern stacks to SAP, Salesforce, Oracle, legacy ERPs, and bespoke internal platforms via REST, GraphQL, event streaming, or EDI." },
  { question: "Do you provide an SLA for IT delivery capability?",                  answer: "Yes. All managed-service and dedicated-squad engagements include formally agreed SLAs covering uptime, response times, defect resolution, and reporting cadence." },
  { question: "Can you modernise legacy enterprise systems?",                       answer: "Yes. Our modernisation practice covers everything from strangler-fig API wrappers and incremental re-architecture to full rewrites — always mapped to business risk tolerance." },
]

// ─────────────────────────────────────────────────────────────────
// REUSABLE ANIMATION HOOK
// ─────────────────────────────────────────────────────────────────

function useSectionEntrance(
  ref: React.RefObject<HTMLElement | null>,
  headingSelector = "h2",
  labelSelector = ".label-chip"
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 76%", toggleActions: "play none none none" },
      })

      const label = el.querySelector(labelSelector)
      if (label)
        tl.fromTo(label,
          { opacity: 0, y: 14, scale: 0.82 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0)

      const h = el.querySelector<HTMLElement>(headingSelector)
      if (h) {
        const wordEls = prepareHeadingWordAnimation(h)
        if (wordEls.length)
          tl.fromTo(wordEls,
            { y: "115%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.75, stagger: 0.05, ease: "expo.out" }, 0.1)
      }

      const sub = el.querySelector("p.section-sub")
      if (sub)
        tl.fromTo(sub,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.38)
    }, el)
    return () => ctx.revert()
  }, [])
}

// ─────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────
// SECTION 2 — CHALLENGES (light)
// ─────────────────────────────────────────────────────────────────

function ChallengesSection() {
  const ref = useRef<HTMLElement>(null)
  useSectionEntrance(ref)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>(".challenge-card")
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.94 })
      gsap.to(cards, {
        opacity: 1, y: 0, scale: 1, duration: 0.75,
        stagger: { each: 0.08, grid: [2, 3], from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 72%" },
      })

      cards.forEach(card => {
        const iconBox = card.querySelector<HTMLElement>(".ch-icon")
        card.addEventListener("mouseenter", () => {
          gsap.to(card,    { y: -6, boxShadow: "0 16px 48px rgba(7,36,72,0.12)", duration: 0.3, ease: "power2.out" })
          if (iconBox) gsap.to(iconBox, { scale: 1.12, backgroundColor: "#072348", duration: 0.3, ease: "back.out(2)" })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card,    { y: 0, boxShadow: "0 2px 8px rgba(7,36,72,0.05)", duration: 0.4, ease: "power2.out" })
          if (iconBox) gsap.to(iconBox, { scale: 1, backgroundColor: "#eef2ff", duration: 0.35, ease: "power2.out" })
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-[#f7f9fc] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 max-w-7xl">
          <span className="label-chip type-label font-semibold section-label-light">
            {challengesData.sectionLabel}
          </span>
          <h2 className="mt-4 type-heading font-bold text-[#0a1628]">
            {challengesData.title}
          </h2>
          <p className="section-sub mt-4 text-base leading-relaxed text-[#4b5a72] sm:text-lg" style={{ opacity: 0 }}>
            {challengesData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challengesData.cards.map((c) => {
            const Icon = c.icon
            return (
              <div
  key={c.title}
  className="challenge-card group rounded-2xl border border-[#e2e8f0] bg-white p-7 cursor-default"
  style={{ boxShadow: "0 2px 8px rgba(7,36,72,0.05)", transition: "none" }}
>
  <div className="ch-icon mb-5 flex size-11 items-center justify-center rounded-xl bg-[#eef2ff]">
    <Icon className="size-5 text-[#072448] transition-colors duration-300 group-hover:text-white" />
  </div>
  <h3 className="mb-2 type-body font-bold text-[#0a1628]">{c.title}</h3>
                <p className="type-body text-[#4b5a72]">{c.desc}</p>
</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────────
// SECTION 3 — SOLUTIONS (dark)
// ─────────────────────────────────────────────────────────────────

function SolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none" },
      })

      const label = headingRef.current?.querySelector(".label-chip")
      if (label) tl.fromTo(label, { opacity: 0, y: 14, scale: 0.82 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0)

      const h2 = headingRef.current?.querySelector<HTMLElement>("h2")
      if (h2) {
        const wordEls = prepareHeadingWordAnimation(h2)
        if (wordEls.length)
          tl.fromTo(wordEls, { y: "115%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.75, stagger: 0.05, ease: "expo.out" }, 0.1)
      }

      const sub = headingRef.current?.querySelector("p")
      if (sub) tl.fromTo(sub, { opacity: 0, y: 20, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.38)

      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".sol-card")
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.93 })
        tl.to(cards, {
          opacity: 1, y: 0, scale: 1, duration: 0.85,
          stagger: { each: 0.08, grid: [2, 4], from: "start" },
          ease: "power3.out",
        }, 0.45)

        cards.forEach((card, i) => {
          const iconWrap = card.querySelector<HTMLElement>(".icon-wrap")
          if (iconWrap) tl.fromTo(iconWrap, { scale: 0, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: "back.out(1.7)" }, 0.45 + i * 0.08 + 0.22)

          card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -6, backgroundColor: "#3b5b82", duration: 0.32, ease: "power2.out" })
            if (iconWrap) gsap.to(iconWrap, { scale: 1.12, duration: 0.3, ease: "back.out(2)" })
          })
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, backgroundColor: "transparent", duration: 0.42, ease: "power2.out" })
            if (iconWrap) gsap.to(iconWrap, { scale: 1, duration: 0.35, ease: "power2.out" })
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-[#072348] py-20 lg:py-28">
      <div ref={sectionRef} className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div ref={headingRef} className="mb-12 max-w-7xl">
          <span className="label-chip type-label font-semibold section-label-dark">
            {solutionsData.sectionLabel}
          </span>
          <h2 className="mt-4 type-heading font-bold text-white">
            {solutionsData.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            {solutionsData.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {solutionsData.cards.map((card, index) => {
            const Icon = card.icon
            const cols = 4
            const isFirstInRow = index % cols === 0
            const isFirstRow = index < cols
            const borderCls = [
              "border-white/10",
              index > 0 ? "border-t" : "",
              !isFirstInRow ? "sm:border-l" : "sm:border-l-0",
              isFirstRow ? "sm:border-t-0" : "sm:border-t",
            ].join(" ")
            return (
              <div key={card.title}
                className={`sol-card flex flex-col gap-3 p-7 cursor-default ${borderCls}`}
                style={{ backgroundColor: "transparent", transition: "none" }}>
                <div className="icon-wrap flex size-10 items-center justify-center rounded-xl bg-[#1e3a6e] text-white"
                  style={{ transition: "none" }}>
                  <Icon className="size-5" />
                </div>
                <h3 className="type-body font-bold text-white leading-snug">{card.title}</h3>
                <p className="type-body text-white/60">{card.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 4 — INDUSTRIES GRID
// ─────────────────────────────────────────────────────────────────

function IndustriesGrid() {
  const ref = useRef<HTMLElement>(null)
  useSectionEntrance(ref)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>(".industry-card")
      gsap.fromTo(cards,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
          stagger: { each: 0.05, grid: [2, 6], from: "start" },
          scrollTrigger: { trigger: el, start: "top 85%" } })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="type-label font-semibold section-label-light">Industries</span>
          <h2 className="mt-2 type-heading font-bold text-primary">
            Industries We Serve
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {INDUSTRY_GRID_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="industry-card flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-accent cursor-default"
              >
                <Icon className="size-7 text-accent" />
                <span className="text-sm font-medium text-primary">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 5 — USE CASES TABS (light)
// ─────────────────────────────────────────────────────────────────

// function UseCasesSection() {
//   const [activeTab, setActiveTab] = useState(0)
//   const ref       = useRef<HTMLElement>(null)
//   const cardRef   = useRef<HTMLDivElement>(null)
//   useSectionEntrance(ref)

//   const handleTab = (i: number) => {
//     if (i === activeTab) return
//     if (cardRef.current) {
//       gsap.to(cardRef.current, {
//         opacity: 0, y: 12, duration: 0.18, ease: "power2.in",
//         onComplete: () => {
//           setActiveTab(i)
//           gsap.fromTo(cardRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" })
//         },
//       })
//     } else setActiveTab(i)
//   }

//   const cases = [
//     { title: "AI-Powered Fraud Detection & Prevention", desc: "Real-time ML models detecting fraudulent transactions with sub-50ms latency across card, ACH, and digital wallet channels.", tag: "Fintech" },
//     { title: "Enterprise AI Agentic Implementation", desc: "Autonomous agents handling L1 IT tickets, procurement approvals, and compliance checks end-to-end without human handoff.", tag: "IT Services" },
//     { title: "Predictive Patient Risk Stratification", desc: "Clinical NLP and ML pipeline surfacing high-risk patients 72 hours before deterioration across 40+ vitals and notes.", tag: "Healthcare" },
//     { title: "Adaptive Learning Path Engine", desc: "LLM-driven curriculum personalisation adjusting content difficulty and format in real time based on engagement signals.", tag: "EdTech" },
//     { title: "Smart City Operations Dashboard", desc: "Unified IoT data platform ingesting 2M+ events/day from traffic, energy, and public safety sensors with live anomaly alerts.", tag: "Government" },
//   ]
//   const active = cases[activeTab]

//   return (
//     <section ref={ref} className="bg-[#f7f9fc] py-20 lg:py-28">
//       <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
//         <div className="mb-10 max-w-2xl">
//           <span className="label-chip type-label font-semibold section-label-light">Case Studies</span>
//           <h2 className="mt-4 type-heading font-bold text-[#0a1628]">
//             Real-World Use Cases Across Industries
//           </h2>
//           <p className="section-sub mt-4 text-base leading-relaxed text-[#4b5a72]" style={{ opacity: 0 }}>
//             Explore how we've delivered measurable outcomes across verticals.
//           </p>
//         </div>

//         {/* tabs */}
//         <div className="flex gap-3 flex-wrap mb-6">
//           {useCaseTabs.map((tab, i) => (
//             <button key={tab} onClick={() => handleTab(i)}
//               className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${i === activeTab
//                 ? "bg-[#072448] text-white shadow-[0_6px_20px_rgba(7,36,72,0.25)]"
//                 : "bg-white border border-[#d1d9e6] text-[#4b5a72] hover:border-[#072448]/40"}`}>
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* card */}
//         <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
//           <div className="p-8 lg:p-10 flex flex-col justify-between">
//             <div>
//               <span className="inline-block rounded-full bg-[#eef2ff] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#072448] mb-4">{active.tag}</span>
//               <h3 className="text-[20px] font-extrabold text-[#0a1628] leading-snug mb-3">{active.title}</h3>
//               <p className="text-[14px] leading-[1.7] text-[#4b5a72]">{active.desc}</p>
//             </div>
//             <button className="mt-8 flex items-center gap-2 text-[13px] font-bold text-[#072448] hover:text-[#072448] transition-colors">
//               Explore Case Study <ArrowRight className="size-4" />
//             </button>
//           </div>
//           <div className="hidden lg:flex items-center justify-center min-h-[280px] relative overflow-hidden"
//             style={{ background: "linear-gradient(135deg, #0d2550 0%, #1a3a6e 100%)" }}>
//             <div className="absolute inset-0 opacity-10"
//               style={{ backgroundImage: "linear-gradient(rgba(59,103,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(59,103,255,0.6) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
//             <div className="relative z-10 text-center px-8">
//               <p className="text-[48px] font-extrabold text-white/20 leading-none">{activeTab + 1}</p>
//               <p className="text-[13px] font-semibold text-white/50 mt-2 uppercase tracking-widest">{active.tag}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// ─────────────────────────────────────────────────────────────────
// SECTION 6 — OUTCOME METRICS (dark, circular)
// ─────────────────────────────────────────────────────────────────

function OutcomeMetrics() {
  const ref = useRef<HTMLElement>(null)
  useSectionEntrance(ref)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(".outcome-item")
      const center = el.querySelector<HTMLElement>(".outcome-center")
      gsap.fromTo(items,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: "back.out(1.8)",
          scrollTrigger: { trigger: el, start: "top 78%" } })
      if (center) {
        gsap.fromTo(
          center,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(2)",
            delay: 0.3,
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        )
      }
    }, el)
    return () => ctx.revert()
  }, [])

  // arrange 8 items in a circle
  const radius = 220
  const cx = 300; const cy = 300

  return (
    <section ref={ref} className="bg-[#072348] py-20 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="label-chip type-label font-semibold section-label-dark">Business Success</span>
          <h2 className="mt-4 type-heading font-bold text-white">
            Measurable Business Impact
          </h2>
          <p className="section-sub mt-4 text-base leading-relaxed text-white/60">
            Quantified outcomes our clients consistently achieve after digital transformation.
          </p>
        </div>

        {/* desktop radial layout */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative" style={{ width: 600, height: 600 }}>
            {/* center */}
            <div className="outcome-center absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center size-[160px] rounded-full bg-[#072448] text-center shadow-[0_0_60px_rgba(59,103,255,0.5)]">
                <p className="text-[13px] font-extrabold text-white leading-tight">Outcome<br/>Metrics</p>
              </div>
            </div>
            {/* orbit ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-[480px] rounded-full border border-white/8" />
            </div>
            {/* items */}
            {outcomesData.map((label, i) => {
              const angle = (i / outcomesData.length) * 2 * Math.PI - Math.PI / 2
              const x = cx + radius * Math.cos(angle) - 300
              const y = cy + radius * Math.sin(angle) - 300
              return (
                <div key={label}
                  className="outcome-item absolute flex items-center justify-center text-center cursor-default"
                  style={{ left: "50%", top: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, width: 130, opacity: 0 }}>
                  <div className="rounded-xl border border-white/12 bg-white/6 px-3 py-2.5 backdrop-blur-sm text-[12px] font-semibold text-white/85 leading-snug hover:border-[#072448]/50 hover:bg-[#072448]/12 transition-all duration-300">
                    {label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* mobile grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {outcomesData.map((label) => (
            <div key={label}
              className="outcome-item rounded-xl border border-white/12 bg-white/6 px-4 py-4 text-[13px] font-semibold text-white/85 text-center leading-snug">
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 7 — TECH STACK (dark + filter tabs)
// ─────────────────────────────────────────────────────────────────

function TechStackSection() {
  const [activeFilter, setActiveFilter] = useState(techStackData.filters[0])
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useSectionEntrance(ref)

  const filtered = techStackData.stacks.filter(
    (s) => s.category === activeFilter
  )

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".tech-card")
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    )
  }, [activeFilter])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>(".tech-card")

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-[#072448] py-20 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="label-chip type-label font-semibold section-label-dark">
            {techStackData.sectionLabel}
          </span>

          <h2 className="mt-4 type-heading font-bold text-white">
            {techStackData.title}
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {techStackData.filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200 ${
                f === activeFilter
                  ? "bg-[#1e3a6e] text-white shadow-[0_4px_16px_rgba(59,103,255,0.4)]"
                  : "border border-white/15 text-white hover:border-white/35 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {filtered.map((s) => (
            <div
              key={s.name}
              className="tech-card flex cursor-default flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2 shadow-md">
                <Image
                  src={s.icon}
                  alt={s.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                  unoptimized
                />
              </div>

              <span className="text-[12px] font-semibold text-white/80">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 8 — WHY CHOOSE (light)
// ─────────────────────────────────────────────────────────────────

function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none" },
      })

      const label = headingRef.current?.querySelector(".label-chip")
      if (label) tl.fromTo(label, { opacity: 0, y: 14, scale: 0.82 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0)

      const h2 = headingRef.current?.querySelector<HTMLElement>("h2")
      if (h2) {
        const wordEls = prepareHeadingWordAnimation(h2)
        if (wordEls.length)
          tl.fromTo(wordEls, { y: "115%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.75, stagger: 0.05, ease: "expo.out" }, 0.1)
      }

      const sub = headingRef.current?.querySelector("p")
      if (sub) tl.fromTo(sub, { opacity: 0, y: 20, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.38)

      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".sol-card")
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.93 })
        tl.to(cards, {
          opacity: 1, y: 0, scale: 1, duration: 0.85,
          stagger: { each: 0.08, grid: [2, 4], from: "start" },
          ease: "power3.out",
        }, 0.45)

        cards.forEach((card, i) => {
          const iconWrap = card.querySelector<HTMLElement>(".icon-wrap")
          if (iconWrap) tl.fromTo(iconWrap, { scale: 0, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: "back.out(1.7)" }, 0.45 + i * 0.08 + 0.22)

          card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -6, backgroundColor: "#3b5b82", duration: 0.32, ease: "power2.out" })
            if (iconWrap) gsap.to(iconWrap, { scale: 1.12, duration: 0.3, ease: "back.out(2)" })
          })
          card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, backgroundColor: "transparent", duration: 0.42, ease: "power2.out" })
            if (iconWrap) gsap.to(iconWrap, { scale: 1, duration: 0.35, ease: "power2.out" })
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-[#072348] py-20 lg:py-28">
      <div ref={sectionRef} className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div ref={headingRef} className="mb-12 max-w-6xl">
          <span className="label-chip type-label font-semibold section-label-dark">
            {whyData.sectionLabel}
          </span>
          <h2 className="mt-4 type-heading font-bold text-white">
            {whyData.title}
          </h2>
          {/* <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            {solutionsData.subtitle}
          </p> */}
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {whyData.cards.map((card, index) => {
            const Icon = card.icon
            const cols = 4
            const isFirstInRow = index % cols === 0
            const isFirstRow = index < cols
            const borderCls = [
              "border-white/10",
              index > 0 ? "border" : "",
              !isFirstInRow ? "sm:border-l" : "sm:border-l-0",
              isFirstRow ? "sm:border-t-0" : "sm:border-t",
            ].join(" ")
            return (
              <div key={card.title}
                className={`sol-card flex flex-col gap-3 p-7 cursor-default ${borderCls}`}
                style={{ backgroundColor: "transparent", transition: "none" }}>
                <div className="icon-wrap flex size-10 items-center justify-center rounded-xl bg-[#1e3a6e] text-white"
                  style={{ transition: "none" }}>
                  <Icon className="size-5" />
                </div>
                <h3 className="type-body font-bold text-white leading-snug">{card.title}</h3>
                <p className="type-body text-white/60">{card.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 9 — FAQ (animated accordion)
// ─────────────────────────────────────────────────────────────────

function IndustriesFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const ref = useRef<HTMLElement>(null)
  const answersRef = useRef<Map<number, HTMLDivElement>>(new Map())

  useSectionEntrance(ref)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll<HTMLElement>(".faq-row")
      gsap.fromTo(rows,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" } })
    }, el)
    return () => ctx.revert()
  }, [])

  const toggle = (idx: number) => {
    const isOpen = openIdx === idx
    const el = answersRef.current.get(idx)

    if (el) {
      if (isOpen) {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in",
          onComplete: () => setOpenIdx(null) })
      } else {
        setOpenIdx(idx)
        requestAnimationFrame(() => {
          const target = answersRef.current.get(idx)
          if (target) {
            gsap.fromTo(target,
              { height: 0, opacity: 0 },
              { height: "auto", opacity: 1, duration: 0.38, ease: "power3.out" })
          }
        })
      }
    } else {
      setOpenIdx(isOpen ? null : idx)
    }
  }

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="label-chip type-label font-semibold section-label-light">
            FAQ
          </span>
          <h2 className="mt-4 type-heading font-bold text-[#0a1628]">
            Frequently Asked Questions
          </h2>
          <p className="section-sub mt-4 text-base leading-relaxed text-[#4b5a72]" style={{ opacity: 0 }}>
            Common questions about our industry solutions and engagement models.
          </p>
        </div>

        <div className="divide-y divide-[#e5e9f0]">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={item.question} className="faq-row" style={{ opacity: 0 }}>
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className={`type-body font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-[#072448]" : "text-[#0a1628]"}`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-[#4b5a72] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#072448]" : ""}`}
                  />
                </button>
                <div
                  ref={(el) => { if (el) answersRef.current.set(idx, el) }}
                  style={{ height: isOpen ? "auto" : 0, overflow: "hidden", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 type-body text-[#4b5a72]">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION 10 — CTA BANNER
// ─────────────────────────────────────────────────────────────────

function IndustriesCTA() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%" } })
      const children = el.querySelectorAll<HTMLElement>(".cta-el")
      tl.fromTo(children,
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "power3.out" })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <PageCTASection ref={ref}>
      <h2 className="cta-el type-heading mx-auto max-w-5xl text-white" style={{ opacity: 0 }}>
        Ready to Transform Your Industry Operations?
      </h2>
      <p className="cta-el type-body mx-auto mt-5 max-w-4xl text-[#b8c9e0]" style={{ opacity: 0 }}>
        Partner with Beno Support to modernize operations, deploy scalable digital platforms, and accelerate
        AI-powered transformation tailored to your industry&apos;s unique challenges.
      </p>
      <div className="cta-el mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ opacity: 0 }}>
        <PageCTAPrimaryButton href={TALK_TO_EXPERT_HREF} target="_blank" rel="noopener noreferrer">
          Talk to Expert
        </PageCTAPrimaryButton>
      </div>
    </PageCTASection>
  )
}

// ─────────────────────────────────────────────────────────────────
// PAGE ASSEMBLY
// ─────────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-background">
          <SiteHeader />
          <main>
      <IndustriesHero />
      <ChallengesSection />
      <SolutionsSection />
      <IndustriesGrid />
      {/* <UseCasesSection /> */}
      <BusinessOutcomes />
      <TechStackSection />
      <WhyChooseSection />
      <IndustriesFAQ />
      <IndustriesCTA />
          </main>
          <SiteFooter />
        </div>
    
  )
}
