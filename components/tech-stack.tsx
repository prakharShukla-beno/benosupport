"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"

const tabs = ["Front-end", "Back-end", "Database", "Cloud-Hosting", "Testing", "Artificial Intelligence"]

type TechItem = {
  name: string
  icon: string
  invertIcon?: boolean
}

const techData: Record<string, TechItem[]> = {
  "Front-end": [
    { name: "React.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Angular",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "Vue.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Nuxt.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
    { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Bootstrap",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  ],
  "Back-end": [
    { name: "Node.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Laravel",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    {name:"java",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},
    // { name: "Django",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    // { name: "Express",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "NestJS",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  ],
  "Database": [
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  ],
  "Cloud-Hosting": [
    { name: "AWS",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invertIcon: true },
    { name: "Azure",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "Docker",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  ],
  "Testing": [
    { name: "Jest",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { name: "Cypress",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg" },
    { name: "Selenium",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
    { name: "Playwright", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/playwright.svg", invertIcon: true },
    { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  ],
  "Artificial Intelligence": [
    { name: "OpenAI",       icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg", invertIcon: true },
    { name: "TensorFlow",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "LangChain",    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/langchain.svg", invertIcon: true },
    { name: "Hugging Face", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/huggingface.svg", invertIcon: true },
  ],
}

export function TechStack() {
  const [active, setActive] = useState("Front-end")
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef    = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  // ── Entrance animation on scroll ──────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 36 })
      gsap.set(tabsRef.current,    { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 88%",
        },
      })
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .to(tabsRef.current,    { opacity: 1, y: 0, duration: 0.5,  ease: "power2.out" }, "-=0.45")
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Tab switch stagger ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll(".tech-card")
    gsap.set(cards,  { opacity: 0, y: 24, scale: 0.92 })
    gsap.to(cards, {
      opacity:  1,
      y:        0,
      scale:    1,
      duration: 0.4,
      ease:     "power2.out",
      stagger:  0.05,
    })
  }, [active])

  const items = techData[active] ?? []

  return (
    <section
      ref={sectionRef}
      className="bg-background py-16 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div ref={headingRef} className="mb-10 lg:mb-14">
          <span className="type-label font-semibold section-label-light mb-3 block">
            Technology Stack
          </span>
          <h2 className="mt-1 text-balance type-heading font-bold text-primary">
            Our Technology &amp; Tool Stack
          </h2>
          <p className="mt-3 max-w-2xl text-pretty type-body leading-relaxed text-secondary">
            Industry-leading platforms driving innovation, performance, and long-term security.
          </p>
        </div>

        {/* ── Tab Pills ───────────────────────────────────────────────────── */}
        <div
          ref={tabsRef}
          className="flex flex-wrap gap-2 sm:gap-3 mb-10 overflow-x-auto pb-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`
                shrink-0 px-5 py-2 rounded-lg text-[14px] font-medium border
                transition-all duration-200 whitespace-nowrap
                ${active === tab
                  ? "bg-button text-button-foreground border-button shadow-md shadow-button/25"
                  : "bg-card text-secondary border-border hover:border-button hover:text-accent"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Grid ────────────────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6"
        >
          {items.map((tech) => (
            <div
              key={tech.name}
              className="tech-card group relative bg-card rounded-2xl border border-border
                         flex flex-col items-center gap-5 pt-8 pb-6 px-4
                         hover:border-button/30 hover:shadow-xl hover:shadow-button/10
                         transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Top-edge blue glow line on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] rounded-full
                           bg-button opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Radial glow bg on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% -10%, rgba(59,103,255,0.07) 0%, transparent 65%)",
                }}
              />

              {/* ── Navy icon box ── */}
              <span
                className="relative flex items-center justify-center rounded-2xl
                           w-[80px] h-[80px] sm:w-[88px] sm:h-[88px]

                           group-hover:rotate-[10deg] group-hover:-translate-y-1
                           transition-transform duration-300 hover:rotate-[1deg]"
                style={{
                  background: "linear-gradient(145deg, #0f2350 0%, #0d1e3c 60%, #0a1628 100%)",
                  boxShadow:
                    "0 4px 16px rgba(13,30,60,0.35), 0 1px 0 rgba(255,255,255,0.06) inset",
                }}
              >
                {/* Corner shine */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 50%) ",
                  }}
                />
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={46}
                  height={46}
                  className={cn(
                    "relative w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] object-contain",
                    tech.invertIcon && "brightness-0 invert"
                  )}
                  
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.opacity = "0"
                  }}
                />
              </span>

              {/* Name */}
              <span className="relative text-primary text-[13px] sm:text-[14px] font-semibold text-center leading-snug">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}