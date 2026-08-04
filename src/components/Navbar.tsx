"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pillStyles: React.CSSProperties = {
    position: "fixed",
    top: scrolled ? "16px" : "-60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "720px",
    maxWidth: "90vw",
    background: "white",
    borderRadius: "9999px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    padding: "8px 20px",
    zIndex: 50,
    opacity: scrolled ? 1 : 0,
    pointerEvents: scrolled ? "auto" : "none",
    transition: "all 0.35s ease",
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        style={pillStyles}
        className="flex items-center justify-between border border-card-border h-14"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/exile logo green no gradient.png"
            alt="Exile Automate Logo"
            width={160}
            height={36}
            className="h-7 w-auto object-contain transition-opacity group-hover:opacity-90"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/booking"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-primary text-xs font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] h-8 px-4 rounded-full"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            Book Demo
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center border border-card-border bg-transparent text-foreground md:hidden hover:bg-muted-bg h-8 w-8 rounded-full"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && scrolled && (
        <div
          className="fixed left-1/2 -translate-x-1/2 z-40 bg-background/95 backdrop-blur-lg md:hidden animate-in fade-in slide-in-from-top-5 duration-200 top-20 w-[calc(100%-2rem)] max-w-[720px] rounded-2xl border border-card-border shadow-xl h-auto max-h-[70vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-5 p-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-bold border-b border-card-border/60 pb-3 transition-colors ${
                  isActive(link.href)
                    ? "text-primary font-black"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-hover"
            >
              <PhoneCall className="h-4 w-4" />
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
