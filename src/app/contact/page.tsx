"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  QrCode
} from "lucide-react";
import FormInput from "@/components/ui/FormInput";

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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Submit state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) tempErrors.phone = "Phone number is required";
    if (!hotelName.trim()) tempErrors.hotelName = "Company / Hotel name is required";
    if (!message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: replace mock submission with contact mailer (e.g. Resend API route webhook)
      setIsSubmitted(true);
    }
  };

  const socialLinks = [
    { icon: LinkedinIcon, href: "https://www.linkedin.com/company/exile-automate/", name: "LinkedIn" },
    { icon: InstagramIcon, href: "https://www.instagram.com/exileautomate.ai", name: "Instagram" },
    { icon: WhatsappIcon, href: "https://wa.me/919074840614", name: "WhatsApp" }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-primary py-8 sm:py-16 flex-1 flex flex-col justify-center animate-in fade-in duration-300">
      <div className="mx-auto max-w-6xl w-full px-6 sm:px-8">
        
        {/* Page Header (Tighter spacing for above-the-fold focus) */}
        <div className="text-center max-w-3xl mx-auto mb-8 flex flex-col gap-2">
          <div className="inline-flex self-center items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Connect With Our Team
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white font-heading">
            Contact Exile Automate
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-sans">
            Let us know what administrative obstacles you're aiming to automate. Reach out for consultations, developer reviews, or on-site audit bookings.
          </p>
        </div>

        {/* Contact Grid - Reordered columns so form appears first on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Col (Stacked first on mobile: order-1 lg:order-2) */}
          <div className="lg:col-span-7 flex order-1 lg:order-2">
            <div className="rounded-3xl border border-card-border bg-white p-6 sm:p-10 flex-1 shadow-xl text-foreground transition-all duration-300">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full justify-between">
                  
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        label="Your Name"
                        id="name"
                        type="text"
                        placeholder="Sarah Jenkins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                        required
                      />
                      
                      <FormInput
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="sjenkins@grandriviera.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        label="Phone Number"
                        id="phone"
                        type="tel"
                        placeholder="+91 90748 40614"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                        required
                      />
                      
                      <FormInput
                        label="Hotel / Property / Company Name"
                        id="hotelName"
                        type="text"
                        placeholder="The Grand Riviera Resort"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        error={errors.hotelName}
                        required
                      />
                    </div>

                    <FormInput
                      label="Enquiry Details"
                      id="message"
                      isTextArea
                      rows={4}
                      placeholder="Write your questions about audits, voice solutions, custom bots, or api wrappers..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={errors.message}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      type="submit"
                      className="w-full flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer font-heading"
                    >
                      <Send className="h-4 w-4" />
                      Send Enquiry Message
                    </button>
                    <span className="text-[10px] text-center text-muted font-medium font-sans">
                      * Scoped inside 24 hours • No commitment
                    </span>
                  </div>

                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center gap-6 h-full py-12 animate-in zoom-in-95 duration-200">
                  <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-black text-foreground font-heading">Thank you, we'll be in touch!</h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md font-sans">
                      Hi <strong>{name}</strong>, we have received your enquiry regarding <strong className="text-foreground">{hotelName}</strong>. Our operations team will contact you within 24 hours.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-card-border bg-slate-50 p-4 max-w-sm text-xs text-muted leading-relaxed font-sans">
                    A copy of this enquiry confirmation has been sent to your email at <strong>{email}</strong>.
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setHotelName("");
                      setMessage("");
                      setErrors({});
                    }}
                    type="button"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer font-heading"
                  >
                    Send Another Message
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Coordinates Col (Stacked second on mobile: order-2 lg:order-1) */}
          <div className="lg:col-span-5 flex order-2 lg:order-1">
            <div className="rounded-3xl border border-card-border bg-white p-8 flex flex-col gap-8 flex-1 justify-between shadow-xl text-foreground">
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-foreground text-lg uppercase tracking-wider font-heading">
                    Company Coordinates
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-sans">
                    Call, email, or WhatsApp us directly. Our scoping specialists answer inside of 24 hours.
                  </p>
                </div>

                {/* Info List */}
                <div className="flex flex-col gap-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-heading">Phone / WhatsApp</span>
                      <a href="tel:+919074840614" className="text-sm font-bold text-foreground hover:text-primary transition-colors font-mono">
                        +91 90748 40614
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-heading">Business Email</span>
                      <a href="mailto:exileautomate@gmail.com" className="text-sm font-bold text-foreground hover:text-primary transition-colors font-sans">
                        exileautomate@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-heading">HQ Address</span>
                      <span className="text-xs font-medium text-foreground leading-relaxed font-sans">
                        Exile Automate Pvt. Ltd, Door No: 2/1149/I 100, Hilite Business Park, Tower 2, Second Floor, Olavanna, Kozhikode - 673014
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-heading">Response Velocity</span>
                      <span className="text-sm font-bold text-foreground font-sans">
                        Under 24 hours guaranteed
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* QR Code Placeholder Box */}
              <div className="border-t border-card-border pt-6 flex flex-col sm:flex-row items-center gap-5 justify-between">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-heading">Scan Social Channels</span>
                  <p className="text-[11px] text-muted/80 max-w-[200px] leading-relaxed font-sans">
                    Scan or click the link icons to visit our official channels directly.
                  </p>
                  
                  {/* Social list links */}
                  <div className="flex gap-2.5 mt-1 justify-center sm:justify-start">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full p-1.5 border border-card-border hover:bg-primary/10 hover:text-primary transition-colors text-muted cursor-pointer"
                          title={social.name}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* SVG styled QR Code placeholder */}
                <div className="h-20 w-20 bg-slate-50 p-2 rounded-2xl border border-card-border flex items-center justify-center text-primary shrink-0 relative group cursor-pointer shadow-inner">
                  <QrCode className="h-full w-full opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all" />
                  <div className="absolute inset-0 m-auto h-5 w-5 bg-white rounded border border-card-border flex items-center justify-center text-[7px] font-black text-primary font-heading select-none pointer-events-none">
                    EX
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
