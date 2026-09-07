/**
 * One-time migration: pushes all Industries Page text content into Sanity,
 * so you don't have to manually copy-paste every field in Studio.
 *
 * What it does:
 *   - Creates (or updates, if run again) ONE "industriesPage" document with
 *     Hero, Challenges, Solutions, Business Outcomes, Why Choose Us, FAQ,
 *     and Bottom CTA text.
 *   - Does NOT touch "Industries We Serve" or "Technology We Use" — those
 *     are intentionally not part of the Sanity schema at all.
 *   - Does NOT touch images — the Business Outcomes image keeps using the
 *     original site image automatically. You can add one in Studio later
 *     any time you want to replace it.
 *   - Safe to run more than once: it always updates the SAME document
 *     (fixed id), so re-running never creates a duplicate.
 *
 * ── One-time setup (skip if you already did this for migrate-services) ──
 * 1. Get a WRITE token: https://www.sanity.io/manage → your project → API
 *    → Tokens → "Add API token" → Permissions: "Editor" → copy it.
 * 2. Add it to .env.local:  SANITY_API_WRITE_TOKEN=paste_your_token_here
 * 3. Install tsx (if not already installed):  npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-industries.ts
 */

import { config as loadEnv } from "dotenv"
loadEnv({ path: ".env.local" })

import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.\n" +
      "Make sure you're running this from the project root, with .env.local present."
  )
  process.exit(1)
}

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "See the setup instructions at the top of this file."
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

function key(): string {
  return Math.random().toString(36).slice(2, 10)
}

function card(objType: string, iconName: string, title: string, description: string) {
  return { _type: objType, _key: key(), iconName, title, description }
}

const DOC_ID = "industriesPage-singleton"

const doc = {
  _id: DOC_ID,
  _type: "industriesPage",

  // ── Hero ──────────────────────────────────────────────
  heroTitle: "AI-Powered Digital Transformation Solutions Across Industries",
  heroSubtitle:
    "Helping industries modernize operations, automate workflows, improve customer experiences, and scale securely with AI, Cloud, Data, and Software Solutions.",
  heroStats: [
    "15+ Years of Technology Expertise",
    "Global Delivery Model",
    "AI-Driven Engineering Solutions",
    "Secure & Scalable Architecture",
  ],
  heroCta1: "Request A Proposal",
  heroCta2: "Talk To Our Experts",

  // ── Challenges ────────────────────────────────────────
  challengesSectionLabel: "Industry Challenges",
  challengesTitle: "Business & Technology Challenges Across Industries",
  challengesSubtitle:
    "Every industry faces unique operational, compliance, security, and scalability challenges. As technology evolves, organizations must balance innovation with efficiency while meeting growing customer expectations.",
  challengesCards: [
    card("challengeCard", "Code2", "Legacy Systems & Technical Debt", "Outdated architectures slow agility, inflate maintenance costs, and block cloud adoption."),
    card("challengeCard", "TrendingDown", "Rising Operational Costs", "Manual workflows and siloed tooling eat margins; automation is the fastest lever to pull."),
    card("challengeCard", "ShieldAlert", "Cybersecurity & Compliance Risks", "Evolving threat landscapes and tightening regulations require always-on, adaptive security."),
    card("challengeCard", "Layers", "Scalability Challenges", "Monolithic systems buckle under growth; modern distributed architecture removes that ceiling."),
    card("challengeCard", "BarChart2", "Data Silos & Limited Visibility", "Fragmented data stacks make real-time decisions impossible — unified pipelines fix that."),
    card("challengeCard", "Users2", "Customer Experience Expectations", "Hyper-personalised, always-on digital experiences are now table stakes, not differentiators."),
  ],

  // ── Solutions ─────────────────────────────────────────
  solutionsSectionLabel: "How beno Support Helps",
  solutionsTitle: "Solving Industry Challenges with Intelligent Technology",
  solutionsSubtitle:
    "Beno Support combines domain expertise, AI innovation, cloud-native engineering, cybersecurity capabilities, and product-focused delivery to solve complex business challenges across industries.",
  solutionsCards: [
    card("solutionCard", "Code2", "Application Modernisation", "Migrate monoliths to microservices, rebuild legacy stacks, and modernise entire application portfolios."),
    card("solutionCard", "Bot", "AI Process Automation", "Automate repetitive tasks across finance, HR, ops, and support to dramatically reduce manual costs."),
    card("solutionCard", "ShieldCheck", "Cybersecurity Services", "Protect critical systems, data, and digital assets with pen-testing, SOC, and compliance tooling."),
    card("solutionCard", "Cloud", "Cloud Transformation", "Build cloud-native infrastructure on AWS, Azure, or GCP — multi-region, IaC-managed, FinOps-tuned."),
    card("solutionCard", "Database", "Data Engineering & Analytics", "Design real-time data pipelines, warehouses, and BI layers that surface actionable intelligence."),
    card("solutionCard", "Monitor", "Managed IT Services", "24/7 monitoring, incident response, patching, and SLA-backed infrastructure management."),
    card("solutionCard", "Boxes", "Digital Experience Platforms", "Omni-channel commerce, CMS, and portal solutions with best-in-class UX engineering."),
    card("solutionCard", "Cpu", "Agile Product Engineering", "End-to-end product squads — discovery, design, engineering, QA, and launch — in rapid sprints."),
  ],

  // ── Business Outcomes (image intentionally omitted) ───
  outcomesSectionLabel: "Business outcomes",
  outcomesTitle: "Measurable Business Impact",
  outcomesParagraph:
    "Our solutions are designed to deliver measurable results that directly support business growth and operational excellence.",
  outcomesSubheading: "Outcome Metrics",
  outcomesList: [
    "Reduce Manual Effort by Up to 60%",
    "Accelerate Process Efficiency",
    "Improve Customer Experience",
    "Increase Operational Visibility",
    "Enhance Security Posture",
    "Reduce Infrastructure Costs",
    "Improve Business Agility",
    "Accelerate Time-to-Market",
  ],

  // ── Why Choose Us ─────────────────────────────────────
  whyChooseSectionLabel: "Why Choose Us",
  whyChooseTitle: "Why Leading Organizations Choose Beno Support ",
  whyChooseCards: [
    card("whyChooseCard", "Star", "15+ Years of Engineering Excellence", "Proven track record delivering enterprise solutions since 2008 across 20+ countries."),
    card("whyChooseCard", "TrendingDown", "250+ Projects Delivered", "A portfolio spanning fintech, healthcare, government, and e-commerce at scale."),
    card("whyChooseCard", "ShieldCheck", "Certified & Compliance-Driven", "CMMI Dev L5, ISO 27001, ISO 9001 — audit-ready, always."),
    card("whyChooseCard", "Users2", "Flexible Engagement Models", "T&M, fixed-cost, dedicated squads, or fully outsourced — structured to your workflow."),
    card("whyChooseCard", "Bot", "AI-Native Engineering", "AI embedded into delivery pipelines for faster, more accurate, smarter outcomes."),
    card("whyChooseCard", "Globe", "End-to-End Technology ", "Strategy → build → operate: one partner across the full technology lifecycle."),
    card("whyChooseCard", "Users2", "Global Delivery Capability", "Scalable delivery teams supporting organizations across multiple regions and time zones."),
    card("whyChooseCard", "Bot", "End-to-End Technology", "Supporting businesses from strategy and implementation to ongoing optimization and support."),
  ],

  // ── FAQ ───────────────────────────────────────────────
  faqSectionLabel: "FAQ",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Common questions about our industry solutions and engagement models.",
  faq: [
    { _type: "faqItem", _key: key(), question: "Which industries does Beno Support serve?", answer: "We work across fintech, healthcare, government, e-commerce, logistics, education, hospitality, manufacturing, energy, and more. Our cross-domain expertise lets us apply proven patterns from one vertical to accelerate delivery in another." },
    { _type: "faqItem", _key: key(), question: "Can you provide industry-specific digital transformation solutions?", answer: "Absolutely. Every engagement starts with a domain discovery sprint — mapping your regulatory context, existing architecture, and business KPIs — before a single line of code is written." },
    { _type: "faqItem", _key: key(), question: "How can we help with AI consulting?", answer: "From use-case identification and data readiness assessment to model selection, MLOps pipeline setup, and production deployment, we handle the full AI consulting and engineering lifecycle." },
    { _type: "faqItem", _key: key(), question: "Do you provide cloud transformation services?", answer: "Yes. We design and migrate workloads to AWS, Azure, and GCP using infrastructure-as-code, GitOps, and FinOps practices to optimise both resilience and cost." },
    { _type: "faqItem", _key: key(), question: "Can Beno Support integrate with existing enterprise systems?", answer: "Integration is a core competency. We connect modern stacks to SAP, Salesforce, Oracle, legacy ERPs, and bespoke internal platforms via REST, GraphQL, event streaming, or EDI." },
    { _type: "faqItem", _key: key(), question: "Do you provide an SLA for IT delivery capability?", answer: "Yes. All managed-service and dedicated-squad engagements include formally agreed SLAs covering uptime, response times, defect resolution, and reporting cadence." },
    { _type: "faqItem", _key: key(), question: "Can you modernise legacy enterprise systems?", answer: "Yes. Our modernisation practice covers everything from strangler-fig API wrappers and incremental re-architecture to full rewrites — always mapped to business risk tolerance." },
  ],

  // ── Bottom CTA ────────────────────────────────────────
  ctaTitle: "Ready to Transform Your Industry Operations?",
  ctaParagraph:
    "Partner with Beno Support to modernize operations, deploy scalable digital platforms, and accelerate AI-powered transformation tailored to your industry's unique challenges.",
  ctaPrimaryLabel: "Request a Proposal",
  ctaSecondaryLabel: "Talk To Our Experts",
}

async function migrate() {
  console.log("Pushing Industries Page content to Sanity...\n")
  try {
    await client.createOrReplace(doc)
    console.log(`  ✓ Industries Page document saved (id: ${DOC_ID})`)
  } catch (err) {
    console.error("  ✗ Failed:", err)
    process.exit(1)
  }
  console.log("\nDone. Refresh Sanity Studio to see it under \"Industries Page\".")
}

migrate()