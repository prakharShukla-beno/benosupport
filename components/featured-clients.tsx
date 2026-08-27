"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const government = [
  { name: "Indian Air Force",  logo: "/assets/publicimg/govt/airforce.svg" },
  { name: "Indian Army",       logo: "/assets/publicimg/govt/army.svg" },
  { name: "Indian Navy",       logo: "/assets/publicimg/govt/navy.svg" },
  { name: "Indian Railways",   logo: "/assets/publicimg/govt/railway.svg" },
  { name: "Ayush Ministry",    logo: "/assets/publicimg/govt/ayushM.svg" },
  { name: "Health Ministry",   logo: "/assets/publicimg/govt/healthM.svg" },
  { name: "Skill India",       logo: "/assets/publicimg/govt/skillIndia.svg" },
  { name: "Survey of India",   logo: "/assets/publicimg/govt/SurveyIndia.svg" },
  { name: "ICAR",              logo: "/assets/publicimg/govt/icar.svg" },
  { name: "UPPCL",             logo: "/assets/publicimg/govt/uppcl.svg" },
  { name: "UP Government",     logo: "/assets/publicimg/govt/up.svg" },
  { name: "DESCO",             logo: "/assets/publicimg/govt/desco.svg" },
  { name: "Bihar Tourism",                logo: "/assets/publicimg/govt/bt.svg" },
]

const technology = [
  { name: "Google",          logo: "/assets/publicimg/tech/Google.svg" },
  { name: "NTT Data",        logo: "/assets/publicimg/tech/nttdata.svg" },
  { name: "Damco",           logo: "/assets/publicimg/tech/Damco.svg" },
  { name: "Infodart",        logo: "/assets/publicimg/tech/infodart.svg" },
  { name: "Algoworks",       logo: "/assets/publicimg/tech/Algowork.svg" },
  { name: "BluePi",          logo: "/assets/publicimg/tech/Bluepi.svg" },
  { name: "Union Systems",   logo: "/assets/publicimg/tech/UnionSys.svg" },
  { name: "WinZip",          logo: "/assets/publicimg/tech/WinZip.svg" },
  { name: "Essel",           logo: "/assets/publicimg/tech/essel.svg" },
  { name: "i2k2",            logo: "/assets/publicimg/tech/i2k2.svg" },
  { name: "Innodata",        logo: "/assets/publicimg/tech/innodata.svg" },
  { name: "KiwiTech",        logo: "/assets/publicimg/tech/kiwitech.svg" },
  { name: "Knowcross",       logo: "/assets/publicimg/tech/knowcross.svg" },
  { name: "Sonata Software", logo: "/assets/publicimg/tech/sonata.svg" },
]

const fintech = [
  { name: "Google Pay",  logo: "/assets/publicimg/Fintech/Gpay.svg" },
  { name: "Yes Bank",    logo: "/assets/publicimg/Fintech/Yes Bank.svg" },
  { name: "Amazon Pay",  logo: "/assets/publicimg/Fintech/Amazone Pay.svg" },
  { name: "BharatPe",    logo: "/assets/publicimg/Fintech/bharatpe.svg" },
  { name: "Magicpin",    logo: "/assets/publicimg/Fintech/magicpin.svg" },
  { name: "ClearDekho",  logo: "/assets/publicimg/Fintech/clear dekho.svg" },
  { name: "Rentickle",   logo: "/assets/publicimg/Fintech/rentickle.svg" },
  { name: "White Blue",  logo: "/assets/publicimg/Fintech/White Blue.svg" },
]

const healthcare = [
  { name: "Max Healthcare",  logo: "/assets/publicimg/healthcare/MAX.svg" },
  { name: "Fortis",          logo: "/assets/publicimg/healthcare/FORTIS.svg" },
  { name: "Prakash Hospital",  logo: "/assets/publicimg/healthcare/cure_with_care.svg" },
]

const brandColors: Record<string, string> = {
  "Damco": "#e63224", "NTT Data": "#003087", "infodart": "#0078d7",
  "Bit studios": "#1a1a1a", "Algoworks": "#e84343",
  "Yes Bank": "#003399", "BharatPe": "#00b386",
  "Max Healthcare": "#004990", "Fortis": "#006b3f", "Prakash Hospital": "#e05c2e",
}

// Repeat items enough times so the track is always wider than any viewport
const REPS = 7

// ─── ClientCard ───────────────────────────────────────────────────────────────
function ClientCard({
  client,
  tall = false,
}: {
  client: { name: string; logo: string | null }
  tall?: boolean
}) {
  return (
    <div
      className="
        flex-shrink-0 group
        flex flex-col items-center justify-center gap-2
        rounded-2xl border border-[#e8eef8] bg-white
        hover:border-[#3b67ff]/40
        hover:shadow-[0_10px_36px_rgba(59,103,255,0.13)]
    
        transition-all duration-200 cursor-default select-none
      "
      style={{ width: tall ? 210 : 190, height: tall ? 170 : 172, padding: "16px 18px", flexShrink: 0 }}
    >
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          draggable={false}
          className="object-contain group-hover:scale-108 transition-transform duration-300"
          style={{ width: tall ? 330 : 410, height: tall ? 120 : 122 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
        />
      ) : (
        <span
          className="font-bold text-[13px] text-center leading-tight"
          style={{ color: brandColors[client.name] ?? "#0d1e3c" }}
        >
          {client.name}
        </span>
      )}
      <span className="text-[10px] text-[#6b7a99] font-semibold text-center leading-tight tracking-wide group-hover:text-[#3b67ff] transition-colors duration-200">
        {client.name}
      </span>
    </div>
  )
}

// ─── MarqueeRow ───────────────────────────────────────────────────────────────
function MarqueeRow({
  label,
  items,
  speed = 55,
  reverse = false,
  tall = false,
}: {
  label: string
  items: { name: string; logo: string | null }[]
  speed?: number
  reverse?: boolean
  tall?: boolean
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const tweenRef   = useRef<gsap.core.Tween | null>(null)

  // Flatten REPS copies of the items array into a single array
  const repeated = Array.from({ length: REPS }, () => items).flat()

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track   = trackRef.current
    if (!wrapper || !track) return

    let cancelled = false
    let cleanup: (() => void) | null = null

    // Wait one frame for layout to settle so scrollWidth is accurate
    const raf = requestAnimationFrame(() => {
      if (cancelled) return

      // Width of exactly one set of items
      const setW = track.scrollWidth / REPS

      // fromTo with repeat: -1 gives a perfect seamless loop:
      //   normal : 0 → -setW → (jumps to 0) → …
      //   reverse: -setW → 0 → (jumps to -setW) → …
      tweenRef.current = gsap.fromTo(
        track,
        { x: reverse ? -setW : 0 },
        {
          x: reverse ? 0 : -setW,
          duration: setW / speed,  // speed = px per second
          ease: "none",
          repeat: -1,
        }
      )

      const pause  = () => tweenRef.current?.pause()
      const resume = () => tweenRef.current?.resume()
      wrapper.addEventListener("mouseenter", pause)
      wrapper.addEventListener("mouseleave", resume)

      cleanup = () => {
        tweenRef.current?.kill()
        wrapper.removeEventListener("mouseenter", pause)
        wrapper.removeEventListener("mouseleave", resume)
      }
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      cleanup?.()
    }
  }, [reverse, speed])

  return (
    <div>
      {/* Row label */}
      <div className="flex items-center gap-4 mb-5">
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0d1e3c] shrink-0">{label}</h3>
        <div className="flex-1 h-px bg-[#e2e8f4]" />
      </div>

      {/* Marquee wrapper — edge fade via CSS mask */}
      <div
        ref={wrapperRef}
        className="overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          maskImage:        "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-4 py-2"
          style={{ width: "max-content" }}
        >
          {repeated.map((client, i) => (
            <ClientCard key={`${label}-${i}`} client={client} tall={tall} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── FeaturedClients ──────────────────────────────────────────────────────────
export function FeaturedClients() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 90%" },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <span className="type-label font-semibold section-label-light mb-3 block">
            Our Clients
          </span>
          <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] font-extrabold text-[#0d1e3c] leading-[1.1] tracking-[-1px] mb-4">
            OUR FEATURED CLIENTS
          </h2>
          <p className="text-[#4b5a72] text-[15px] sm:text-[16px] leading-[1.8] max-w-[700px]">
            We collaborate with startups, growing businesses, enterprises, and public sector organizations worldwide to
            deliver AI-driven innovation, scalable digital platforms, cloud transformation, and enterprise technology solutions.
          </p>
        </div>

        {/* Four labelled marquee strips — alternating direction for visual richness */}
        <div className="space-y-10 lg:space-y-14">
          <MarqueeRow label="Government"  items={government}  speed={44} tall         />
          <MarqueeRow label="Technology"  items={technology}  speed={55} reverse      />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 min-w-0">
           <div className="min-w-0 overflow-hidden">
             <MarqueeRow label="Fintech"    items={fintech}    speed={40}         />
           </div>
           <div className="min-w-0 overflow-hidden">
             <MarqueeRow label="Healthcare" items={healthcare} speed={28}  />
           </div>
         </div>
        </div>

      </div>
    </section>
  )
}