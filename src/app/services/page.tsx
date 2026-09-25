import Link from "next/link";
import {
  PhoneCall,
  Search,
  Zap,
  BarChart,
  Bot,
  Database,
  Check,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { SERVICES } from "@/utils/mockData";

export default function ServicesPage() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      
      {/* 1. Page Header (Green background) */}
      <section className="bg-primary text-white py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Enterprise Automation Solutions
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-heading">
            Automate. Accelerate. Elevate.
          </h1>
          <p className="mt-4 text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            Explore our six core capability suites. We audit legacy frameworks, build conversational voice/text agents, integrate APIs, and automate manual spreadsheet tasks.
          </p>
        </div>
      </section>

      {/* 2. Alternating Services List Details */}
      <section className="w-full">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={service.id}
              id={service.id}
              className={`w-full py-16 lg:py-24 scroll-mt-20 ${
                isEven ? "bg-transparent text-foreground" : "bg-primary text-white"
              }`}
            >
              <div className="mx-auto max-w-7xl px-6 sm:px-8">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Left Side: Overview & Features */}
                  <div className={`lg:col-span-6 flex flex-col gap-6 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 border ${
                        isEven
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-white/10 text-white border-white/20"
                      }`}>
                        {service.iconName === "FileSearch" && <Search className="h-5 w-5" />}
                        {service.iconName === "PhoneCall" && <PhoneCall className="h-5 w-5" />}
                        {service.iconName === "Cpu" && <Zap className="h-5 w-5" />}
                        {service.iconName === "BarChart3" && <BarChart className="h-5 w-5" />}
                        {service.iconName === "Bot" && <Bot className="h-5 w-5" />}
                        {service.iconName === "Database" && <Database className="h-5 w-5" />}
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight font-heading sm:text-3xl">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className={`text-sm sm:text-base leading-relaxed font-sans ${
                      isEven ? "text-muted" : "text-emerald-100"
                    }`}>
                      {service.longDesc}
                    </p>

                    {/* Features list */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider font-heading">
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm font-sans">
                            <Check className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${
                              isEven ? "text-primary" : "text-white"
                            }`} />
                            <span className={isEven ? "text-foreground/90" : "text-white/90"}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Side: Benefits Panel */}
                  <div className={`lg:col-span-6 flex flex-col gap-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div className={`rounded-3xl border p-6 sm:p-8 flex flex-col gap-6 ${
                      isEven
                        ? "border-primary/15 bg-primary/[0.02] text-foreground"
                        : "border-white/20 bg-white text-foreground shadow-lg"
                    }`}>
                      <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 font-heading ${
                        isEven ? "text-primary" : "text-primary"
                      }`}>
                        <CheckCircle2 className="h-4 w-4" />
                        Business Impact & Benefits
                      </h3>
                      
                      <div className="flex flex-col gap-4">
                        {service.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex gap-3">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xs font-bold mt-0.5 font-mono">
                              ✓
                            </div>
                            <p className="text-xs sm:text-sm font-medium leading-relaxed font-sans text-slate-800">
                              {benefit}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-card-border pt-6 mt-2 flex flex-col gap-4">
                        <p className="text-xs text-muted leading-relaxed font-sans">
                          * All integrations are secure, custom-written, and deployed in full sync with your local systems.
                        </p>
                        <Link
                          href="/booking"
                          className={`inline-flex self-start items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all font-heading ${
                            isEven
                              ? "bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/15"
                              : "border border-primary text-primary hover:bg-primary/5"
                          }`}
                        >
                          Integrate This Solution
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Legacy/Custom API Section (Green background) */}
      <section className="bg-primary text-white py-20 text-center border-t border-white/10">
        <div className="mx-auto max-w-4xl bg-white/5 border border-white/20 rounded-3xl p-8 sm:p-12 flex flex-col gap-6 items-center shadow-lg">
          <h2 className="text-2xl font-bold text-white font-heading">Need a bespoke database webhook?</h2>
          <p className="text-sm text-white/80 max-w-xl leading-relaxed font-sans">
            If your company operates on legacy SQL servers, closed internal CRMs, or proprietary spreadsheets, our developers can construct custom API wrappers or middleware connectors to establish secure synchronization.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-primary px-6 text-xs font-bold transition-all hover:bg-slate-50 font-heading"
          >
            Speak with our API Developers
          </Link>
        </div>
      </section>
    </div>
  );
}
