"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import type { CompanyLifeSlide } from "@/sanity/lib/queries"

gsap.registerPlugin(ScrollTrigger)

// ── Used only as a FALLBACK if Sanity has no Company Page content yet ──
const DEFAULT_LABEL = "Culture & People"
const DEFAULT_TITLE = "Life at Beno"
const DEFAULT_PARAGRAPH =
  "At Beno Support, we encourage innovation, continuous learning, collaboration, and technology-driven problem solving. Our teams work on modern digital transformation projects that create real business impact across industries."
const DEFAULT_POINTS = [
  "Flexible remote-first work culture",
  "Continuous learning & upskilling programs",
  "Diverse, inclusive engineering teams",
  "Impactful projects across global industries",
]
const DEFAULT_SLIDES: Required<CompanyLifeSlide>[] = [
  { imageUrl: "/assets/company/life_at_beno/L1_1.png", alt: "Life at Beno — team collaboration" },
  { imageUrl: "/assets/company/life_at_beno/life_at_beno_2_1.png", alt: "Life at Beno — office culture" },
]

const SLIDE_INTERVAL_MS = 2000

type LifeAtBenoProps = {
  data?: {
    lifeSectionLabel?: string
    lifeTitle?: string
    lifeParagraph?: string
    lifePoints?: string[]
    lifeSlides?: CompanyLifeSlide[]
  }
}

export default function LifeAtBeno({ data }: LifeAtBenoProps) {
  const ref = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const sectionLabel = data?.lifeSectionLabel || DEFAULT_LABEL
  const title = data?.lifeTitle || DEFAULT_TITLE
  const paragraph = data?.lifeParagraph || DEFAULT_PARAGRAPH
  const points = data?.lifePoints?.length ? data.lifePoints : DEFAULT_POINTS
  const slides =
    data?.lifeSlides?.length
      ? data.lifeSlides.map((s, i) => ({
          imageUrl: s.imageUrl || DEFAULT_SLIDES[i % DEFAULT_SLIDES.length].imageUrl,
          alt: s.alt || `Life at Beno — photo ${i + 1}`,
        }))
      : DEFAULT_SLIDES

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-[#f7f9fc] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <span data-fade className="type-label section-label-light">
              {sectionLabel}
            </span>

            <h2
              data-fade
              className="type-heading mt-3 mb-5 text-[#0a1628]"
            >
              {title}
            </h2>

            <p data-fade className="type-body mb-6 text-[#4b5a72]">
              {paragraph}
            </p>

            <ul data-fade className="space-y-3">
              {points.map((point) => (
                <li
                  key={point}
                  className="type-body flex items-start gap-2.5 text-[#4b5a72]"
                >
                  <span className="mt-0.5 shrink-0 text-base leading-none text-[#3b67ff]">
                    •
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — image carousel */}
          <div data-fade className="w-full">
            <div className="relative w-full">
              {slides.map((slide, index) => (
                <Image
                  key={slide.imageUrl + index}
                  src={slide.imageUrl}
                  alt={slide.alt}
                  width={605}
                  height={403}
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className={cn(
                    "h-auto w-full rounded-3xl transition-opacity duration-700 ease-in-out",
                    index === activeIndex
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0"
                  )}
                  priority={index === 0}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.imageUrl + index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-6 bg-[#3b67ff]"
                      : "w-2 bg-[#c5d0e0] hover:bg-[#9aacc4]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
