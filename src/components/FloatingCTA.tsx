"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";

export default function FloatingCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide floating CTA on booking and contact pages
    if (pathname === "/booking" || pathname === "/contact") {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Show after scrolling 300px, but hide when close to the bottom (near footer/bottom CTA)
      if (scrollPosition > 300 && documentHeight - scrollPosition - windowHeight > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:bottom-6 md:left-auto md:right-6 md:p-0 md:max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Mobile Sticky Bar / Desktop Floating Card */}
      <Link
        href="/booking"
        className="flex items-center justify-between gap-4 w-full rounded-2xl bg-white border border-card-border p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] group cursor-pointer text-foreground"
      >
        <div className="flex items-center gap-3">
          {/* Calendar Icon wrapper */}
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
            <Calendar className="h-5 w-5" />
          </div>
          
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-sm font-bold tracking-tight font-heading group-hover:text-primary transition-colors">
              Book a Free Consultation
            </span>
            <span className="text-[10px] text-muted font-medium font-sans">
              Free 15-min scoping call • No commitment
            </span>
          </div>
        </div>

        {/* Action arrow wrapper */}
        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-card-border shrink-0 text-muted group-hover:text-primary group-hover:border-primary/30 transition-all">
          →
        </div>
      </Link>

    </div>
  );
}
