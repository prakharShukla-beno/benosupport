/**
 * One-time migration: pushes all Company Page text content into Sanity,
 * so you don't have to manually copy-paste every field in Studio.
 *
 * What it does:
 *   - Creates (or updates, if run again) ONE "companyPage" document with
 *     Hero, Who We Are, Vision & Mission, Certifications, Life at Beno,
 *     and Bottom CTA text.
 *   - Does NOT touch "Our Story", "Our Journey", "Leadership Team", or
 *     "Global Presence" — those are intentionally not part of the Sanity
 *     schema at all.
 *   - Does NOT touch images — they keep using the original site images
 *     automatically. You can add new ones in Studio later any time.
 *   - Safe to run more than once: it always updates the SAME document
 *     (fixed id), so re-running never creates a duplicate.
 *
 * ── One-time setup (skip if already done for the other migrate scripts) ──
 * 1. Get a WRITE token: https://www.sanity.io/manage → your project → API
 *    → Tokens → "Add API token" → Permissions: "Editor" → copy it.
 * 2. Add it to .env.local:  SANITY_API_WRITE_TOKEN=paste_your_token_here
 * 3. Install tsx (if not already installed):  npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-company.ts
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

const DOC_ID = "companyPage-singleton"

const doc = {
  _id: DOC_ID,
  _type: "companyPage",

  // ── Hero ──────────────────────────────────────────────
  heroTitle: "Building Future-Ready Digital Enterprises Since 2008",
  heroParagraph:
    "Beno Support is a global technology consulting and engineering company helping startups, SMBs, and enterprises modernize operations through AI, cloud, cybersecurity, and software engineering solutions.",
  heroCta1Label: "Talk To Our Experts",
  heroCta2Label: "Explore Our Services",
  heroStats: [
    { _type: "heroStat", _key: key(), displayValue: "100", suffix: "+", isCounter: true, label: "Global Clients" },
    { _type: "heroStat", _key: key(), displayValue: "15", suffix: "+", isCounter: true, label: "Years Industry Experience" },
    { _type: "heroStat", _key: key(), displayValue: "24", suffix: "/7", isCounter: true, label: "Global Delivery" },
    { _type: "heroStat", _key: key(), displayValue: "AI/Cloud", isCounter: false, label: "Enterprise Engineering Expertise" },
  ],

  // ── Who We Are (image intentionally omitted) ───────────
  whoWeAreSectionLabel: "About Us",
  whoWeAreTitle: "Who We Are",
  whoWeAreParagraphs: [
    "Beno Support is an engineering-led technology company focused on helping businesses build scalable digital ecosystems, modernize infrastructure, and accelerate innovation through AI-first transformation strategies.",
    "From enterprise software development and cloud modernization to cybersecurity and intelligent automation, we partner with organizations to solve complex technology challenges with scalable engineering solutions.",
    "Our teams combine consulting expertise, agile delivery models, cloud-native engineering, and product-focused execution to deliver measurable business outcomes.",
  ],

  // ── Vision & Mission ────────────────────────────────────
  visionMissionSectionLabel: "VISION & MISSION",
  visionMissionItems: [
    {
      _type: "visionMissionItem",
      _key: key(),
      title: "Our Vision",
      text: "To become a globally trusted engineering and technology transformation partner helping organizations innovate, scale, and thrive in the digital economy.",
    },
    {
      _type: "visionMissionItem",
      _key: key(),
      title: "Our Mission",
      text: "To empower businesses through scalable software engineering, AI innovation, cloud transformation, cybersecurity resilience, and customer-focused digital solutions.",
    },
  ],

  // ── Certifications ──────────────────────────────────────
  certificationsSectionLabel: "Certifications & Standards",
  certificationsTitle: "Enterprise Certifications & Standards",
  certificationsCards: [
    { _type: "certificationCard", _key: key(), label: "CMMI Dev Level 3", iconKey: "shield" },
    { _type: "certificationCard", _key: key(), label: "ISO 27001 Processes", iconKey: "check" },
    { _type: "certificationCard", _key: key(), label: "Enterprise Security Standards", iconKey: "lock" },
    { _type: "certificationCard", _key: key(), label: "Agile Delivery Frameworks", iconKey: "refresh" },
  ],

  // ── Life at Beno (images intentionally omitted) ────────
  lifeSectionLabel: "Culture & People",
  lifeTitle: "Life at Beno",
  lifeParagraph:
    "At Beno Support, we encourage innovation, continuous learning, collaboration, and technology-driven problem solving. Our teams work on modern digital transformation projects that create real business impact across industries.",
  lifePoints: [
    "Flexible remote-first work culture",
    "Continuous learning & upskilling programs",
    "Diverse, inclusive engineering teams",
    "Impactful projects across global industries",
  ],

  // ── Bottom CTA ──────────────────────────────────────────
  ctaTitle: "Ready to Build Scalable Digital Products?",
  ctaParagraph:
    "Partner with Beno Support to modernize applications, develop scalable software platforms, and accelerate digital innovation with engineering-led solutions.",
  ctaPrimaryLabel: "Request a Proposal",
  ctaSecondaryLabel: "Talk To Our Experts",
}

async function migrate() {
  console.log("Pushing Company Page content to Sanity...\n")
  try {
    await client.createOrReplace(doc)
    console.log(`  ✓ Company Page document saved (id: ${DOC_ID})`)
  } catch (err) {
    console.error("  ✗ Failed:", err)
    process.exit(1)
  }
  console.log("\nDone. Refresh Sanity Studio to see it under \"Company Page\".")
}

migrate()