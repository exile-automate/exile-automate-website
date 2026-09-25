"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface BenefitCard {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const BENEFITS: BenefitCard[] = [
  {
    number: "01",
    title: "Eliminate Human Limitation",
    description:
      "No more missed opportunities or guest frustration due to wait times.",
    Icon: Zap,
  },
  {
    number: "02",
    title: "Radical Cost Efficiency",
    description:
      "Significantly save on labor costs while increasing output.",
    Icon: TrendingUp,
  },
  {
    number: "03",
    title: "Infinite Scalability",
    description:
      "Scale your operations to peak hours and beyond without hiring more staff.",
    Icon: Users,
  },
  {
    number: "04",
    title: "Consistent Excellence",
    description:
      "Deliver a high-quality, standardized experience to every client, every time.",
    Icon: CheckCircle2,
  },
  {
    number: "05",
    title: "24/7/365 Connectivity",
    description:
      'Your business stays "awake" and responsive even when your team is off-duty.',
    Icon: Clock,
  },
  {
    number: "06",
    title: "Purpose Over Product",
    description:
      "This isn\u2019t just business for us. It\u2019s about restoring time, peace, and possibility.",
    Icon: Sparkles,
  },
];

/* ------------------------------------------------------------------ */
/*  Scroll constants — single source of truth                          */
/* ------------------------------------------------------------------ */

const CARD_COUNT = BENEFITS.length; // 6
const STEP_VH = 28; // vh of scroll per card transition
const PIN_VH = (CARD_COUNT - 1) * STEP_VH; // 140vh pin distance
const SECTION_VH = PIN_VH + 100; // 240vh total section height
const PEEK_PX = 14; // px of previous card exposed at top edge
const TRAVEL_DISTANCE = 350; // px distance incoming card travels from below

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WhyChooseStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect reduced motion & mobile once on mount */
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /* Scroll listener — continuous progress calculation */
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (section) {
            const rect = section.getBoundingClientRect();
            const pinDistance = rect.height - window.innerHeight;
            if (pinDistance > 0) {
              const scrolled = -rect.top;
              const p = Math.min(Math.max(scrolled / pinDistance, 0), 1);
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion, isMobile]);

  /* ---- Mobile / reduced-motion: simple vertical list ---- */
  if (isMobile || prefersReducedMotion) {
    return (
      <section className="bg-transparent relative z-10 py-16 px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            WHY CHOOSE US
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-foreground">
            Why Choose AI Implementation?
          </h2>
        </div>

        {/* Cards — simple stack */}
        <div className="mx-auto max-w-[1060px] flex flex-col gap-5">
          {BENEFITS.map((card) => (
            <BenefitCardUI key={card.number} card={card} contentOpacity={1} />
          ))}
        </div>

        {/* CTA */}
        <CTABlock />
      </section>
    );
  }

  /* ---- Desktop: scroll-driven stacking cards ---- */
  const cardProgress = progress * (CARD_COUNT - 1); // 0.0 to 5.0 continuous float

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${SECTION_VH}vh`,
      }}
      className="bg-transparent"
    >
      {/* Sticky viewport-locked container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className="flex flex-col items-center justify-center overflow-hidden px-5"
      >
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-6 flex flex-col items-center gap-2 shrink-0">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            WHY CHOOSE US
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-foreground">
            Why Choose AI Implementation?
          </h2>
        </div>

        {/* Card stack area */}
        <div
          className="relative w-full"
          style={{
            maxWidth: 1060,
            height: 370,
          }}
        >
          {BENEFITS.map((card, i) => {
            // 1. Calculate Y position
            let y = 0;
            if (cardProgress >= i) {
              // Settled in stack
              y = i * PEEK_PX;
            } else if (cardProgress > i - 1) {
              // Transitioning from below
              const t = cardProgress - (i - 1); // 0 -> 1
              y = (1 - t) * TRAVEL_DISTANCE + i * PEEK_PX;
            } else {
              // Below viewport / stack
              y = TRAVEL_DISTANCE + i * PEEK_PX;
            }

            // 2. Calculate Content Opacity
            // Active card (diff ~ 0) -> opacity 1
            // Fades in when incoming (-1 < diff < 0), fades out when covered (0 < diff < 1)
            const diff = cardProgress - i;
            let contentOpacity = 0;
            if (diff >= -1 && diff <= 1) {
              contentOpacity = 1 - Math.abs(diff);
            }
            contentOpacity = Math.min(Math.max(contentOpacity, 0), 1);

            return (
              <div
                key={card.number}
                style={{
                  position: "absolute",
                  inset: 0,
                  height: 300,
                  zIndex: i + 1,
                  transform: `translate3d(0, ${y}px, 0)`,
                  willChange: "transform",
                }}
              >
                <BenefitCardUI
                  card={card}
                  subtle={i % 2 === 1}
                  contentOpacity={contentOpacity}
                />
              </div>
            );
          })}
        </div>

        {/* CTA — always visible below the stack */}
        <CTABlock />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function BenefitCardUI({
  card,
  subtle,
  contentOpacity = 1,
}: {
  card: BenefitCard;
  subtle?: boolean;
  contentOpacity?: number;
}) {
  const { number, title, description, Icon } = card;

  return (
    <div
      className="w-full h-full rounded-[26px] border flex flex-col sm:flex-row items-stretch overflow-hidden relative"
      style={{
        background: subtle ? "#F4FAF7" : "#FFFFFF",
        borderColor: "rgba(4,184,103,0.14)",
        boxShadow: "0 4px 24px rgba(4,184,103,0.07)",
        minHeight: 300,
      }}
    >
      {/* Internal content wrapper — opacity controlled dynamically, hidden when contentOpacity === 0 */}
      <div
        className="w-full h-full flex flex-col sm:flex-row items-stretch"
        style={{
          opacity: contentOpacity,
          visibility: contentOpacity > 0.01 ? "visible" : "hidden",
          pointerEvents: contentOpacity > 0.5 ? "auto" : "none",
        }}
      >
        {/* Left column — number + icon */}
        <div className="flex flex-row sm:flex-col items-center sm:items-start justify-center gap-4 sm:gap-5 px-8 py-6 sm:py-8 sm:w-[180px] shrink-0">
          <span
            className="font-heading font-black leading-none text-[#04B867] select-none"
            style={{ fontSize: 56 }}
          >
            {number}
          </span>
          <div className="h-11 w-11 rounded-xl bg-[#04B867]/10 border border-[#04B867]/20 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-[#04B867]" />
          </div>
        </div>

        {/* Right column — label, title, description */}
        <div className="flex flex-col justify-center gap-2 px-8 pb-8 sm:py-8 sm:pl-2 sm:pr-10 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#04B867]/70 font-heading">
            BENEFIT {number}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0a1f14] font-heading leading-snug">
            {title}
          </h3>
          <p className="text-sm sm:text-[15px] text-[#0a1f14]/70 leading-relaxed font-sans max-w-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function CTABlock() {
  return (
    <div className="mt-6 flex flex-col items-center gap-1.5 shrink-0">
      <Link
        href="/booking"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#04B867] px-8 text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all font-heading"
      >
        Schedule Your Scoping Consultation
        <ArrowRight className="h-4 w-4" />
      </Link>
      <span className="text-[11px] text-muted font-medium font-sans">
        * Free operational audit mapping included
      </span>
    </div>
  );
}
