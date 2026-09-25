"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Social Icons                                                      */
/* ------------------------------------------------------------------ */

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Founder Data                                                       */
/* ------------------------------------------------------------------ */

interface Founder {
  name: string;
  role: string;
  roleBadge: string;
  imagePath: string;
  initials: string;
  bio: string;
  instagramUrl: string;
  linkedInUrl?: string; // Optional: Ishan has Instagram ONLY
}

const FOUNDERS: Founder[] = [
  {
    name: "Fahim Mhd Elite",
    role: "Founder & CEO",
    roleBadge: "FOUNDER • CEO",
    imagePath: "/images/team/fahim.png",
    initials: "FE",
    bio: "Fahim leads Exile Automate with a vision to eliminate human limitations in daily business operations. With deep expertise in automated architecture and strategic execution, he guides the team in building reliable systems that restore time and operational freedom for business owners.",
    instagramUrl: "https://www.instagram.com/fahimelite?igsi=eWRoMDl6Z2lva3Q3",
    linkedInUrl: "https://www.linkedin.com/in/fahim-elite-618349335/",
  },
  {
    name: "Ansam Adeeb Ishakh",
    role: "Co-Founder & COO",
    roleBadge: "CO-FOUNDER • COO",
    imagePath: "/images/team/ansam.png",
    initials: "AI",
    bio: "Ansam directs operational workflows and client deployment strategies at Exile Automate. He ensures that every automation pipeline, system connection, and business process is executed with consistent excellence and operational accuracy.",
    instagramUrl: "https://www.instagram.com/ansam_adeeb/",
    linkedInUrl: "https://www.linkedin.com/in/ansam-adeeb",
  },
  {
    name: "Ishan Mhd Elite",
    role: "Co-Founder & CTO",
    roleBadge: "CO-FOUNDER • CTO",
    imagePath: "/images/team/ishan.png",
    initials: "IE",
    bio: "Ishan oversees technical architecture, AI integrations, and infrastructure at Exile Automate. He engineers scalable bot architectures, secure database connectors, and custom workflow engines designed for maximum uptime and reliability.",
    instagramUrl: "https://www.instagram.com/ishanelite?igsi=eXNkZ3J2dnZrMDNx",
    // LinkedIn intentionally omitted for Ishan
  },
  {
    name: "Saleel Razack",
    role: "Co-Founder & CMO",
    roleBadge: "CO-FOUNDER • CMO",
    imagePath: "/images/team/saleel.png",
    initials: "SR",
    bio: "Saleel drives growth, brand positioning, and client acquisition at Exile Automate. He connects business owners with custom automation solutions that reduce labor costs, eliminate bottlenecks, and accelerate long-term growth.",
    instagramUrl:
      "https://www.instagram.com/saleelrazack?igsi=MTkycm51ZGFhcW11eA%3D%3D&utm_source=qr",
    linkedInUrl:
      "https://www.linkedin.com/in/saleel-razack-03a159277?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent py-8 sm:py-16">
      
      {/* 1. Spacious Editorial Hero Section */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 mb-20 sm:mb-28">
        <div className="flex flex-col items-start gap-4">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#04B867]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#04B867] font-heading">
              ABOUT EXILE
            </span>
            <span className="h-px w-8 bg-[#04B867]" />
          </div>

          {/* Large Editorial Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#0a1f14] font-heading leading-[1.06]">
            About Exile Automate
          </h1>

          {/* Supporting Statement */}
          <p className="mt-4 text-lg sm:text-2xl text-[#0a1f14]/75 max-w-3xl leading-relaxed font-sans font-medium">
            We empower business owners and operational leaders to break free from manual, repetitive tasks. By deploying custom automated workflows, conversational voice bots, and secure system connections, we restore time, peace, and scale.
          </p>

        </div>
      </section>

      {/* 2. Alternating Founder / Team Storytelling Section */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 flex flex-col gap-24 sm:gap-32">
        {FOUNDERS.map((founder, index) => {
          const isImageRightOnDesktop = index % 2 === 0;

          return (
            <div
              key={founder.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Desktop Left Column */}
              <div
                className={`lg:col-span-6 flex flex-col justify-center ${
                  isImageRightOnDesktop ? "order-2 lg:order-1" : "order-2 lg:order-2"
                }`}
              >
                <FounderBio founder={founder} />
              </div>

              {/* Desktop Right Column / Image Panel */}
              <div
                className={`lg:col-span-6 flex ${
                  isImageRightOnDesktop ? "order-1 lg:order-2" : "order-1 lg:order-1"
                }`}
              >
                <FounderImagePanel founder={founder} />
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 mt-24 sm:mt-32">
        <div className="rounded-3xl bg-[#04B867] text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-heading">
              Ready to automate your operations?
            </h2>
            <p className="text-white/90 text-sm leading-relaxed font-sans">
              Schedule a scoping consultation call with our team to map your workflows and deploy custom AI automation blueprints.
            </p>
          </div>

          <div className="z-10 shrink-0 w-full md:w-auto flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/booking"
              className="flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-[#04B867] shadow-md hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all font-heading"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-[11px] text-white/85 font-medium font-sans md:pl-2">
              Free 15-min call • No commitment
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FounderImagePanel({ founder }: { founder: Founder }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full rounded-3xl bg-[#04B867] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] shadow-2xl text-white group">
      
      {/* Top Controls Overlay: Role Badge (Left) & Compact Social Icons (Right) */}
      <div className="flex items-center justify-between w-full z-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase font-heading">
          <Sparkles className="h-3 w-3 text-white" />
          {founder.roleBadge}
        </div>

        {/* Compact Panel Social Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={founder.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${founder.name} on Instagram`}
            className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white hover:text-[#04B867] text-white transition-all flex items-center justify-center shadow-xs cursor-pointer"
            title={`${founder.name} on Instagram`}
          >
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
          {founder.linkedInUrl && (
            <a
              href={founder.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${founder.name} on LinkedIn`}
              className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white hover:text-[#04B867] text-white transition-all flex items-center justify-center shadow-xs cursor-pointer"
              title={`${founder.name} on LinkedIn`}
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Large Cutout Founder Portrait */}
      {!imageError ? (
        <img
          src={founder.imagePath}
          alt={founder.name}
          onError={() => setImageError(true)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[82%] sm:h-[88%] w-auto max-w-[92%] object-contain object-bottom pointer-events-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        /* Neutral Fallback Placeholder if file missing */
        <div className="my-auto z-10 w-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/30 rounded-2xl bg-white/10">
          <div className="h-20 w-20 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white font-bold text-2xl mb-3 font-heading shadow-inner">
            {founder.initials}
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/95 font-heading">
            PHOTO PLACEHOLDER
          </span>
          <span className="text-sm text-white/85 font-heading font-semibold mt-1">
            {founder.name}
          </span>
        </div>
      )}

      {/* Bottom Editorial Name Label Plate (Overlapping lower portrait, never covering face) */}
      <div className="z-20 self-start bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/40 flex flex-col gap-0.5 mt-auto">
        <h3 className="text-xl sm:text-2xl font-black text-[#0a1f14] font-heading tracking-tight leading-none">
          {founder.name}
        </h3>
        <span className="text-[10px] font-bold text-[#04B867] uppercase tracking-[0.2em] font-heading mt-0.5">
          {founder.role}
        </span>
      </div>

    </div>
  );
}

function FounderBio({ founder }: { founder: Founder }) {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Name & Role */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1f14] font-heading tracking-tight">
          {founder.name}
        </h2>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#04B867] font-heading">
          {founder.role}
        </span>
      </div>

      <div className="h-px w-12 bg-[#04B867]/30 my-2" />

      {/* Bio Description */}
      <p className="text-base sm:text-lg text-[#0a1f14]/75 leading-relaxed font-sans font-medium max-w-lg">
        {founder.bio}
      </p>

      {/* Social Links */}
      <div className="flex items-center gap-3 mt-4">
        {/* Instagram Icon */}
        <a
          href={founder.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${founder.name} on Instagram`}
          className="h-10 w-10 rounded-full border border-card-border hover:border-[#04B867] hover:bg-[#04B867]/10 hover:text-[#04B867] text-[#0a1f14]/70 transition-all flex items-center justify-center shadow-xs cursor-pointer"
          title={`${founder.name} on Instagram`}
        >
          <InstagramIcon className="h-4 w-4" />
        </a>

        {/* LinkedIn Icon (OMITTED for Ishan) */}
        {founder.linkedInUrl && (
          <a
            href={founder.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${founder.name} on LinkedIn`}
            className="h-10 w-10 rounded-full border border-card-border hover:border-[#04B867] hover:bg-[#04B867]/10 hover:text-[#04B867] text-[#0a1f14]/70 transition-all flex items-center justify-center shadow-xs cursor-pointer"
            title={`${founder.name} on LinkedIn`}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
