import Link from "next/link";
import { Sparkles, Compass, Eye, ArrowRight } from "lucide-react";
import { CORE_VALUES, TEAM_MEMBERS } from "@/utils/mockData";

export default function AboutPage() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      
      {/* 1. Page Header (Green background) */}
      <section className="bg-primary text-white py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Who We Are
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-heading">
            About Exile Automate
          </h1>
          <p className="mt-4 text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            We believe manual data entries and administrative hurdles shouldn't dictate your business growth. We build smart, practical automated tools to restore freedom.
          </p>
        </div>
      </section>

      {/* 2. Vision & Mission Section (White background) */}
      <section className="bg-white py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Vision Card */}
            <div className="rounded-3xl border border-card-border bg-slate-50 p-8 sm:p-10 flex flex-col gap-5 relative overflow-hidden transition-all hover:border-primary/20 shadow-sm text-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                <Eye className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground font-heading">Our Vision</h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed italic font-medium font-sans">
                  "To create a world where business owners no longer feel overwhelmed by repetitive tasks."
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="rounded-3xl border border-card-border bg-slate-50 p-8 sm:p-10 flex flex-col gap-5 relative overflow-hidden transition-all hover:border-primary/20 shadow-sm text-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                <Compass className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground font-heading">Our Mission</h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
                  "To free businesses from manual work through smart, practical automation so they can reclaim their time, focus on what matters, and grow with confidence."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Values Section (Green background with White Cards) */}
      <section className="bg-primary text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-heading text-white">
              Our Core Values
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-sans">
              Five guiding principles that steer our developer cycles, customer support loops, and technical integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CORE_VALUES.map((value) => (
              <div
                key={value.number}
                className="bg-white text-foreground border border-card-border rounded-2xl p-6 flex flex-col gap-4 min-h-[220px] relative shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute right-4 top-2 text-4xl font-extrabold text-primary/10 select-none font-heading">
                  {value.number}
                </span>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20 font-heading">
                  {value.number}
                </div>
                <h3 className="font-bold text-base text-foreground font-heading leading-tight pt-1">
                  {value.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-sans">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Meet The Team Founders Section (White background) */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-heading text-foreground">
              Meet the Founders
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
              The builders shaping practical operational automation pipelines.
            </p>
          </div>

          {/* Grayscale Founder Profile Blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((founder, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-card-border rounded-3xl p-8 text-center flex flex-col items-center gap-5 group hover:border-primary/20 hover:scale-[1.01] transition-all duration-300 shadow-sm"
              >
                {/* Avatar Frame with Black-and-white treatment */}
                <div className="h-20 w-20 rounded-full bg-white border border-card-border flex items-center justify-center text-slate-500 font-bold text-xl select-none group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 shadow-sm">
                  {founder.initials}
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-bold text-base text-foreground font-heading group-hover:text-primary transition-colors">
                    {founder.name}
                  </h4>
                  <p className="text-[9px] text-muted uppercase font-bold tracking-wider leading-none font-heading">
                    {founder.role}
                  </p>
                </div>

                <div className="text-[10px] text-muted/80 leading-relaxed font-sans pt-1.5 border-t border-card-border w-full">
                  Exile Automate Pvt. Ltd. Co-Founder
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Bottom Banner (Green background with White card elements) */}
      <section className="bg-primary text-white py-16 px-6 sm:px-8 border-t border-white/10">
        <div className="mx-auto max-w-4xl bg-white/5 border border-white/20 rounded-3xl p-8 sm:p-12 flex flex-col gap-6 items-center shadow-lg text-center">
          <h2 className="text-2xl font-bold text-white font-heading">Let's automate your daily repetitive task queue</h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed font-sans">
            Connect with our scoping specialists to schedule a free 30-minute operational mapping review and see how we create freedom for your company.
          </p>
          <Link
            href="/booking"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-xs font-bold text-primary shadow-md hover:bg-slate-50 hover:scale-[1.02] transition-all font-heading"
          >
            Schedule Free Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
