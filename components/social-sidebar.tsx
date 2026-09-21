"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SOCIAL_LINKS } from "@/lib/social-links"
import { useSiteSettings } from "@/components/site-settings-provider"

if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger)
  } catch (e) {}
}

// const XIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
//   </svg>
// )
// Twitter — hidden until ready
const FBIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IGIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const LIIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const YTIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.566a2.997 2.997 0 0 0-2.11 2.12A31.09 31.09 0 0 0 0 12a31.09 31.09 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.11 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.566a2.997 2.997 0 0 0 2.11-2.12A31.09 31.09 0 0 0 24 12a31.09 31.09 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export default function SocialSidebar() {
  const ref = useRef<HTMLDivElement | null>(null)
  const siteSettings = useSiteSettings()

  // Each platform's link comes from Sanity when set, otherwise falls back
  // to the original hardcoded URL in lib/social-links.ts — the icon,
  // hover color, and order stay exactly as designed, only the destination
  // URL is editable.
  const socials = [
    // { ...SOCIAL_LINKS[0], icon: <XIcon />, hoverBg: "#000000", hoverBorder: "#000000" },
    {
      ...SOCIAL_LINKS[0],
      href: siteSettings?.facebookUrl || SOCIAL_LINKS[0].href,
      icon: <FBIcon />,
      hoverBg: "#1877F2",
      hoverBorder: "#1877F2",
    },
    {
      ...SOCIAL_LINKS[1],
      href: siteSettings?.instagramUrl || SOCIAL_LINKS[1].href,
      icon: <IGIcon />,
      hoverBg: "#E1306C",
      hoverBorder: "#E1306C",
    },
    {
      ...SOCIAL_LINKS[2],
      href: siteSettings?.linkedinUrl || SOCIAL_LINKS[2].href,
      icon: <LIIcon />,
      hoverBg: "#0A66C2",
      hoverBorder: "#0A66C2",
    },
    {
      ...SOCIAL_LINKS[3],
      href: siteSettings?.youtubeUrl || SOCIAL_LINKS[3].href,
      icon: <YTIcon />,
      hoverBg: "#FF0000",
      hoverBorder: "#FF0000",
    },
  ]

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.children,
        { opacity: 0, scale: 0, rotate: -90 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)", stagger: 0.08 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2.5"
    >
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              backgroundColor: s.hoverBg,
              borderColor: s.hoverBorder,
              color: "#ffffff",
              scale: 1.15,
              duration: 0.22,
              ease: "power2.out",
            })
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              backgroundColor: "#0d2550",
              borderColor: "rgba(255,255,255,0.1)",
              color: "#7fa8e8",
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
            })
          }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#0d2550",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7fa8e8",
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}