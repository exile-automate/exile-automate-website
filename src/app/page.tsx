"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
  BarChart,
  Bot,
  Database,
  Search,
  CheckCircle2,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { TRUSTED_CLIENTS, SERVICES, TEAM_MEMBERS } from "@/utils/mockData";
import PixelLogoCanvas from "@/components/PixelLogoCanvas";
import StackedServices from "@/components/StackedServices";

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
    <div className="relative w-full overflow-x-clip bg-background">
      
      {/* 1. Full-Bleed Green Hero Section */}
      <section 
        ref={heroRef}
        className="relative w-full bg-primary text-white py-16 px-6 sm:px-8 lg:py-24 text-center lg:text-left overflow-hidden"
      >
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-center lg:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Exile Automate Pvt. Ltd.
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1] font-heading">
              Automate. <br className="hidden sm:inline" />
              Accelerate. <br className="hidden sm:inline" />
              <span className="relative inline-block px-3 py-1 -mx-3 -my-1">
                <span ref={elevateRef} className="relative z-10 text-emerald-100 font-black">
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
                    stroke="rgba(255, 255, 255, 0.85)"
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
            
            <p className="text-base text-white/90 sm:text-lg max-w-2xl leading-relaxed font-sans font-medium">
              We don&apos;t just build tools. We create freedom.
            </p>
            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed -mt-2">
              Empowering business owners to break free from manual, repetitive tasks. We deploy custom workflows, conversational voice bots, and secure database connections to accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto z-10">
              <div className="flex flex-col items-center sm:items-start gap-1.5 w-full sm:w-auto">
                <Link
                  href="/booking"
                  className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-primary shadow-lg shadow-black/5 transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] font-heading"
                >
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-[10px] text-emerald-100 font-medium font-sans pl-1">
                  No commitment, 15-min call
                </span>
              </div>
              
              <Link
                href="/services"
                className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white text-white bg-transparent px-8 text-sm font-bold transition-all hover:bg-white/10 font-heading self-start"
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

      {/* 2. Trusted Clients Strip (White Background for breathing room) */}
      <section className="border-y border-card-border bg-white py-8 overflow-hidden relative z-10">
        <div className="mx-auto max-w-7xl px-6 text-center mb-4 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 font-heading">
            TRUSTED BY
          </p>
        </div>
        
        <div className="relative w-full flex items-center overflow-hidden py-1">
          <div className="marquee-track flex items-center whitespace-nowrap w-max hover:[animation-play-state:paused]">
            {[...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS].map((client, index) => (
              <div
                key={index}
                style={{ margin: "0 48px", display: "flex", alignItems: "center" }}
              >
                <Image
                  src={client.logoPath}
                  alt={client.name}
                  height={48}
                  width={120}
                  style={{ objectFit: "contain" }}
                  onError={() => console.log("Failed to load logo image:", client.logoPath)}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic Wave Divider Transition Down (From White marquee down to Off-white Services section) */}
      <div className="organic-divider bg-white">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-[#f5f5f0]">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>

      {/* 3. Scroll-Driven Stacked Cards Services Section */}
      <StackedServices />

      {/* Organic Wave Divider Transition Up (From Off-white services up to White benefits section) */}
      <div className="w-full overflow-hidden leading-none bg-[#f5f5f0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-white fill-current"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* 4. White "Why Choose AI Implementation" Bento Grid Section */}
      <section className="bg-white mx-auto max-w-7xl px-6 py-12 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-2.5">
            <span className="h-px w-6 bg-[#04B867]/40" />
            WHY CHOOSE US
            <span className="h-px w-6 bg-[#04B867]/40" />
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-foreground">
            Why Choose AI Implementation?
          </h2>
        </div>

        {/* Asymmetric Bento Grid (2 Columns on md/lg, compact 6-card layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          
          {/* Row 1: Card 1 (Wide ~60% - Dark) + Card 2 (Narrow ~40% - Green) */}
          <div className="lg:col-span-7 bg-[#0a1f14] rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3.5 shrink-0">
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5 tracking-tight">
                Eliminate Human Limitation
              </h3>
              <p className="text-sm text-gray-200 font-sans leading-relaxed">
                No more missed opportunities or guest frustration due to wait times.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#04B867] rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-3.5 shrink-0">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5 tracking-tight">
                Radical Cost Efficiency
              </h3>
              <p className="text-sm text-white/95 font-sans leading-relaxed">
                Significantly save on labor costs while increasing output.
              </p>
            </div>
          </div>

          {/* Row 2: Card 3 (Narrow ~40% - Green) + Card 4 (Wide ~60% - Dark) */}
          <div className="lg:col-span-5 bg-[#04B867] rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-3.5 shrink-0">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5 tracking-tight">
                Infinite Scalability
              </h3>
              <p className="text-sm text-white/95 font-sans leading-relaxed">
                Scale your operations to peak hours and beyond without hiring more staff.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0a1f14] rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3.5 shrink-0">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5 tracking-tight">
                Consistent Excellence
              </h3>
              <p className="text-sm text-gray-200 font-sans leading-relaxed">
                Deliver a high-quality, standardized experience to every client, every time.
              </p>
            </div>
          </div>

          {/* Row 3: Card 5 (Wide ~60% - Dark) + Card 6 (Narrow ~40% - Green) */}
          <div className="lg:col-span-7 bg-[#0a1f14] rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3.5 shrink-0">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5 tracking-tight">
                24/7/365 Connectivity
              </h3>
              <p className="text-sm text-gray-200 font-sans leading-relaxed">
                Your business stays &quot;awake&quot; and responsive even when your team is off-duty.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#04B867] rounded-xl p-5 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-3.5 shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5 tracking-tight">
                Purpose Over Product
              </h3>
              <p className="text-sm text-white/95 font-sans leading-relaxed">
                This isn&apos;t just business for us. It&apos;s about restoring time, peace, and possibility.
              </p>
            </div>
          </div>

        </div>

        {/* CTA Below Grid */}
        <div className="mt-8 flex flex-col items-center gap-1.5">
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

      </section>

      {/* Organic Wave Divider Transition Down (From White benefits down to Green Team section) */}
      <div className="organic-divider bg-white">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-primary">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* 5. White "The team behind Exile Automate" Section */}
      <section className="bg-white mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#04B867] font-heading flex items-center gap-3">
            <span className="h-px w-8 bg-[#04B867]/40" />
            WHO&apos;S BEHIND IT
            <span className="h-px w-8 bg-[#04B867]/40" />
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-heading text-foreground">
            The team behind Exile Automate.
          </h2>
        </div>

        {/* Founders Grid (2 Columns, alternating background panels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map((founder, idx) => {
            const isGreenBg = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group shadow-lg transition-all duration-300 min-h-[480px] ${
                  isGreenBg ? "bg-[#04B867] text-white" : "bg-[#f5f5f5] text-foreground"
                }`}
              >
                {/* Top Bar: Role Label & Index */}
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-widest ${
                      isGreenBg ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {founder.role}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isGreenBg ? "text-white/60" : "text-gray-400"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Founder Photo / Placeholder Area (Bottom-Anchored Cutout Look) */}
                <div className="relative w-full flex-1 flex items-end justify-center pt-8 z-10">
                  {/* Photo Placeholder Card */}
                  <div
                    className={`relative w-full max-w-[280px] sm:max-w-[320px] h-[340px] sm:h-[380px] rounded-2xl flex flex-col items-center justify-center border-2 border-[#04B867] shadow-xl transition-all duration-300 filter drop-shadow-[0_0_4px_#04B867] group-hover:drop-shadow-[0_0_12px_#04B867] ${
                      isGreenBg ? "bg-[#0a1f14]" : "bg-white"
                    }`}
                  >
                    {/* Person Initials Placeholder */}
                    <div
                      className={`h-24 w-24 rounded-full flex items-center justify-center font-extrabold text-3xl font-heading shadow-md mb-4 border-2 border-[#04B867] ${
                        isGreenBg ? "bg-white/10 text-white" : "bg-emerald-50 text-[#04B867]"
                      }`}
                    >
                      {founder.initials}
                    </div>

                    <span className={`text-xs font-mono font-bold tracking-widest ${isGreenBg ? "text-emerald-400" : "text-gray-400"}`}>
                      FOUNDER PHOTO
                    </span>

                    {/* Overlaid Name Tag Badge at Bottom Center */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-full shadow-xl border border-gray-100 flex items-center gap-3 transition-all duration-200 group-hover:scale-105 z-20">
                      <span className="font-extrabold text-sm sm:text-base text-gray-900 font-heading group-hover:text-[#04B867] transition-colors duration-200 whitespace-nowrap">
                        {founder.name}
                      </span>
                      <div className="flex items-center gap-1.5 border-l border-gray-200 pl-3 shrink-0">
                        <a
                          href="#"
                          className="h-7 w-7 rounded-md bg-[#1c2721] text-white flex items-center justify-center hover:bg-[#04B867] transition-colors"
                          aria-label="LinkedIn"
                          onClick={(e) => e.preventDefault()}
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="h-7 w-7 rounded-md bg-[#1c2721] text-white flex items-center justify-center hover:bg-[#04B867] transition-colors"
                          aria-label="Instagram"
                          onClick={(e) => e.preventDefault()}
                        >
                          <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Spacer for Badge */}
                <div className="h-4" />
              </div>
            );
          })}
        </div>

      </section>

      {/* 6. Full-Bleed Green CTA Section (Flowing into the green footer) */}
      <section className="bg-primary text-white py-16 px-6 sm:px-8 border-t border-white/10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden bg-white/5">
          
          <div className="flex flex-col gap-4 max-w-xl text-center md:text-left z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-heading">
              Ready to Reclaim Your Time?
            </h2>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans">
              Schedule a scoping consultation call today. We will map your operational data, review PMS configurations, and draft your custom deployment blueprints.
            </p>
          </div>
          <div className="z-10 shrink-0 w-full md:w-auto flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/booking"
              className="flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-primary shadow-md hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-heading"
            >
              <Calendar className="h-4 w-4" />
              Schedule Call
            </Link>
            <span className="text-[10px] text-white/85 font-medium font-sans md:pl-2">
              Free 15-min call • No commitment
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
