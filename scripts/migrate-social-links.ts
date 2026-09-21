/**
 * One-time migration: adds the Facebook/Instagram/LinkedIn/YouTube links
 * to the existing Site Settings document in Sanity.
 *
 * IMPORTANT — this is safer than the other migrate-*.ts scripts: it uses
 * `setIfMissing`, which only fills in these 4 fields if they don't already
 * have a value. It will NEVER overwrite Header/Footer/Contact fields you
 * may have already edited in Studio, and it will NEVER overwrite a social
 * link you've already set. Nothing you've done in Studio gets lost.
 *
 * ── One-time setup (skip if already done for the other migrate scripts) ──
 * 1. Get a WRITE token: https://www.sanity.io/manage → your project → API
 *    → Tokens → "Add API token" → Permissions: "Editor" → copy it.
 * 2. Add it to .env.local:  SANITY_API_WRITE_TOKEN=paste_your_token_here
 * 3. Install tsx (if not already installed):  npm install -D tsx
 *
 * ── Run it ───────────────────────────────────────────────────────────────
 *      npx tsx scripts/migrate-social-links.ts
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

const DOC_ID = "siteSettings-singleton"

const DEFAULT_SOCIAL_LINKS = {
  facebookUrl: "https://www.facebook.com/benosupport",
  instagramUrl: "https://www.instagram.com/beno.support/",
  linkedinUrl: "https://in.linkedin.com/company/bensupport-technologies",
  youtubeUrl: "https://www.youtube.com/@BenoSupport",
}

async function migrate() {
  console.log("Adding Social Media links to Site Settings...\n")

  const existing = await client.fetch(`*[_id == $id][0]{ _id }`, { id: DOC_ID })

  if (!existing) {
    console.error(
      `  ✗ Site Settings document (id: ${DOC_ID}) not found.\n` +
        "    Run `npm run migrate-site-settings` first, then run this script again."
    )
    process.exit(1)
  }

  try {
    await client.patch(DOC_ID).setIfMissing(DEFAULT_SOCIAL_LINKS).commit()
    console.log(`  ✓ Social Media links added (id: ${DOC_ID})`)
    console.log("    (Any field that already had a value was left untouched.)")
  } catch (err) {
    console.error("  ✗ Failed:", err)
    process.exit(1)
  }

  console.log('\nDone. Refresh Sanity Studio to see the "Social Media" tab under Site Settings.')
}

migrate()