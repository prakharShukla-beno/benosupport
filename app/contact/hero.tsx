"use client"

import React from "react"
import { TALK_TO_EXPERT_HREF } from "@/lib/proposal-cta"
import Link from "next/link"
import { SOCIAL_LINKS } from "@/lib/social-links"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { withHome } from "@/lib/breadcrumbs"

interface HeroProps {
  heroRef: React.RefObject<HTMLElement | null>
  h1Ref: React.RefObject<HTMLHeadingElement | null>
  subtitleRef: React.RefObject<HTMLParagraphElement | null>
  heroBtnsRef: React.RefObject<HTMLDivElement | null>
  imageRef: React.RefObject<HTMLDivElement | null>
  socialRef: React.RefObject<HTMLDivElement | null>
}

export default function Hero({
  heroRef,
  h1Ref,
  subtitleRef,
  heroBtnsRef,
  imageRef,
  socialRef,
}: HeroProps) {
  // const { openProposalModal } = useProposalModal()

  // const XIcon = () => (
  //   <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
  //     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  //   </svg>
  // )
  // Twitter — hidden until ready

  const FBIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )

  const IGIcon = () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )

  const LIIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )

  const YTIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )

  const socialIcons = [
    // <XIcon key="x" />,
    <FBIcon key="fb" />,
    <IGIcon key="ig" />,
    <LIIcon key="li" />,
    <YTIcon key="yt" />,
  ]

  return (
    <section
      ref={heroRef}
      className="relative flex h-dvh min-h-[640px] overflow-hidden bg-[#072448]"
    >
      {/* Left Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-8 pb-8 pt-[72px] lg:w-[55%] lg:px-20 xl:pl-24">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,103,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(59,103,255,0.6) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-[600px]">
          <PageBreadcrumb
            items={withHome([{ label: "Contact" }])}
            variant="dark"
          />
          <h1
            ref={h1Ref}
            className="mb-6 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            Let&apos;s Build What&apos;s <br /> Next Together
          </h1>

          <p
            ref={subtitleRef}
            className="type-body mb-10 max-w-[540px] text-white/85 lg:mb-12"
          >
            Whether you&apos;re looking to modernize operations, accelerate digital
            transformation, strengthen cybersecurity, scale your workforce, or
            explore AI-driven innovation, our experts are ready to help.
          </p>

          <div ref={heroBtnsRef} className="flex flex-wrap gap-4">
            <Link
              href={TALK_TO_EXPERT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0A3A73] px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#124e96]"
            >
              Talk to Expert
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 hidden h-full w-[48%] lg:block"
        style={{
          clipPath: "polygon(8% 0%,100% 0%,100% 100%,0% 100%)",
        }}
      >
        <div
          className="absolute inset-0 z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(59,103,255,0.8) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <img
          src="/assets/contact/Contact_us.png"
          alt="Contact Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      {/* Social Sidebar */}
      <div
        ref={socialRef}
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
      >
        {SOCIAL_LINKS.map((social, i) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0d2550] text-[#7fa8e8] transition-all hover:border-[#3b67ff] hover:bg-[#3b67ff] hover:text-white"
          >
            {socialIcons[i]}
          </a>
        ))}
      </div>
    </section>
  )
}