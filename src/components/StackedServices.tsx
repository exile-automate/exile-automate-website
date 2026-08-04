"use client";

import Link from "next/link";
import {
  ArrowRight,
  Search,
  PhoneCall,
  Zap,
  BarChart,
  Bot,
  Database,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@/utils/mockData";

export default function StackedServices() {
  return (
    <section className="bg-primary text-white py-16 lg:py-24 relative z-10 -mt-1">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider font-heading">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Our Core Offerings
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-heading text-white">
            What We Offer
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            We design, build, and connect custom automated solutions. From scoping audits to custom voice agents, we construct paths that grow with your company.
          </p>
        </div>

        {/* Clean 6-Card Grid (2 columns on md, 3 columns on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#0a1f14] border border-emerald-500/30 rounded-2xl sm:rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-emerald-500/60 transition-all duration-300 min-h-[340px]"
            >
              {/* Card Top Bar */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    SERVICE 0{index + 1}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-[#04B867]">
                    {service.iconName === "FileSearch" && <Search className="h-5 w-5" />}
                    {service.iconName === "PhoneCall" && <PhoneCall className="h-5 w-5" />}
                    {service.iconName === "Cpu" && <Zap className="h-5 w-5" />}
                    {service.iconName === "BarChart3" && <BarChart className="h-5 w-5" />}
                    {service.iconName === "Bot" && <Bot className="h-5 w-5" />}
                    {service.iconName === "Database" && <Database className="h-5 w-5" />}
                  </div>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#04B867] font-heading mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans mb-6">
                  {service.shortDesc}
                </p>

                {/* Feature Checklist */}
                {service.features && service.features.length > 0 && (
                  <ul className="flex flex-col gap-2 mb-6">
                    {service.features.slice(0, 2).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-[#04B867] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-between mt-auto">
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-emerald-400 transition-colors font-heading group"
                >
                  Explore Service Details
                  <ArrowRight className="h-4 w-4 text-[#04B867] transition-transform group-hover:translate-x-1" />
                </Link>

                <span className="text-[10px] text-emerald-400/60 font-mono">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <Link
            href="/booking"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-9 text-sm sm:text-base font-bold text-primary shadow-lg hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all font-heading"
          >
            Book an Automation Scoping Call
            <ArrowRight className="h-5 w-5" />
          </Link>
          <span className="text-xs text-emerald-100 font-medium font-sans">
            * Free 15-min call • No commitment
          </span>
        </div>

      </div>
    </section>
  );
}
