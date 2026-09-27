"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

interface Benefit {
  number: string;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    number: "01",
    title: "Eliminate Human Limitation",
    description:
      "No more missed opportunities or guest frustration due to wait times.",
  },
  {
    number: "02",
    title: "Radical Cost Efficiency",
    description:
      "Significantly save on labor costs while increasing output.",
  },
  {
    number: "03",
    title: "Infinite Scalability",
    description:
      "Scale your operations to peak hours and beyond without hiring more staff.",
  },
  {
    number: "04",
    title: "Consistent Excellence",
    description:
      "Deliver a high-quality, standardized experience to every client, every time.",
  },
  {
    number: "05",
    title: "24/7/365 Connectivity",
    description:
      'Your business stays "awake" and responsive even when your team is off-duty.',
  },
  {
    number: "06",
    title: "Purpose Over Product",
    description:
      "This isn’t just business for us. It’s about restoring time, peace, and possibility.",
  },
];

const BENEFIT_COUNT = BENEFITS.length; // 6
const SECTION_VH = 280; // 280vh generous scroll distance for 6 nodes

export default function WhyChooseStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect reduced motion & mobile */
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /* Scroll progress listener */
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (section) {
            const rect = section.getBoundingClientRect();
            if (isMobile) {
              // Mobile scroll progress relative to viewport center
              const totalH = rect.height;
              const scrolled = window.innerHeight * 0.65 - rect.top;
              const p = Math.min(Math.max(scrolled / totalH, 0), 1);
              setProgress(p);
            } else {
              // Desktop pinned sticky section progress
              const pinDistance = rect.height - window.innerHeight;
              if (pinDistance > 0) {
                const scrolled = -rect.top;
                const p = Math.min(Math.max(scrolled / pinDistance, 0), 1);
                setProgress(p);
              }
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

  /* ---- Mobile / Reduced Motion View (< 768px) ---- */
  if (isMobile || prefersReducedMotion) {
    const mobileLineHeightPercent = Math.min(progress * 100, 100);

    return (
      <section
        ref={sectionRef}
        className="bg-transparent relative z-10 py-16 px-6 sm:px-8 overflow-x-hidden"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            WHY CHOOSE US
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-[#0a1f14]">
            Why Choose AI Implementation?
          </h2>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="relative max-w-lg mx-auto pl-10 pr-2">
          {/* Base Inactive Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[#04B867]/20 rounded-full" />

          {/* Active Growing Green Line */}
          <div
            style={{ height: `${mobileLineHeightPercent}%` }}
            className="absolute left-[19px] top-4 w-0.5 bg-[#04B867] shadow-[0_0_10px_rgba(4,184,103,0.5)] rounded-full transition-all duration-75 ease-out"
          />

          <div className="flex flex-col gap-12">
            {BENEFITS.map((item, i) => {
              const targetP = i / (BENEFIT_COUNT - 1);
              const isPassed = progress >= targetP - 0.05;

              let itemOpacity = 0;
              let itemTranslateY = 16;
              if (progress >= targetP - 0.1) {
                const t = Math.min((progress - (targetP - 0.1)) / 0.1, 1);
                itemOpacity = t;
                itemTranslateY = (1 - t) * 16;
              }

              return (
                <div key={item.number} className="relative flex flex-col gap-1.5">
                  {/* Circular Node Marker */}
                  <div
                    className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                      isPassed
                        ? "border-[#04B867] bg-[#04B867] text-white shadow-[0_0_12px_rgba(4,184,103,0.4)] scale-110"
                        : "border-[#04B867]/30 bg-white text-[#0a1f14]/40"
                    }`}
                  >
                    {isPassed ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <span className="text-[9px] font-bold font-mono">
                        {item.number}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      opacity: itemOpacity,
                      transform: `translateY(${itemTranslateY}px)`,
                      transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                    }}
                    className="flex flex-col gap-1 text-left"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#04B867] font-mono">
                      BENEFIT {item.number}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#0a1f14] font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#0a1f14]/75 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Block */}
        <CTABlock />
      </section>
    );
  }

  /* ---- Desktop Vertical Timeline View (≥ 768px) ---- */
  const nodeGapPx = 180; // Vertical spacing between nodes
  const totalTrackHeight = (BENEFIT_COUNT - 1) * nodeGapPx; // 900px total length
  const activeLineHeightPx = progress * totalTrackHeight;

  // Track vertical translation so current active node stays near screen center
  const maxTrackTranslateY = totalTrackHeight - 260;
  const trackTranslateY = progress * maxTrackTranslateY;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${SECTION_VH}vh`,
      }}
      className="bg-transparent relative z-10"
    >
      {/* Sticky Viewport Container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className="flex flex-col justify-between py-10 overflow-hidden"
      >
        {/* Fixed Top Section Header */}
        <div className="text-center max-w-3xl mx-auto px-6 flex flex-col items-center gap-2 shrink-0 z-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            WHY CHOOSE US
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-[#0a1f14]">
            Why Choose AI Implementation?
          </h2>
        </div>

        {/* Central Timeline Animation Stage */}
        <div className="relative w-full flex-1 max-w-5xl mx-auto overflow-hidden my-4 flex items-center justify-center">
          <div
            style={{
              transform: `translate3d(0, ${-trackTranslateY}px, 0)`,
              willChange: "transform",
            }}
            className="relative w-full transition-transform duration-75 ease-out flex flex-col items-center"
          >
            {/* Central Base Line (Inactive) */}
            <div
              style={{ height: `${totalTrackHeight}px` }}
              className="absolute left-1/2 -translate-x-1/2 top-4 w-0.5 bg-[#04B867]/20 rounded-full z-0"
            />

            {/* Central Active Green Progress Line */}
            <div
              style={{ height: `${activeLineHeightPx}px` }}
              className="absolute left-1/2 -translate-x-1/2 top-4 w-0.5 bg-[#04B867] shadow-[0_0_14px_rgba(4,184,103,0.5)] rounded-full z-0 transition-all duration-75 ease-out"
            />

            {/* Nodes and Alternating Content Items */}
            <div className="relative w-full flex flex-col items-center" style={{ gap: `${nodeGapPx - 32}px` }}>
              {BENEFITS.map((item, i) => {
                const targetP = i / (BENEFIT_COUNT - 1);
                const isPassed = progress >= targetP - 0.03;
                const isRightSide = i % 2 === 0; // 01 right, 02 left, 03 right, 04 left, 05 right, 06 left

                let opacity = 0;
                let translateY = 20;

                const startReveal = Math.max(targetP - 0.12, 0);
                const endReveal = targetP;

                if (progress >= startReveal) {
                  if (progress >= endReveal) {
                    opacity = 1;
                    translateY = 0;
                  } else {
                    const t = (progress - startReveal) / (endReveal - startReveal);
                    opacity = t;
                    translateY = (1 - t) * 20;
                  }
                }

                return (
                  <div
                    key={item.number}
                    className="relative w-full flex items-center justify-center min-h-[44px]"
                  >
                    {/* Central Node Circle */}
                    <div
                      className={`relative z-20 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isPassed
                          ? "border-[#04B867] bg-[#04B867] text-white shadow-[0_0_16px_rgba(4,184,103,0.5)] scale-110"
                          : "border-[#04B867]/30 bg-white text-[#0a1f14]/40"
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span>{item.number}</span>
                      )}
                    </div>

                    {/* Alternating Content Box */}
                    <div
                      style={{
                        opacity,
                        transform: `translateY(${translateY}px)`,
                        visibility: opacity > 0.01 ? "visible" : "hidden",
                        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                      }}
                      className={`absolute top-1/2 -translate-y-1/2 w-[42%] flex flex-col ${
                        isRightSide
                          ? "left-[54%] text-left items-start pr-6"
                          : "right-[54%] text-right items-end pl-6"
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-mono mb-1">
                        BENEFIT {item.number}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-extrabold text-[#0a1f14] font-heading leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm lg:text-base text-[#0a1f14]/75 leading-relaxed font-sans max-w-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA Block */}
        <CTABlock />
      </div>
    </section>
  );
}

function CTABlock() {
  return (
    <div className="mt-4 flex flex-col items-center gap-1.5 shrink-0 z-20">
      <Link
        href="/booking"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#04B867] px-8 text-sm font-bold text-white shadow-md shadow-[#04B867]/25 hover:bg-[#039e58] hover:scale-[1.02] active:scale-[0.98] transition-all font-heading"
      >
        Schedule Your Scoping Consultation
        <ArrowRight className="h-4 w-4" />
      </Link>
      <span className="text-[11px] text-[#0a1f14]/60 font-medium font-sans">
        * Free operational audit mapping included
      </span>
    </div>
  );
}
