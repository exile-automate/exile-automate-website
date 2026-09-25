"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { TRUSTED_CLIENTS } from "@/utils/mockData";
import PixelLogoCanvas from "@/components/PixelLogoCanvas";
import StackedServices from "@/components/StackedServices";
import WhyChooseStack from "@/components/WhyChooseStack";
import HowWeWorkTimeline from "@/components/HowWeWorkTimeline";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const elevateRef = useRef<HTMLSpanElement | null>(null);
  
  const [showHighlight, setShowHighlight] = useState(false);
  const [cursorPos, setCursorPos] = useState({
    x: 120,
    y: 50,
    active: false,
    clicked: false,
    visible: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let timerClick: NodeJS.Timeout;
    let timerRelease: NodeJS.Timeout;
    let timerFade: NodeJS.Timeout;

    const hero = heroRef.current;
    const target = elevateRef.current;
    if (!hero || !target) return;

    // Start position near the top-left badge
    const startX = 120;
    const startY = 50;
    setCursorPos({ x: startX, y: startY, active: false, clicked: false, visible: true });

    const timerInit = setTimeout(() => {
      const heroRect = hero.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetX = targetRect.left - heroRect.left + targetRect.width * 0.75;
      const targetY = targetRect.top - heroRect.top + targetRect.height * 0.75;

      // Smoothly animate the cursor to the target location
      setCursorPos(prev => ({ ...prev, x: targetX, y: targetY, active: true }));

      // Click animation and highlight draw-in (after 1.2s travel time)
      timerClick = setTimeout(() => {
        setCursorPos(prev => ({ ...prev, clicked: true }));
        setShowHighlight(true);
      }, 1200);

      // Release click visual scale
      timerRelease = setTimeout(() => {
        setCursorPos(prev => ({ ...prev, clicked: false }));
      }, 1400);

      // Fade out cursor after 0.8s hold time (arrives at 1.2s + 0.8s = 2.0s)
      timerFade = setTimeout(() => {
        setCursorPos(prev => ({ ...prev, visible: false }));
      }, 2000);
    }, 200);

    return () => {
      clearTimeout(timerInit);
      clearTimeout(timerClick);
      clearTimeout(timerRelease);
      clearTimeout(timerFade);
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-clip bg-transparent">
      
      {/* 1. Full-Bleed Hero Section */}
      <section 
        ref={heroRef}
        className="relative w-full bg-transparent text-[#0a1f14] py-16 px-6 sm:px-8 lg:py-24 text-center lg:text-left overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-center lg:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#04B867]/30 bg-white/80 backdrop-blur-xs px-4 py-1.5 text-xs font-bold text-[#0a1f14] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Exile Automate Pvt. Ltd.
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0a1f14] sm:text-5xl md:text-6xl leading-[1.1] font-heading">
              Automate. <br className="hidden sm:inline" />
              Accelerate. <br className="hidden sm:inline" />
              <span className="relative inline-block px-3 py-1 -mx-3 -my-1">
                <span ref={elevateRef} className="relative z-10 text-primary font-black">
                  Elevate.
                </span>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 120 40"
                  preserveAspectRatio="none"
                >
                  <rect
                    x="2"
                    y="2"
                    width="116"
                    height="36"
                    rx="6"
                    fill="none"
                    stroke="#04B867"
                    strokeWidth="2"
                    strokeDasharray="320"
                    strokeDashoffset={showHighlight ? "0" : "320"}
                    style={{
                      transition: "stroke-dashoffset 0.8s ease-out",
                    }}
                  />
                </svg>
              </span>
            </h1>
            
            <p className="text-base text-[#0a1f14] sm:text-lg max-w-2xl leading-relaxed font-sans font-medium">
              We don&apos;t just build tools. We create freedom.
            </p>
            <p className="text-sm sm:text-base text-[#0a1f14]/70 max-w-xl leading-relaxed -mt-2">
              Empowering business owners to break free from manual, repetitive tasks. We deploy custom workflows, conversational voice bots, and secure database connections to accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto z-10">
              <div className="flex flex-col items-center sm:items-start gap-1.5 w-full sm:w-auto">
                <Link
                  href="/booking"
                  className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] font-heading"
                >
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-[11px] text-[#0a1f14]/60 font-medium font-sans pl-1">
                  No commitment, 15-min call
                </span>
              </div>
              
              <Link
                href="/services"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#0a1f14]/15 hover:border-primary/50 text-[#0a1f14] hover:text-primary bg-white/60 hover:bg-white/90 backdrop-blur-xs px-8 text-sm font-bold transition-all font-heading self-start shadow-xs"
              >
                See Our Offerings
              </Link>
            </div>
          </div>

          {/* Right Column: Upgraded Interactive Pixel Logo Card */}
          <div className="lg:col-span-5 flex justify-center items-center z-10 w-full">
            <PixelLogoCanvas />
          </div>

        </div>

        {/* Animated Onboarding Fake Cursor Overlay */}
        {cursorPos.visible && (
          <div
            className="absolute pointer-events-none z-50 transition-opacity"
            style={{
              left: 0,
              top: 0,
              opacity: cursorPos.visible ? 1 : 0,
              transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) ${cursorPos.clicked ? "scale(0.85)" : "scale(1)"}`,
              transition: cursorPos.active
                ? "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease-out"
                : "opacity 0.5s ease-out",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
            >
              <path
                d="M3 3V21L8.5 15.5L13.5 24.5L16.5 23L11.5 14L19 14L3 3Z"
                fill="white"
                stroke="#04B867"
                strokeWidth="2"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
        )}
      </section>

      {/* 2. Trusted Clients Strip */}
      <section className="border-y border-card-border bg-transparent py-8 sm:py-10 overflow-hidden relative z-10">
        <div className="mx-auto max-w-7xl px-6 text-center mb-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 font-heading">
            TRUSTED BY
          </p>
        </div>
        
        <div className="relative w-full flex items-center overflow-hidden py-3 select-none">
          <div className="marquee-track-right flex items-center whitespace-nowrap w-max">
            {[...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS].map((client, index) => (
              <div
                key={index}
                className="px-8 sm:px-12 lg:px-14 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <img
                  src={client.logoPath}
                  alt={client.name}
                  className="h-12 sm:h-14 lg:h-[64px] w-auto max-w-none object-contain hover:scale-[1.04] transition-transform duration-300 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Scroll-Driven Stacked Cards Services Section */}
      <StackedServices />

      {/* 4. Scroll-Driven "Why Choose AI Implementation" Stacking Cards */}
      <WhyChooseStack />

      {/* 5. Scroll-Driven "How We Work" Process Timeline Section */}
      <HowWeWorkTimeline />

    </div>
  );
}
