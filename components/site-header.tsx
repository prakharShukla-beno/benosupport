"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"
import { Menu, X, ChevronDown, Globe, BookOpen, LayoutGrid } from "lucide-react"
import { SERVICE_NAV_ITEMS } from "@/lib/site-navigation"
import { WHATSAPP_URL } from "@/lib/social-links"

import { usePathname } from "next/navigation"

// ── Nav links ──────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Company",    href: "/company" },
]

// ── Services from shared navigation labels ─────────────────────────────────
const serviceItems = SERVICE_NAV_ITEMS.map((item) => ({
  slug: item.href.replace("/services/", ""),
  label: item.label,
  href: item.href,
}))

const resourceItems = [
  {
    label: "Insights",
    href: "/blog",
    description: "Insights on AI, software, and digital transformation",
    icon: BookOpen,
  },
  {
    label: "Use Cases",
    href: "/use-cases",
    description: "Real-world Agentic AI use cases for FinTech",
    icon: LayoutGrid,
  },
]
// ── Language config ────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English",   flag: "🇬🇧", short: "EN" },
  { code: "pt", label: "Português", flag: "🇧🇷", short: "PT" },
  { code: "hi", label: "हिंदी",    flag: "🇮🇳", short: "HI" },
  { code: "ar", label: "العربية",   flag: "🇸🇦", short: "AR" },
  { code: "fr", label: "Français",  flag: "🇫🇷", short: "FR" },
  { code: "es", label: "Español",   flag: "🇪🇸", short: "ES" },
]

export function SiteHeader() {
  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileOpen,     setIsMobileOpen]     = useState(false)
  const [isServicesOpen,   setIsServicesOpen]   = useState(false)
  const [isResourcesOpen,  setIsResourcesOpen]  = useState(false)
  const [isLangOpen,       setIsLangOpen]       = useState(false)
  const [activeLang,       setActiveLang]       = useState("EN")
  // mobile accordions
  const [mobileServices,   setMobileServices]   = useState(false)
  const [mobileResources,  setMobileResources]  = useState(false)

  const svcDropdownRef  = useRef<HTMLDivElement>(null)
  const svcChevronRef   = useRef<SVGSVGElement>(null)
  const svcItemRefs     = useRef<HTMLAnchorElement[]>([])
  const svcIsOpenRef    = useRef(false)

  const resDropdownRef  = useRef<HTMLDivElement>(null)
  const resChevronRef   = useRef<SVGSVGElement>(null)
  const resItemRefs     = useRef<HTMLAnchorElement[]>([])
  const resIsOpenRef    = useRef(false)
  const logoRef  = useRef<HTMLDivElement>(null)
  const langRef  = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    let prev = false
    const onScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
      if (scrolled !== prev && logoRef.current) {
        prev = scrolled
        gsap.fromTo(
          logoRef.current,
          { scale: 0.75, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1,0.55)" }
        )
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Body lock on mobile ───────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  // ── Close lang on outside click ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setIsLangOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // ── Google Translate ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!document.getElementById("gt-script")) {
      ;(window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        )
      }
      const s = document.createElement("script")
      s.id  = "gt-script"
      s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      s.async = true
      document.body.appendChild(s)
    }
  }, [])

  const switchLanguage = (code: string, short: string) => {
    setActiveLang(short)
    setIsLangOpen(false)
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null
    if (select) {
      select.value = code
      select.dispatchEvent(new Event("change"))
    }
  }

  // ── Generic dropdown helpers ──────────────────────────────────────────────
  const openDrop = (
    isOpenRef: React.MutableRefObject<boolean>,
    dropRef: React.RefObject<HTMLDivElement | null>,
    chevRef: React.RefObject<SVGSVGElement | null>,
    items: HTMLAnchorElement[],
    setter: (v: boolean) => void
  ) => {
    if (isOpenRef.current) return
    isOpenRef.current = true
    setter(true)
    const el = dropRef.current
    if (!el) return
    el.style.pointerEvents = "auto"
    gsap.killTweensOf(el)
    gsap.set(el, { display: "block", opacity: 0, y: -14 })
    gsap.to(el, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" })
    gsap.fromTo(
      items.filter(Boolean),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.055, duration: 0.38, ease: "power3.out", delay: 0.04 }
    )
    if (chevRef.current)
      gsap.to(chevRef.current, { rotation: 180, duration: 0.28, ease: "power2.out" })
  }

  const closeDrop = (
    isOpenRef: React.MutableRefObject<boolean>,
    dropRef: React.RefObject<HTMLDivElement | null>,
    chevRef: React.RefObject<SVGSVGElement | null>,
    setter: (v: boolean) => void
  ) => {
    if (!isOpenRef.current) return
    isOpenRef.current = false
    setter(false)
    const el = dropRef.current
    if (!el) return
    el.style.pointerEvents = "none"
    gsap.killTweensOf(el)
    gsap.to(el, {
      opacity: 0, y: -10, duration: 0.22, ease: "power2.inOut",
      onComplete: () => gsap.set(el, { display: "none" }),
    })
    if (chevRef.current)
      gsap.to(chevRef.current, { rotation: 0, duration: 0.22, ease: "power2.out" })
  }

  // bound helpers for Services
  const openSvc  = () => openDrop(svcIsOpenRef, svcDropdownRef, svcChevronRef, svcItemRefs.current, setIsServicesOpen)
  const closeSvc = () => closeDrop(svcIsOpenRef, svcDropdownRef, svcChevronRef, setIsServicesOpen)

  const openRes  = () => openDrop(resIsOpenRef, resDropdownRef, resChevronRef, resItemRefs.current, setIsResourcesOpen)
  const closeRes = () => closeDrop(resIsOpenRef, resDropdownRef, resChevronRef, setIsResourcesOpen)

  // ── Style helpers ─────────────────────────────────────────────────────────
  const textCls      = isScrolled ? "text-[#0d1e3c]" : "text-white/90"
  const hoverCls     = isScrolled ? "hover:text-[#3b67ff]" : "hover:text-white"

  const activeSvcCls =
  pathname.startsWith("/services") || isServicesOpen
    ? "text-[#3b67ff]"
    : `${textCls} ${hoverCls}`
  const activeResCls =
   pathname.startsWith("/blog") ||
   pathname.startsWith("/use-cases") ||
   isResourcesOpen
    ? "text-[#3b67ff]"
    : `${textCls} ${hoverCls}`


    const isActive = (href: string) => {
  if (href === "/") return pathname === "/"

  return pathname.startsWith(href)
}

  return (
    <>
      <div id="google_translate_element" className="hidden" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.07)]"
            : "bg-transparent"
        }`}
        onMouseLeave={() =>
          setTimeout(() => {
            if (!svcDropdownRef.current?.matches(":hover")) closeSvc()
            if (!resDropdownRef.current?.matches(":hover")) closeRes()
          }, 80)
        }
      >
        <nav className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 sm:h-[72px] items-center justify-between gap-6">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="shrink-0 hover:scale-[1.04] transition-transform duration-300 will-change-transform"
            >
              <div ref={logoRef}>
                <img
                  src={isScrolled ? "/assets/logo.svg" : "/assets/whitelogo.svg"}
                  alt="Beno Support"
                  className="h-9 sm:h-10 w-auto block"
                  style={{ imageRendering: "crisp-edges" }}
                />
              </div>
            </Link>

            {/* ── Desktop Nav ───────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1 justify-center">

              <Link
                href="/"
    className={`text-[15px] font-medium transition-colors duration-200 ${
  isActive("/")
    ? "text-[#3b67ff]"
    : `${textCls} ${hoverCls}`
}`}              >
                Home
              </Link>

              {/* Services trigger */}
              <button
                type="button"
                onMouseEnter={() => {
                  closeRes()
                  openSvc()
                }}
                onClick={() => (svcIsOpenRef.current ? closeSvc() : openSvc())}
                className={`flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${activeSvcCls}`}
              >
                Services
                <ChevronDown
                  ref={svcChevronRef}
                  className="w-4 h-4"
                  style={{ transformOrigin: "50% 50%" }}
                />
              </button>

              {/* Other nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors duration-200 ${
  isActive(link.href)
    ? "text-[#3b67ff]"
    : `${textCls} ${hoverCls}`
}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Resources */}
              <button
                type="button"
                onMouseEnter={() => {
                  closeSvc()
                  openRes()
                }}
                onClick={() => (resIsOpenRef.current ? closeRes() : openRes())}
                className={`flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${activeResCls}`}
              >
                Resources
                <ChevronDown
                  ref={resChevronRef}
                  className="w-4 h-4"
                  style={{ transformOrigin: "50% 50%" }}
                />
              </button>
            </div>

            {/* ── Right: Lang + CTA ─────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4">

              {/* Language switcher */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setIsLangOpen((v) => !v)}
                  className={`flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isScrolled
                      ? "text-[#0d1e3c] hover:bg-[#f0f4ff] hover:text-[#072448]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {activeLang}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-[#e8eefc] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.10)] overflow-hidden z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code, lang.short)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 ${
                          activeLang === lang.short
                            ? "bg-[#f0f4ff] text-[#072448]"
                            : "text-[#0d1e3c] hover:bg-[#f8fbff] hover:text-[#072448]"
                        }`}
                      >
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span className="flex-1 text-left">{lang.label}</span>
                        {activeLang === lang.short && (
                          <span className="text-[#072448] text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA button */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  px-6 py-2.5 text-[15px] font-semibold rounded-xl
                  transition-colors duration-300 inline-flex items-center
                  ${isScrolled
                    ? "bg-[#072448] text-white hover:bg-[#0a2d5c]"
                    : "border border-white/40 text-white hover:bg-white/10"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  Talk to Expert
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            {/* ── Mobile hamburger ──────────────────────────────────────── */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              className={`lg:hidden p-2 -mr-2 ${isScrolled ? "text-[#072448]" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* ── Services mega dropdown ────────────────────────────────────── */}
        <div
          ref={svcDropdownRef}
          style={{ pointerEvents: "none", display: "none" }}
          className="absolute top-full left-1/2 -translate-x-1/2 z-40 w-[82%] max-w-[1200px] pt-5"
          onMouseEnter={openSvc}
          onMouseLeave={closeSvc}
        >
          <div className="grid grid-cols-2 gap-x-14 gap-y-1 rounded-[30px] border border-slate-200 bg-white px-12 py-10 shadow-[0_25px_80px_rgba(15,23,42,.08)]">
            {serviceItems.map((item, i) => (
              <Link
                key={item.slug}
                href={item.href}
                ref={(el) => { if (el) svcItemRefs.current[i] = el }}
                onClick={closeSvc}
                className="group relative flex items-center gap-5 rounded-2xl px-5 py-4 transition-all duration-300 ease-out hover:bg-[#f7faff]"
              >
                <div className="h-9 w-[4px] shrink-0 rounded-full bg-slate-200 transition-all duration-300 group-hover:bg-[#072448]" />
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-black transition-colors duration-300 group-hover:text-[#072448]">
                  {item.label}
                </span>
                <svg className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#072448]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Resources dropdown ────────────────────────────────────────── */}
        <div
          ref={resDropdownRef}
          style={{ pointerEvents: "none", display: "none" }}
          className="absolute top-full left-1/2 -translate-x-1/2 z-40 w-[50%] max-w-[420px] pt-5"
          onMouseEnter={openRes}
          onMouseLeave={closeRes}
        >
          <div className="rounded-[30px] border border-slate-200 bg-white px-8 py-8 shadow-[0_25px_80px_rgba(15,23,42,.08)]">
            <div className="grid grid-cols-1 gap-4">
              {resourceItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(el) => { if (el) resItemRefs.current[i] = el }}
                    onClick={closeRes}
                    className="group flex items-start gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-[#e8eefc] hover:bg-[#f7faff]"
                  >
                    <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#f0f4ff] transition-colors duration-300 group-hover:bg-[#072448]">
                      <Icon className="w-5 h-5 text-[#072448] transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-[#0f172a] group-hover:text-[#072448] transition-colors duration-300">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ─────────────────────────────────────── */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto pt-[72px]">
          <div className="px-5 py-5 space-y-1">

            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="block py-3 text-base font-medium text-[#0d1e3c] hover:text-[#3b67ff] transition-colors"
            >
              Home
            </Link>

            {/* Services accordion */}
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 text-base font-medium text-[#0d1e3c]"
              onClick={() => setMobileServices((v) => !v)}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`} />
            </button>
            {mobileServices && (
              <div className="pl-3 space-y-1 mb-2">
                {serviceItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 py-2 px-3 text-[13px] font-medium text-[#374151] hover:text-[#3b67ff] rounded-lg hover:bg-[#f0f4ff] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#072448]/40 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Other nav links */}
            {navLinks.map((link) => (
  <Link
    key={link.label}
    href={link.href}
    onClick={() => setIsMobileOpen(false)}
    className={`block py-3 text-base font-medium transition-colors duration-200 ${
      isActive(link.href)
        ? "text-[#3b67ff]"
        : "text-[#0d1e3c] hover:text-[#3b67ff]"
    }`}
  >
                {link.label}
              </Link>
            ))}

            {/* Resources accordion */}
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 text-base font-medium text-[#0d1e3c]"
              onClick={() => setMobileResources((v) => !v)}
            >
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileResources ? "rotate-180" : ""}`} />
            </button>
            {mobileResources && (
              <div className="pl-3 space-y-2 mb-2">
                {resourceItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-3 py-2 px-3 text-[13px] font-medium text-[#374151] hover:text-[#3b67ff] rounded-lg hover:bg-[#f0f4ff] transition-colors"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-[#072448]" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            )}

            <div className="pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full text-center bg-[#072448] text-white font-semibold py-3 rounded-xl hover:bg-[#0a2d5c] transition-colors"
              >
                Talk to Expert
              </a>
            </div>

            {/* Language grid — mobile */}
            <div className="pt-5 border-t border-gray-100">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
                Language
              </p>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code, lang.short)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      activeLang === lang.short
                        ? "bg-[#072448] text-white border-[#072448]"
                        : "text-[#0d1e3c] border-[#e8eefc] hover:border-[#072448] hover:text-[#072448]"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
