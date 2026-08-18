"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import type { ServiceData } from "@/lib/services-data"
import { getCtaButtonProps } from "@/lib/proposal-cta"
import { useProposalModal } from "@/hooks/use-proposal-modal"
import { prepareHeadingWordAnimation } from "@/lib/prepare-heading-word-animation"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import type { BreadcrumbItem } from "@/lib/breadcrumbs"

function ServiceHero({
  hero,
  slug,
  breadcrumbItems,
}: {
  hero: ServiceData["hero"]
  slug: string
  breadcrumbItems: BreadcrumbItem[]
}) {
  const { openProposalModal } = useProposalModal()
  const heroRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const heroBtnsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const primaryCtaLabel = hero.ctaButtons?.[0] ?? "Request A Proposal"
  const secondaryCtaLabel = hero.ctaButtons?.[1] ?? "Talk To Our Experts"
  const primaryCtaProps = getCtaButtonProps(primaryCtaLabel, openProposalModal)
  const secondaryCtaProps = getCtaButtonProps(secondaryCtaLabel, openProposalModal)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateLine = (lineEl: HTMLElement | null, delay: number) => {
        if (!lineEl) return
        const wordEls = prepareHeadingWordAnimation(lineEl)
        if (!wordEls.length) return
        gsap.fromTo(
          wordEls,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.06,
            delay,
          }
        )
      }

      animateLine(line1Ref.current, 0.2)
      animateLine(line2Ref.current, 0.38)
      if (hero.tagline3) animateLine(line3Ref.current, 0.56)

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, filter: "blur(8px)", y: 16 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.7,
          }
        )
      }

      if (heroBtnsRef.current) {
        gsap.fromTo(
          heroBtnsRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            stagger: 0.12,
            delay: 1.0,
          }
        )
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 60, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: "expo.out",
            delay: 0.3,
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [hero.tagline3])

  return (
    <section
      ref={heroRef}
      className="relative flex h-dvh min-h-[640px] overflow-hidden bg-[#072448]"
    >
      {/* Left content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-8 pb-8 pt-[72px] lg:w-[55%] lg:px-20 xl:pl-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,103,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(59,103,255,0.6) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-[600px]">
          <PageBreadcrumb items={breadcrumbItems} variant="dark" />
          <h1 className="mb-6 text-[2.35rem] font-extrabold leading-[1.22] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            <span
              ref={line1Ref}
              data-split-text={hero.tagline}
              className="block"
            >
              {hero.tagline}
            </span>
            {hero.tagline2 ? (
              <span
                ref={line2Ref}
                data-split-text={hero.tagline2}
                className="block"
              >
                {hero.tagline2}
              </span>
            ) : null}
            {hero.tagline3 ? (
              <span
                ref={line3Ref}
                data-split-text={hero.tagline3}
                className="block"
              >
                {hero.tagline3}
              </span>
            ) : null}
          </h1>

          <p
            ref={subtitleRef}
            className="type-body mb-10 max-w-[540px] text-white/85 lg:mb-12"
          >
            {hero.description}
          </p>

          <div ref={heroBtnsRef} className="flex flex-wrap gap-4">
            {primaryCtaProps.href ? (
              <Link
                href={primaryCtaProps.href}
                className="rounded-lg bg-[#0A3A73] px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#124e96]"
              >
                {primaryCtaLabel}
              </Link>
            ) : (
              <button
                type="button"
                onClick={primaryCtaProps.onClick}
                className="rounded-lg bg-[#0A3A73] px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#124e96]"
              >
                {primaryCtaLabel}
              </button>
            )}



            {secondaryCtaProps.href ? (
  <Link
    href={secondaryCtaProps.href}
    target={secondaryCtaProps.target}
    rel={secondaryCtaProps.rel}
    className="rounded-lg border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
  >
    Talk to Expert
  </Link>
) : (




              <button
                type="button"
                onClick={secondaryCtaProps.onClick}
                className="rounded-lg border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCtaLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right image */}
      {hero.image ? (
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
            src={hero.image}
            alt={hero.imageAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      ) : null}
    </section>
  )
}

export default ServiceHero
