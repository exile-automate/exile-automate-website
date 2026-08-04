import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// Reusable SVG components for social links
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
    width="24"
    height="24"
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

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: LinkedinIcon, href: "https://www.linkedin.com/company/exile-automate/", name: "LinkedIn" },
    { icon: InstagramIcon, href: "https://www.instagram.com/exileautomate.ai", name: "Instagram" },
    { icon: WhatsappIcon, href: "https://wa.me/919074840614", name: "WhatsApp" }
  ];

  return (
    <footer className="w-full bg-[#0a1f14] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand and Description */}
          <div className="space-y-6">
            <Image
              src="/exile logo white.png"
              alt="Exile Automate Logo"
              width={160}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-white/90 max-w-xs font-sans">
              We don&apos;t just build tools. We create freedom. Elevating businesses through smart, practical operations and custom agent development.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 border border-white/20 hover:bg-white/10 hover:text-white transition-colors text-white/80"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav Links & Details Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-sm text-white/80 hover:text-slate-200 transition-colors font-sans">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-sm text-white/80 hover:text-slate-200 transition-colors font-sans">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/booking" className="text-sm text-white/80 hover:text-slate-200 transition-colors font-sans">
                      Book a Consultation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">Offerings</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/services#internal-automation-audits" className="text-sm text-white/80 hover:text-slate-200 transition-colors font-sans">
                      Automation Audits
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#ai-powered-voice-solutions" className="text-sm text-white/80 hover:text-slate-200 transition-colors font-sans">
                      AI Voice Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#custom-bot-agent-development" className="text-sm text-white/80 hover:text-slate-200 transition-colors font-sans">
                      Custom Bot Agents
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Real Details Address/Email/Phone */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">Real Details</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center gap-3 text-sm text-white/95">
                  <Phone className="h-4 w-4 text-slate-300 shrink-0" />
                  <a href="tel:+919074840614" className="hover:text-slate-200 transition-colors font-medium font-mono">
                    +91 90748 40614
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/95">
                  <Mail className="h-4 w-4 text-slate-300 shrink-0" />
                  <a href="mailto:exileautomate@gmail.com" className="hover:text-slate-200 transition-colors font-medium font-sans">
                    exileautomate@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/90">
                  <MapPin className="h-4 w-4 text-slate-300 mt-1 shrink-0" />
                  <span className="text-xs leading-relaxed font-sans">
                    Exile Automate Pvt. Ltd, Door No: 2/1149/I 100, Hilite Business Park, Tower 2, Second Floor, Olavanna, Kozhikode - 673014
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-white/80 font-sans">
            &copy; {currentYear} Exile Automate Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/80 hover:text-slate-200 transition-colors font-sans">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/80 hover:text-slate-200 transition-colors font-sans">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* 1. GIANT BOTTOM WORDMARK (Standalone decorative footer section) */}
      <div className="w-full bg-[#0a1f14] select-none pointer-events-none flex flex-col items-center justify-center py-20 px-6 sm:px-8 mt-0">
        <div className="w-full max-w-[75vw] flex justify-center">
          <Image
            src="/exile logo white.png"
            alt="Exile Automate Giant Wordmark"
            width={1600}
            height={400}
            style={{ width: "100%", height: "auto" }}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
