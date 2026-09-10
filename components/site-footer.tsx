"use client"

import Link from "next/link"
import { Globe, Mail, Phone, MapPin } from "lucide-react"
import { useSiteSettings } from "@/components/site-settings-provider"

const footerContactIcons = [Globe, Mail, Phone, MapPin] as const

// ── Used only as a FALLBACK if Sanity has no Site Settings content yet ──
const DEFAULT_TAGLINE =
  "Engineering Excellence in AI & Technology. Transforming businesses since 2008."
const DEFAULT_COPYRIGHT = "© 2026 Beno Support. All Rights Reserved."
const DEFAULT_PHONE = "+918929884560"
const DEFAULT_EMAIL = "info@benosupport.com"

type FooterLink =
  | { label: string; href: string }
  | { label: string; disabled: true }

const companyLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Company", href: "/company" },
  { label: "Careers", disabled: true },
  { label: "Sitemap", href: "/sitemap" },
]

const serviceLinks: FooterLink[] = [
  {
    label: "Core Engineering",
    href: "/services/core-engineering-application-architecture",
  },
  {
    label: "Agentic AI",
    href: "/services/agentic-ai-intelligent-automation",
  },
  {
    label: "Enterprise Strategy",
    href: "/services/enterprise-startup-tech-strategy",
  },
  {
    label: "Cloud & Platforms",
    href: "/services/cloud-platform-engineering",
  },
  {
    label: "CyberResilience",
    href: "/services/cyber-resilience-threat-intelligence",
  },
  {
    label: "Digital Products",
    href: "/services/digital-products-experience-engineering",
  },
]

const industryLinks: FooterLink[] = [
  "Fintech",
  "Healthcare",
  "Information Technology",
  "EdTech",
  "E-commerce",
  "Telecom",
  "Hospitality",
].map((label) => ({ label, href: "/industries" }))

const columns = [
  { title: "Company", links: companyLinks },
  { title: "Services", links: serviceLinks },
  { title: "Industries", links: industryLinks },
]

function FooterLinkItem({ link }: { link: FooterLink }) {
  if ("disabled" in link && link.disabled) {
    return (
      <span className="cursor-default text-sm text-primary-foreground/50">
        {link.label}
      </span>
    )
  }

  if (!("href" in link)) {
    return null
  }

  return (
    <Link
      href={link.href}
      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
    >
      {link.label}
    </Link>
  )
}

export function SiteFooter() {
  const settings = useSiteSettings()

  const tagline = settings?.footerTagline || DEFAULT_TAGLINE
  const copyright = settings?.copyrightText || DEFAULT_COPYRIGHT
  const phone = settings?.contactPhone1 || DEFAULT_PHONE
  const email = settings?.contactEmail || DEFAULT_EMAIL

  const contactIconLinks = [
    { href: "https://www.benosupport.com", label: "Website", external: true },
    { href: `mailto:${email}`, label: "Email us" },
    { href: `tel:${phone.replace(/\s/g, "")}`, label: "Call us" },
    { href: "/contact", label: "Office locations", internal: true },
  ]

  return (
    <footer className="bg-[#072448] text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src="/assets/whitelogo.svg" alt="Beno Support" />
            </div>
            <p className="type-body text-primary-foreground/70">
              {tagline}
            </p>
            <div className="flex gap-3">
              {contactIconLinks.map((item, i) => {
                const Icon = footerContactIcons[i]
                const className =
                  "flex size-9 items-center justify-center rounded-md bg-primary-foreground/10 transition-colors hover:bg-button"

                if (item.internal) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className={className}
                    >
                      <Icon className="size-4" />
                    </Link>
                  )
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={item.label}
                    className={className}
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>{copyright}</p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-primary-foreground"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
