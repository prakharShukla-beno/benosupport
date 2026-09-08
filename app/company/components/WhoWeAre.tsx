"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ── Used only as a FALLBACK if Sanity has no Company Page content yet ──
const DEFAULT_LABEL = "About Us"
const DEFAULT_TITLE = "Who We Are"
const DEFAULT_PARAGRAPHS = [
  "Beno Support is an engineering-led technology company focused on helping businesses build scalable digital ecosystems, modernize infrastructure, and accelerate innovation through AI-first transformation strategies.",
  "From enterprise software development and cloud modernization to cybersecurity and intelligent automation, we partner with organizations to solve complex technology challenges with scalable engineering solutions.",
  "Our teams combine consulting expertise, agile delivery models, cloud-native engineering, and product-focused execution to deliver measurable business outcomes.",
]
const DEFAULT_IMAGE = "/assets/company/benobuilding.jpg"

type WhoWeAreProps = {
  data?: {
    whoWeAreSectionLabel?: string
    whoWeAreTitle?: string
    whoWeAreParagraphs?: string[]
    whoWeAreImageUrl?: string
  }
}

export default function WhoWeAre({ data }: WhoWeAreProps) {
  const ref = useRef<HTMLElement>(null)

  const sectionLabel = data?.whoWeAreSectionLabel || DEFAULT_LABEL
  const title = data?.whoWeAreTitle || DEFAULT_TITLE
  const paragraphs = data?.whoWeAreParagraphs?.length ? data.whoWeAreParagraphs : DEFAULT_PARAGRAPHS
  const imageUrl = data?.whoWeAreImageUrl || DEFAULT_IMAGE

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image — LEFT */}
          <div data-fade className="w-full overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt="Beno Support Office Building"
              width={960}
              height={1080}
              quality={100}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="h-auto max-h-[400px] w-full rounded-2xl object-cover object-center sm:max-h-[480px] lg:max-h-[560px]"
            />
          </div>

          {/* Text — RIGHT */}
          <div className="flex flex-col justify-center">
            <span data-fade className="type-label mb-4 section-label-light">
              {sectionLabel}
            </span>
            <h2 data-fade className="type-heading mb-6 text-[#0a1628]">
              {title}
            </h2>
            <div data-fade className="type-body space-y-5 text-[#4b5a72]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
