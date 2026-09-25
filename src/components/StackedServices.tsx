"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileSearch,
  PhoneCall,
  Zap,
  BarChart3,
  Bot,
  Database,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const SERVICES_DATA = [
  {
    id: "internal-automation-audits",
    serviceNum: "SERVICE 01",
    title: "Internal Automation Audits & Consultations",
    description:
      "We start by understanding you. Our process begins with an internal audit of your business operations, identifying the exact pain points, bottlenecks, and inefficiencies that slow you down.",
    bullets: [
      "Process mapping and friction identification",
      "Detailed custom software ROI reports",
    ],
    Icon: FileSearch,
  },
  {
    id: "ai-powered-voice-solutions",
    serviceNum: "SERVICE 02",
    title: "AI-Powered Voice Solutions",
    description:
      "Natural conversational voice assistants designed to manage front-desk calls, verify bookings, and route inquiries in real time.",
    bullets: [
      "Natural language phrasing with low-latency response",
      "Multilingual support in 15+ languages",
    ],
    Icon: PhoneCall,
  },
  {
    id: "smart-workflow-management",
    serviceNum: "SERVICE 03",
    title: "Smart Workflow Management",
    description:
      "Automating complex tasks from lead generation to booking and data entry. Bespoke triggers and automated connectors that sync information across apps.",
    bullets: [
      "Custom Zapier, Make & webhook workflows",
      "Lead scoring and database entries in real-time",
    ],
    Icon: Zap,
  },
  {
    id: "dashboard-analytics-automation",
    serviceNum: "SERVICE 04",
    title: "Dashboard & Analytics Automation",
    description:
      "Real-time performance tracking made effortless. Unified visualizations tracking call metrics, conversion rates, and workflow performance.",
    bullets: [
      "Unified performance metrics from all integrations",
      "Call transcript analysis and sentiment trends",
    ],
    Icon: BarChart3,
  },
  {
    id: "custom-bot-agent-development",
    serviceNum: "SERVICE 05",
    title: "Custom Bot & Agent Development",
    description:
      "AI tools tailored to your unique workflows. Tailored software agents trained on your specific guides to resolve customer questions and execute actions.",
    bullets: [
      "Context-aware agents trained on your guides",
      "WhatsApp & web chat multi-channel support",
    ],
    Icon: Bot,
  },
  {
    id: "pms-crm-api-integrations",
    serviceNum: "SERVICE 06",
    title: "PMS, CRM & API Integrations",
    description:
      "Sync all your systems for a seamless experience. Secure API connections bridging legacy database setups, customer records, and booking engines.",
    bullets: [
      "Real-time PMS & CRM database synchronization",
      "Custom API wrapper development for legacy setups",
    ],
    Icon: Database,
  },
];

const STEP_VH = 28; // Scroll distance in vh per card transition
const TOTAL_PIN_VH = (SERVICES_DATA.length - 1) * STEP_VH; // 140vh total pin distance for 6 cards
const TOTAL_SECTION_VH = TOTAL_PIN_VH + 100; // 240vh total section height

export default function StackedServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const pinDistance = rect.height - window.innerHeight;
      if (pinDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / pinDistance, 0), 1);
      const index = Math.min(
        Math.floor(progress * SERVICES_DATA.length),
        SERVICES_DATA.length - 1
      );
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${TOTAL_SECTION_VH}vh`,
        background: "transparent",
      }}
    >
      {/* Sticky container — locks in viewport while scrolling through the section */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 20px",
        }}
      >
        {/* Section header above cards */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#999999",
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          — HOW WE HELP —
        </p>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#0d1f0f",
            marginBottom: 36,
            textAlign: "center",
          }}
        >
          What We Offer
        </h2>

        {/* Card stack container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 960,
            height: 440,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {SERVICES_DATA.map((service, i) => {
            const diff = i - activeIndex;
            const isHovered = hoveredCardIndex === i;
            const BASE_ROTATION = -10;

            let baseTransform = "";
            let baseOpacity = 1;
            let baseZIndex = 10;

            if (diff < 0) {
              baseTransform = `rotate(${BASE_ROTATION - 5}deg) translate(-280px, -200px)`;
              baseOpacity = 0;
              baseZIndex = 0;
            } else if (diff === 0) {
              baseTransform = `rotate(${BASE_ROTATION}deg) translate(-40px, 0px)`;
              baseOpacity = 1;
              baseZIndex = 10;
            } else if (diff === 1) {
              baseTransform = `rotate(${BASE_ROTATION}deg) translate(25px, 50px)`;
              baseOpacity = 0.92;
              baseZIndex = 9;
            } else if (diff === 2) {
              baseTransform = `rotate(${BASE_ROTATION}deg) translate(90px, 100px)`;
              baseOpacity = 0.85;
              baseZIndex = 8;
            } else if (diff === 3) {
              baseTransform = `rotate(${BASE_ROTATION}deg) translate(155px, 150px)`;
              baseOpacity = 0.78;
              baseZIndex = 7;
            } else if (diff === 4) {
              baseTransform = `rotate(${BASE_ROTATION}deg) translate(215px, 195px)`;
              baseOpacity = 0.7;
              baseZIndex = 6;
            } else {
              baseTransform = `rotate(${BASE_ROTATION}deg) translate(265px, 235px)`;
              baseOpacity = 0;
              baseZIndex = 0;
            }

            // Hover elevation: reset to full opacity 1, jump to top z-index 50, and lift 12px
            const transform =
              isHovered && diff >= 0
                ? `${baseTransform} translateY(-12px)`
                : baseTransform;
            const opacity = isHovered && diff >= 0 ? 1 : baseOpacity;
            const zIndex = isHovered && diff >= 0 ? 50 : baseZIndex;

            // Only show full inner text for active card (diff === 0) or hovered card
            const isContentVisible = diff === 0 || isHovered;

            const IconComponent = service.Icon;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                style={{
                  position: "absolute",
                  top: 40,
                  left: "50%",
                  marginLeft: -280,
                  width: 560,
                  maxWidth: "92vw",
                  height: 330,
                  background: "#0d1f0f",
                  borderRadius: 20,
                  padding: 32,
                  transform,
                  opacity,
                  zIndex,
                  visibility: opacity === 0 ? "hidden" : "visible",
                  pointerEvents: opacity === 0 ? "none" : "auto",
                  transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  boxShadow:
                    opacity > 0
                      ? isHovered
                        ? "0 35px 70px rgba(0,0,0,0.5)"
                        : "0 25px 60px rgba(0,0,0,0.35)"
                      : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#ffffff",
                  boxSizing: "border-box",
                  textAlign: "left",
                }}
              >
                {/* Top row: "SERVICE 0X" label left, icon badge right (always visible for peeking cards) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: "#04B867",
                      textTransform: "uppercase",
                      fontFamily: "monospace",
                    }}
                  >
                    {service.serviceNum}
                  </span>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0d1f0f",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <IconComponent size={19} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Inner body content — hidden on non-active, non-hovered cards to prevent text bleed-through */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                    opacity: isContentVisible ? 1 : 0,
                    pointerEvents: isContentVisible ? "auto" : "none",
                    transition: "opacity 0.25s ease",
                  }}
                >
                  <div>
                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#04B867",
                        marginBottom: 8,
                        lineHeight: 1.25,
                        textAlign: "left",
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                        lineHeight: 1.6,
                        marginBottom: 14,
                        opacity: 0.9,
                        textAlign: "left",
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Two bullet points */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {service.bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 12.5,
                            color: "#e2e8f0",
                            textAlign: "left",
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            color="#04B867"
                            style={{ flexShrink: 0 }}
                          />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom row: "Explore Service Details →" left, "X / 6" right */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 10,
                      borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                      marginTop: "auto",
                    }}
                  >
                    <Link
                      href={`/services#${service.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#ffffff",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      className="hover:text-[#04B867]"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight size={14} color="#04B867" />
                    </Link>

                    <span
                      style={{
                        fontSize: 12.5,
                        color: "#999999",
                        fontWeight: 500,
                        fontFamily: "monospace",
                      }}
                    >
                      {i + 1} / {SERVICES_DATA.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





