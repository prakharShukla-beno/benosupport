/**
 * One-time migration: pushes Footer + Contact info into Sanity, so you
 * don't have to manually copy-paste every field in Studio.
 *
 * ── One-time setup (skip if already done for the other migrate scripts) ──
 * 1. Get a WRITE token: https://www.sanity.io/manage → your project → API
 *    → Tokens → "Add API token" → Permissions: "Editor" → copy it.
 * 2. Add it to .env.local:  SANITY_API_WRITE_TOKEN=paste_your_token_here
 * 3. Install tsx (if not already installed):  npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-site-settings.ts
 */

import { config as loadEnv } from "dotenv"
loadEnv({ path: ".env.local" })

import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.")
  process.exit(1)
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. See setup instructions at the top of this file.")
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

function key(): string {
  return Math.random().toString(36).slice(2, 10)
}

const DOC_ID = "siteSettings-singleton"

const doc = {
  _id: DOC_ID,
  _type: "siteSettings",

  headerHomeLabel: "Home",
  headerServicesLabel: "Services",
  headerNavLinks: [
    { _type: "headerNavLink", _key: key(), label: "Industries", href: "/industries" },
    { _type: "headerNavLink", _key: key(), label: "Company", href: "/company" },
  ],
  headerResourcesLabel: "Resources",
  headerCtaLabel: "Talk To Our Experts",

  footerTagline: "Engineering Excellence in AI & Technology. Transforming businesses since 2008.",
  copyrightText: "© 2026 Beno Support. All Rights Reserved.",

  contactPhone1: "+91 892-988-4560",
  contactPhone2: "+91 120 423 4429",
  contactEmail: "info@benosupport.com",
  whatsappNumber: "918929884560",

  officeLocations: [
    { _type: "officeLocation", _key: key(), label: "CORPORATE OFFICE", address: "B-23/C1, Block B, Sector 62, Noida, Uttar Pradesh 201309" },
    { _type: "officeLocation", _key: key(), label: "REGISTERED OFFICE", address: "DISTRICT CENTRE, Roots Tower, 706, PLOT NO. 7, Laxmi Nagar, New Delhi, Delhi 11009" },
    { _type: "officeLocation", _key: key(), label: "U.S OFFICE", address: "1325 Main Street, Suite 1404, Katy, TX 77494" },
    { _type: "officeLocation", _key: key(), label: "ADDITIONAL DELIVERY LOCATIONS", address: "Lucknow | Bihar | Mumbai | Ahmedabad | Bengaluru" },
  ],
}

async function migrate() {
  console.log("Pushing Site Settings content to Sanity...\n")
  try {
    await client.createOrReplace(doc)
    console.log(`  ✓ Site Settings document saved (id: ${DOC_ID})`)
  } catch (err) {
    console.error("  ✗ Failed:", err)
    process.exit(1)
  }
  console.log("\nDone. Refresh Sanity Studio to see it under \"Site Settings\".")
}

migrate()