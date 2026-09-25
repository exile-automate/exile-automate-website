import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import GlobalContourBackground from "@/components/GlobalContourBackground";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Exile Automate | AI Voice Agents & Hotel Automation",
  description: "Exile Automate is a hotel transformation company. We run a focused 1-week on-site audit and convert operations into an AI-powered hotel—deploying AI voice agents, automated booking, and intelligent guest support to raise efficiency and revenue.",
  keywords: "AI voice agent for hotels, hotel automation, AI receptionist, automated hotel booking, hospitality AI, hotel customer service automation, hotel transformation company, 1-week audit, AI-powered hotel operations, AI deployment",
  authors: [{ name: "Exile Automate" }],
  openGraph: {
    type: "website",
    title: "Exile Automate | AI Voice Agents & Hotel Automation",
    description: "1-week audit → full AI hotel: voice agents, automated booking, and AI guest support.",
    url: "https://www.exileautomate.com/",
    siteName: "Exile Automate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans relative">
        <GlobalContourBackground />
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
