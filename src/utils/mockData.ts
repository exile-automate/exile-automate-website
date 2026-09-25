export interface Client {
  name: string;
  logoText: string;
  logoPath: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  features: string[];
  benefits: string[];
}

export interface CoreValue {
  number: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface BookingSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DaySlots {
  dateString: string; // "YYYY-MM-DD"
  formattedDate: string; // "Monday, Jul 5"
  slots: BookingSlot[];
}

export const TRUSTED_CLIENTS: Client[] = [
  {
    name: "Heaven Nights DMC",
    logoText: "Heaven Nights DMC",
    logoPath: "/clients/heaven-nights-dmc.png"
  },
  {
    name: "VKC Pride",
    logoText: "VKC Pride",
    logoPath: "/clients/vkc-pride.png"
  },
  {
    name: "Smarty Beans",
    logoText: "Smarty Beans",
    logoPath: "/clients/smarty-beans.png"
  },
  {
    name: "Rail Rolls",
    logoText: "Rail Rolls",
    logoPath: "/clients/rail-rolls.png"
  },
  {
    name: "WISE",
    logoText: "WISE",
    logoPath: "/clients/wise.png"
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    number: "01",
    title: "Empathy Driven Innovation",
    desc: "We design technology that understands human needs and addresses real operational pain points first."
  },
  {
    number: "02",
    title: "Simplicity With Power",
    desc: "Our tools are straightforward to use, but pack enough performance to automate complex workflows."
  },
  {
    number: "03",
    title: "Human Centered Design",
    desc: "We keep the user at the absolute center of every layout, action, and decision we make."
  },
  {
    number: "04",
    title: "Relentless Support",
    desc: "We don't just hand over code; we stay with you to guide, debug, and optimize your systems."
  },
  {
    number: "05",
    title: "Purpose Over Product",
    desc: "We build what serves your growth, never adding complexity for complexity's sake."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Saleel Razack", role: "Co-Founder & CEO", initials: "SR" },
  { name: "Fahim Mhd Elite", role: "Founder & COO", initials: "FE" },
  { name: "Ansam Adeeb Ishakh", role: "Co-Founder & CFO", initials: "AI" },
  { name: "Ishan Mhd Elite", role: "Co-Founder & CTO", initials: "IE" }
];

export const SERVICES: Service[] = [
  {
    id: "internal-automation-audits",
    title: "Internal Automation Audits & Consultations",
    shortDesc: "Comprehensive scoping audits to map operational friction, identify bottlenecks, and build an automation roadmap.",
    longDesc: "We inspect your business workflows on-site. Our team catalogs repetitive operations, reviews employee software usage, and drafts a technical specification outlining exactly where tasks can be offloaded to AI bots.",
    iconName: "FileSearch",
    features: [
      "On-site shadow audits of manual handoffs",
      "Process mapping and friction identification",
      "Detailed custom software ROI reports",
      "Drafting integration-ready API specifications"
    ],
    benefits: [
      "Gain complete clarity on operational bottlenecks",
      "Minimize shadow work and administrative fatigue",
      "Receive a clear step-by-step automation timeline"
    ]
  },
  {
    id: "ai-powered-voice-solutions",
    title: "AI-Powered Voice Solutions",
    shortDesc: "Natural conversational voice assistants designed to manage front-desk calls, verify bookings, and route inquiries.",
    longDesc: "Deploy AI voice receptionists that sound natural, pace conversations humanly, and support multiple languages. Perfect for managing concurrent calls during peak traffic hours without making guests wait.",
    iconName: "PhoneCall",
    features: [
      "Natural language phrasing with low-latency response",
      "Voice custom-tuning for your brand identity",
      "Multilingual translation support in 15+ languages",
      "Simultaneous call handling (unlimited lines)"
    ],
    benefits: [
      "Achieve a 100% call answer rate with zero wait times",
      "Free receptionists to focus on face-to-face service",
      "Reduce customer support load by up to 70%"
    ]
  },
  {
    id: "smart-workflow-management",
    title: "Smart Workflow Management",
    shortDesc: "Bespoke triggers and automated connectors that sync information across apps without manual copy-pasting.",
    longDesc: "Connect your emails, leads, sheets, project managers, and messaging apps. When a guest books or leaves an enquiry, details populate instantly across your internal boards, notifying correct staff members.",
    iconName: "Cpu",
    features: [
      "Custom Zapier, Make, and webhook workflows",
      "Automated team notifications via Slack/WhatsApp/Email",
      "Lead scoring and database entries in real-time",
      "Error-checking algorithms to prevent duplicate data"
    ],
    benefits: [
      "Save hours of daily data-entry work",
      "Prevent human error in booking coordinates",
      "Accelerate response speed to new incoming leads"
    ]
  },
  {
    id: "dashboard-analytics-automation",
    title: "Dashboard & Analytics Automation",
    shortDesc: "Unified visualizations tracking call metrics, conversion rates, and workflow performance in one screen.",
    longDesc: "Stop pulling reports manually. We configure real-time reporting boards that translate customer voice transcripts, sentiment patterns, call traffic, and booking outcomes into clear executive insights.",
    iconName: "BarChart3",
    features: [
      "Unified performance metrics from all integrations",
      "Automated email digests with direct booking KPIs",
      "Call transcript analysis and sentiment trends",
      "Secure role-based dashboard access"
    ],
    benefits: [
      "Track system performance in real-time",
      "Optimize staff schedules based on call history",
      "Make data-driven decisions with clear analytics charts"
    ]
  },
  {
    id: "custom-bot-agent-development",
    title: "Custom Bot & Agent Development",
    shortDesc: "Tailored software agents trained on your specific guides to resolve customer questions and execute actions.",
    longDesc: "We build specialized virtual bots for web chats, WhatsApp, or internal portals. These agents answer FAQs, pull inventory details, and help users execute tasks based on your internal documentation.",
    iconName: "Bot",
    features: [
      "Context-aware agents trained on your business guides",
      "Seamless handoff to human support on urgent requests",
      "Integration with WhatsApp Business and website chat",
      "Strict data privacy controls and sandboxed logic"
    ],
    benefits: [
      "Resolve up to 80% of repetitive customer questions instantly",
      "Ensure consistent, professional messaging 24/7",
      "Provide support across multiple channels simultaneously"
    ]
  },
  {
    id: "pms-crm-api-integrations",
    title: "PMS/CRM & API Integrations",
    shortDesc: "Secure API connections bridging legacy database setups, customer records, and booking engines.",
    longDesc: "Connect legacy Property Management Systems (PMS) or Customer Relationship Managers (CRM) to modern AI tools. We build secure custom APIs that synchronize guest histories and bookings without breaking legacy systems.",
    iconName: "Database",
    features: [
      "Custom API wrapper development for legacy databases",
      "Real-time PMS synchronization (Opera, Cloudbeds, Mews)",
      "Secure tokens and credentials handling",
      "Webhook architecture for instant state notifications"
    ],
    benefits: [
      "Bridge old software with new AI capabilities safely",
      "Ensure consistent data across all bookings and profiles",
      "Avoid costly system rebuilds by utilizing custom middleware"
    ]
  }
];

// Helper to generate mock booking slots dynamically for the next 14 days
export function generateDynamicSlots(): DaySlots[] {
  const slots: DaySlots[] = [];
  const timeStrings = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:30 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM"
  ];
  
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Start from tomorrow
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    
    // Skip Sundays for booking mock
    if (d.getDay() === 0) continue;
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${date}`;
    
    const dayName = daysOfWeek[d.getDay()];
    const monthName = months[d.getMonth()];
    const formattedDate = `${dayName}, ${monthName} ${d.getDate()}`;
    
    const daySlots: BookingSlot[] = timeStrings.map((time, index) => {
      // Make some slots unavailable for realism
      const hash = (d.getDate() + index) % 3;
      const available = hash !== 0; // 2 out of 3 slots are available
      
      return {
        id: `${dateString}-${index}`,
        time,
        available
      };
    });
    
    slots.push({
      dateString,
      formattedDate,
      slots: daySlots
    });
  }
  
  return slots;
}
