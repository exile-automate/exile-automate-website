"use client";

import { useRef, useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ProcessStage {
  number: string;
  category: string;
  title: string;
  description: string;
}

const STAGES: ProcessStage[] = [
  {
    number: "01",
    category: "DISCOVER",
    title: "Understand the Operation",
    description:
      "We begin by understanding how the business actually works — its workflows, repetitive tasks, manual handoffs, systems, data and operational bottlenecks.",
  },
  {
    number: "02",
    category: "IDENTIFY",
    title: "Find the Right Opportunities",
    description:
      "We identify where automation and AI can create meaningful operational value, reduce repetitive work and remove unnecessary friction.",
  },
  {
    number: "03",
    category: "DESIGN",
    title: "Build the Blueprint",
    description:
      "We design the right workflow, integrations, data connections and automation architecture before implementation begins.",
  },
  {
    number: "04",
    category: "IMPLEMENT",
    title: "Build & Integrate",
    description:
      "We build and connect the automation systems, AI tools and operational workflows required to make the solution work reliably inside the business.",
  },
  {
    number: "05",
    category: "OPTIMIZE",
    title: "Improve & Scale",
    description:
      "We monitor performance, refine the system and expand automation where it creates additional operational value.",
  },
];

const STAGE_COUNT = STAGES.length; // 5
const SECTION_VH = 350; // 350vh generous vertical scroll distance for phased animation

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HowWeWorkTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  /* Detect reduced motion & mobile once on mount */
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /* Calculate exact total scroll distance for horizontal translation */
  useEffect(() => {
    if (isMobile) return;

    const calculateMaxTranslate = () => {
      if (trackRef.current) {
        const trackScrollWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = Math.max(0, trackScrollWidth - viewportWidth + 140);
        setMaxTranslateX(maxScroll);
      }
    };

    calculateMaxTranslate();
    window.addEventListener("resize", calculateMaxTranslate);
    return () => window.removeEventListener("resize", calculateMaxTranslate);
  }, [isMobile]);

  /* Continuous scroll progress listener */
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

  /* ---- Mobile / Reduced Motion: Clean Vertical Timeline ---- */
  if (isMobile || prefersReducedMotion) {
    return (
      <section className="bg-transparent relative z-10 py-16 px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            HOW WE WORK
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-foreground">
            From Strategy to Execution.
          </h2>
          <p className="text-sm sm:text-base text-[#0a1f14]/70 max-w-xl leading-relaxed mt-1 font-sans">
            A practical process for turning operational bottlenecks into reliable automated systems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-xl mx-auto pl-6 border-l-2 border-dashed border-[#04B867]/40 flex flex-col gap-10">
          {STAGES.map((stage) => (
            <div key={stage.number} className="relative flex flex-col gap-2">
              {/* Vertical Dashed Marker */}
              <div className="absolute -left-[31px] top-1.5 h-6 w-0.5 border-l-2 border-dashed border-[#04B867]" />
              
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-2xl text-[#04B867]">
                  {stage.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#04B867]/80 font-heading">
                  {stage.category}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#0a1f14] font-heading">
                {stage.title}
              </h3>
              <p className="text-sm text-[#0a1f14]/75 leading-relaxed font-sans">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---- Desktop: Phased Scroll Animation & Horizontal Journey ---- */

  /*
    Animation Sub-Phases:
    0.00 - 0.05: Phase 0 - Header + glowing dot only
    0.05 - 0.15: Phase 1 - Dot expands into initial line segment (24px -> 260px)
    0.15 - 0.25: Phase 2 - Stage 01 content fades in (opacity 0 -> 1)
    0.25 - 1.00: Phase 3 - Horizontal translation journey (translateX 0 -> maxTranslateX)
  */

  // 1. Initial Dot / Line segment expansion calculation (0.05 -> 0.15)
  let initialLineWidth = 24; // 24px initial dot size
  if (progress > 0.05 && progress <= 0.15) {
    const t1 = (progress - 0.05) / 0.10;
    initialLineWidth = 24 + t1 * 236; // 24px -> 260px
  } else if (progress > 0.15) {
    initialLineWidth = 260;
  }

  // 2. Stage 01 Content Opacity calculation (0.15 -> 0.25)
  let stage1Opacity = 0;
  if (progress > 0.15 && progress <= 0.25) {
    stage1Opacity = (progress - 0.15) / 0.10;
  } else if (progress > 0.25) {
    stage1Opacity = 1;
  }

  // 3. Horizontal TranslateX calculation (0.25 -> 1.00)
  let journeyProgress = 0;
  if (progress > 0.25) {
    journeyProgress = Math.min((progress - 0.25) / 0.75, 1);
  }
  const translateX = journeyProgress * maxTranslateX;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${SECTION_VH}vh`,
      }}
      className="bg-transparent relative z-10"
    >
      {/* Sticky Viewport Container — Fixed Viewport Window */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className="flex flex-col justify-between py-10 overflow-hidden"
      >
        {/* Fixed Top Section Header — Remains Stable & Static */}
        <div className="text-center max-w-3xl mx-auto px-6 flex flex-col items-center gap-2 shrink-0 z-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            HOW WE WORK
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-foreground">
            From Strategy to Execution.
          </h2>
          <p className="text-sm sm:text-base text-[#0a1f14]/70 max-w-xl leading-relaxed font-sans">
            A practical process for turning operational bottlenecks into reliable automated systems.
          </p>
        </div>

        {/* Process Animation Area */}
        <div className="relative w-full flex items-center flex-1 overflow-hidden my-2">
          
          {/* PHASE 0 & 1: Initial Glowing Dot / Expanding Line (Visible before journey starts) */}
          {journeyProgress === 0 && (
            <div className="absolute left-[8vw] top-[152px] z-30 pointer-events-none">
              <div
                style={{
                  width: `${initialLineWidth}px`,
                  height: "22px",
                }}
                className="bg-[#04B867] rounded-full shadow-[0_0_20px_rgba(4,184,103,0.35)] transition-all duration-75 ease-out"
              />
            </div>
          )}

          {/* PHASE 3: Horizontal Process Track (Translates left as journeyProgress > 0) */}
          <div
            ref={trackRef}
            style={{
              transform: `translate3d(${-translateX}px, 0, 0)`,
              willChange: "transform",
              opacity: progress > 0.05 ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
            className="flex items-center pl-[8vw] pr-[15vw] w-max relative"
          >
            {/* Main Stage Grid Container */}
            <div className="relative flex items-center gap-32 lg:gap-44">
              
              {/* Solid Exile-Green Progress Bar — ONLY ONE VISIBLE LINE (No pale background rail underneath) */}
              <div className="absolute left-6 right-6 top-[152px] h-[22px] z-0 pointer-events-none">
                <div
                  style={{
                    width: `${journeyProgress * 100}%`,
                  }}
                  className="h-full bg-[#04B867] rounded-full shadow-[0_0_20px_rgba(4,184,103,0.35)]"
                />
              </div>

              {STAGES.map((stage, i) => {
                // Target progress point for stage i (0.00, 0.25, 0.50, 0.75, 1.00)
                const stageTargetProgress = i / (STAGE_COUNT - 1);
                const isPassed = journeyProgress >= stageTargetProgress - 0.02;

                // BUG 2 FIX: Future stages and markers remain 100% hidden (opacity 0, visibility hidden)
                // until journeyProgress approaches their specific threshold!
                let isVisible = false;
                let stageOpacity = 0;
                let stageTranslateY = 16;
                let markerOpacity = 0;

                if (i === 0) {
                  // Stage 01 reveals in Phase 2
                  if (journeyProgress > 0) {
                    isVisible = true;
                    stageOpacity = 1;
                    stageTranslateY = 0;
                    markerOpacity = 1;
                  } else {
                    isVisible = stage1Opacity > 0.01;
                    stageOpacity = stage1Opacity;
                    stageTranslateY = (1 - stage1Opacity) * 16;
                    markerOpacity = stage1Opacity;
                  }
                } else {
                  // Stages 02-05: Reveal strictly when green line approaches stage TargetProgress
                  const startReveal = stageTargetProgress - 0.10;
                  const endReveal = stageTargetProgress;

                  if (journeyProgress >= startReveal) {
                    isVisible = true;
                    if (journeyProgress >= endReveal) {
                      stageOpacity = 1;
                      stageTranslateY = 0;
                      markerOpacity = 1;
                    } else {
                      const t = (journeyProgress - startReveal) / (endReveal - startReveal);
                      stageOpacity = t;
                      stageTranslateY = (1 - t) * 16;
                      markerOpacity = t;
                    }
                  } else {
                    isVisible = false;
                    stageOpacity = 0;
                    stageTranslateY = 16;
                    markerOpacity = 0;
                  }
                }

                return (
                  <div
                    key={stage.number}
                    style={{
                      width: "max(480px, 46vw)",
                      maxWidth: 640,
                      opacity: stageOpacity,
                      transform: `translateY(${stageTranslateY}px)`,
                      visibility: isVisible ? "visible" : "hidden",
                      transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                    }}
                    className="relative z-10 flex flex-col shrink-0"
                  >
                    {/* Top Content: Stage Number + Category + Title */}
                    <div className="flex flex-col gap-1.5 mb-4">
                      <span
                        className={`font-heading font-black text-5xl lg:text-6xl transition-colors duration-200 select-none ${
                          isPassed ? "text-[#04B867]" : "text-[#04B867]/35"
                        }`}
                      >
                        {stage.number}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#04B867] font-heading mt-1">
                        {stage.category}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0a1f14] font-heading leading-snug">
                        {stage.title}
                      </h3>
                    </div>

                    {/* Timeline Marker: Vertical Dashed Line (Intersecting the 22px rail) */}
                    <div className="relative flex items-center justify-start my-1 h-[22px]">
                      <div
                        style={{
                          height: 64,
                          width: 2,
                          borderLeft: isPassed
                            ? "2.5px dashed #04B867"
                            : "2.5px dashed rgba(4, 184, 103, 0.35)",
                          boxShadow: isPassed ? "-2px 0 10px rgba(4, 184, 103, 0.5)" : "none",
                          opacity: markerOpacity,
                        }}
                        className="transition-all duration-200"
                      />
                    </div>

                    {/* Bottom Content: Description */}
                    <div className="mt-4 max-w-lg">
                      <p className="text-base lg:text-lg text-[#0a1f14]/80 leading-relaxed font-sans font-medium">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="text-center shrink-0 z-20">
          <span className="text-[11px] font-semibold text-[#0a1f14]/40 font-heading uppercase tracking-widest">
            Scroll down to reveal process stages
          </span>
        </div>
      </div>
    </section>
  );
}
