"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useSiteSettings } from "@/components/site-settings-provider";
import {
  applyBitrixContactFormShell,
  applyBitrixFormSuccessTheme,
  injectBitrixContactFormShellStyles,
  injectBitrixFormThemeOverrides,
} from "@/lib/bitrix-form-theme-overrides";
import Hero from "./hero";

// ── Used only as a FALLBACK if Sanity has no Site Settings content yet ──
const DEFAULT_PHONE_1 = "+91 892-988-4560";
const DEFAULT_PHONE_2 = "+91 120 423 4429";
const DEFAULT_EMAIL = "info@benosupport.com";
const DEFAULT_OFFICES = [
  { label: "CORPORATE OFFICE", address: "B-23/C1, Block B, Sector 62, Noida, Uttar Pradesh 201309" },
  { label: "REGISTERED OFFICE", address: "DISTRICT CENTRE, Roots Tower, 706, PLOT NO. 7, Laxmi Nagar, New Delhi, Delhi 11009" },
  { label: "U.S OFFICE", address: "1325 Main Street, Suite 1404, Katy, TX 77494" },
  { label: "ADDITIONAL DELIVERY LOCATIONS", address: "Lucknow | Bihar | Mumbai | Ahmedabad | Bengaluru" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BITRIX_CONTACT_FORM_ID = "inline/16/i1wvj1";
const BITRIX_CONTACT_LOADER_URL =
  "https://cdn.bitrix24.in/b16910457/crm/form/loader_16.js";

// ─── Icons ────────────────────────────────────────────────────────────────────

const HeadsetIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── Map background ───────────────────────────────────────────────────────────

const MAP_BG_STYLE: React.CSSProperties = {
  backgroundImage: "url('/assets/contact/Map_Background.svg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

function MapBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[1.0]"
      style={MAP_BG_STYLE}
      aria-hidden
    />
  );
}

function DarkPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#072448] shadow-[0_4px_24px_rgba(7,36,72,0.10)] ${className}`}
    >
      <MapBackground />
      <div className="relative">{children}</div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitWords(el: HTMLElement) {
  const text = (el.innerText ?? el.textContent ?? "").trim();
  if (!text) return [] as HTMLElement[];

  const words = text.split(/\s+/);
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="text-reveal-word word-wrap"><span class="word text-reveal-inner">${w}&nbsp;</span></span>`,
    )
    .join("");
  return Array.from(el.querySelectorAll<HTMLElement>(".word"));
}

function injectBitrixContactForm(container: HTMLElement) {
  const script = document.createElement("script");
  script.setAttribute("data-b24-form", BITRIX_CONTACT_FORM_ID);
  script.setAttribute("data-skip-moving", "true");
  script.textContent = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];if(h&&h.parentNode){h.parentNode.insertBefore(s,h);}else{(d.head||d.documentElement).appendChild(s);}})(window,document,'${BITRIX_CONTACT_LOADER_URL}');`;
  container.appendChild(script);
}

const BITRIX_SUCCESS_VISIBLE_MS = 3500;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactUsPage() {
  const settings = useSiteSettings();
  const phone1 = settings?.contactPhone1 || DEFAULT_PHONE_1;
  const phone2 = settings?.contactPhone2 || DEFAULT_PHONE_2;
  const email = settings?.contactEmail || DEFAULT_EMAIL;
  const offices = settings?.officeLocations?.length ? settings.officeLocations : DEFAULT_OFFICES;

  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const formSectionRef = useRef<HTMLElement>(null);
  const formHeadRef = useRef<HTMLDivElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);
  const bitrixFormContainerRef = useRef<HTMLDivElement>(null);
  const bitrixScriptInjectedRef = useRef(false);
  const bitrixFormThemeAppliedRef = useRef(false);
  const bitrixSuccessResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const [isBitrixFormReady, setIsBitrixFormReady] = useState(false);

  const officesRef = useRef<HTMLElement>(null);
  const officeHeadRef = useRef<HTMLDivElement>(null);
  const officeCardsRef = useRef<HTMLDivElement>(null);

  const ctaRef = useRef<HTMLElement>(null);
  const ctaCardsRef = useRef<HTMLDivElement>(null);

  const reloadBitrixForm = () => {
    const container = bitrixFormContainerRef.current;
    if (!container) return;

    container.innerHTML = "";
    bitrixScriptInjectedRef.current = false;
    bitrixFormThemeAppliedRef.current = false;
    setIsBitrixFormReady(false);
    injectBitrixContactForm(container);
    bitrixScriptInjectedRef.current = true;
  };

  useEffect(() => {
    const container = bitrixFormContainerRef.current;
    if (!container) return;

    const alreadyInjected =
      bitrixScriptInjectedRef.current ||
      container.querySelector(`script[data-b24-form="${BITRIX_CONTACT_FORM_ID}"]`);

    if (alreadyInjected) return;

    injectBitrixContactForm(container);
    bitrixScriptInjectedRef.current = true;

    return () => {
      if (bitrixSuccessResetTimerRef.current) {
        clearTimeout(bitrixSuccessResetTimerRef.current);
        bitrixSuccessResetTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const markFormReady = () => setIsBitrixFormReady(true);

    const applyFormShell = () => {
      injectBitrixContactFormShellStyles();
      const container = bitrixFormContainerRef.current;
      if (container) applyBitrixContactFormShell(container);
    };

    const applyFormThemeOnce = () => {
      if (bitrixFormThemeAppliedRef.current) return;
      bitrixFormThemeAppliedRef.current = true;
      injectBitrixFormThemeOverrides();
      applyFormShell();
    };

    const applySuccessTheme = () => {
      injectBitrixFormThemeOverrides();
      applyFormShell();
      const container = bitrixFormContainerRef.current;
      if (container) {
        requestAnimationFrame(() => applyBitrixFormSuccessTheme(container));
      }
    };

    const onFormInit = (event: Event) => {
      try {
        const detail = (event as CustomEvent<{ form?: { id?: string | number } }>)
          .detail;
        const formId = detail?.form?.id;
        if (formId != null && String(formId) !== "16") return;
      } catch {
        // Bitrix event shapes vary — still proceed if our container has a form.
      }

      const container = bitrixFormContainerRef.current;
      if (container && !container.querySelector(".b24-form")) return;

      markFormReady();
      applyFormThemeOnce();
      // Bitrix often paints borders one tick later — re-apply shell.
      requestAnimationFrame(applyFormShell);
      setTimeout(applyFormShell, 100);
      setTimeout(applyFormShell, 500);
    };

    const onFormSuccess = () => {
      const container = bitrixFormContainerRef.current;
      if (!container) return;

      // Wait a frame so Bitrix can paint the thank-you state inside our embed.
      requestAnimationFrame(() => {
        const hasSuccess = Boolean(
          container.querySelector(
            ".b24-form-state.b24-form-success, .b24-form-success",
          ),
        );
        if (!hasSuccess) return;

        applySuccessTheme();

        if (bitrixSuccessResetTimerRef.current) {
          clearTimeout(bitrixSuccessResetTimerRef.current);
        }
        bitrixSuccessResetTimerRef.current = setTimeout(() => {
          reloadBitrixForm();
          bitrixSuccessResetTimerRef.current = null;
        }, BITRIX_SUCCESS_VISIBLE_MS);
      });
    };

    window.addEventListener("b24:form:init", onFormInit);
    window.addEventListener("b24:form:send:success", onFormSuccess);

    const container = bitrixFormContainerRef.current;
    const checkFormMounted = () => {
      if (!container) return;
      if (container.querySelector(".b24-form")) {
        markFormReady();
        applyFormThemeOnce();
        applyFormShell();
      }
    };

    const observer =
      container &&
      new MutationObserver(() => {
        checkFormMounted();
      });

    if (observer && container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    checkFormMounted();
    injectBitrixFormThemeOverrides();
    injectBitrixContactFormShellStyles();

    return () => {
      window.removeEventListener("b24:form:init", onFormInit);
      window.removeEventListener("b24:form:send:success", onFormSuccess);
      observer?.disconnect();
      if (bitrixSuccessResetTimerRef.current) {
        clearTimeout(bitrixSuccessResetTimerRef.current);
        bitrixSuccessResetTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero h1 word reveal
      if (h1Ref.current) {
        const words = splitWords(h1Ref.current);
        if (words.length) {
          gsap.fromTo(
            words,
            { y: "110%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.06,
              delay: 0.2,
            },
          );
        }
      }
      // Hero subtitle blur
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
          },
        );
      }
      // Hero buttons
      if (heroBtnsRef.current?.children?.length) {
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
          },
        );
      }
      // Hero image panel
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
          },
        );
      }
      // Social icons pop
      if (socialRef.current?.children?.length) {
        gsap.fromTo(
          socialRef.current.children,
          { opacity: 0, scale: 0, rotate: -90 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.08,
            delay: 1.1,
          },
        );
      }

      // Form section heading
      if (formHeadRef.current) {
        gsap.fromTo(
          formHeadRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: formHeadRef.current, start: "top 85%" },
          },
        );
      }
      // Form box
      if (formBoxRef.current) {
        gsap.fromTo(
          formBoxRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: formBoxRef.current, start: "top 85%" },
          },
        );
      }
      // Info cards stagger
      if (infoCardsRef.current?.children?.length) {
        gsap.fromTo(
          infoCardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            stagger: 0.12,
            scrollTrigger: { trigger: infoCardsRef.current, start: "top 85%" },
          },
        );
      }

      // Office heading
      if (officeHeadRef.current) {
        gsap.fromTo(
          officeHeadRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: officeHeadRef.current, start: "top 85%" },
          },
        );
      }
      // Office cards stagger
      if (officeCardsRef.current?.children?.length) {
        gsap.fromTo(
          officeCardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.3)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: officeCardsRef.current,
              start: "top 85%",
            },
          },
        );
      }

      // CTA cards
      if (ctaCardsRef.current?.children?.length) {
        gsap.fromTo(
          ctaCardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.4)",
            stagger: 0.15,
            scrollTrigger: { trigger: ctaCardsRef.current, start: "top 85%" },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      <SiteHeader />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Hero
        heroRef={heroRef}
        h1Ref={h1Ref}
        subtitleRef={subtitleRef}
        heroBtnsRef={heroBtnsRef}
        imageRef={imageRef}
        socialRef={socialRef}
      />

      {/* ── FORM + INFO CARDS ──────────────────────────────────────────────── */}
      <section
        id="contact-form"
        ref={formSectionRef}
        className="bg-white py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          {/* Heading */}
          <div ref={formHeadRef} className="text-center mb-10">
            <h2 className="type-heading text-[#0a1628]">
              Get in Touch
            </h2>
            <p className="mt-2 type-body text-[#5a6a84]">
              Have a project in mind or a business challenge to solve?
            </p>
            <p className="type-body text-[#5a6a84]">
              Fill out the form and our team will connect with you within 24
              business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px] lg:items-stretch">
            {/* ── Bitrix24 form ── */}
            <DarkPanel className="h-full min-h-[480px]">
              <div
                ref={formBoxRef}
                className="relative flex h-full min-h-[480px] flex-col p-7 lg:p-8"
              >
                {!isBitrixFormReady ? (
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#072448]"
                    aria-live="polite"
                    aria-busy="true"
                  >
                    <span
                      className="h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-white"
                      aria-hidden
                    />
                    <p className="text-sm text-white/70">Loading form…</p>
                  </div>
                ) : null}
                <div
                  ref={bitrixFormContainerRef}
                  className="bitrix-form-theme bitrix-contact-form relative min-h-[420px] w-full flex-1 overflow-hidden rounded-2xl p-0"
                  aria-label="Contact form"
                />
              </div>
            </DarkPanel>

            {/* ── Info cards ── */}
            <div ref={infoCardsRef} className="flex flex-col gap-4">
              {[
                {
                  icon: <HeadsetIcon />,
                  title: "Call Us",
                  lines: [phone1, phone2].filter(Boolean),
                },
                {
                  icon: <MailIcon />,
                  title: "Email Us",
                  lines: [email],
                },
                {
                  icon: <BuildingIcon />,
                  title: "Corporate Office (India)",
                  lines: ["Noida, Uttar Pradesh"],
                },
              ].map((card) => (
                <DarkPanel key={card.title} className="flex-1">
                  <div className="flex items-start gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#072448]">
                      {card.icon}
                    </div>
                    <div>
                      <p className="type-body mb-1 font-bold text-white">
                        {card.title}
                      </p>
                      {card.lines.map((line) => (
                        <p
                          key={line}
                          className="type-body text-white/90"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </DarkPanel>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE LOCATIONS ──────────────────────────────────────────────── */}
      <section
        ref={officesRef}
        className="py-16 lg:py-20"
        style={{ background: "#072448" }}
      >
        {/* World map dots bg */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(59,103,255,0.9) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-12">
          <div ref={officeHeadRef} className="text-center mb-10">
            <span className="type-label section-label-dark">
              Our Offices
            </span>
            <h2 className="mt-2 type-heading text-white">
              Registered Office
            </h2>
          </div>

          {/* Cards grid */}
          <div
            ref={officeCardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {offices.map((office) => (
              <div
                key={office.label}
                className="group flex gap-4 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-white">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#0a1628]">
                    {office.label}
                  </p>
                  <p className="text-[13px] leading-relaxed text-[#5a6a84]">
                    {office.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL / EMAIL CTA ──────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="bg-white py-16 lg:py-20 border-t border-[#edf1f6]"
      >
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="type-heading text-[#0a1628]">
              Contact Information
            </h2>
          </div>

          <div
            ref={ctaCardsRef}
            className="mx-auto grid max-w-[900px] grid-cols-1 gap-5 md:grid-cols-2"
          >
            <a
              href={`tel:${phone1.replace(/\s/g, "")}`}
              className="group flex flex-col items-start gap-4 rounded-2xl bg-[#072448] p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#072448]">
                <HeadsetIcon />
              </div>
              <p className="text-[18px] font-extrabold text-white">Call Us</p>
              <p className="type-body text-white/90">
                {[phone1, phone2].filter(Boolean).join(" , ")}
              </p>
            </a>

            <a
              href={`mailto:${email}`}
              className="group flex flex-col items-start gap-4 rounded-2xl bg-[#072448] p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#072448]">
                <MailIcon />
              </div>
              <p className="text-[18px] font-extrabold text-white">Email Us</p>
              <p className="type-body text-white/90">
                {email}
              </p>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
