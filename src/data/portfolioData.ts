export interface NavItem {
  label: string;
  href: string;
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  filename: string;
  badge: string;
  badgeType: "live" | "hackathon" | "enterprise";
  featured?: boolean;
  shortDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  metrics: MetricItem[];
}

export interface CredentialItem {
  title: string;
  issuer: string;
  period: string;
  status: string;
  details: string[];
}

export interface ForgeItem {
  name: string;
  category: string;
  icon: string;
  level: string;
}

export interface PersonaData {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  timezone: string;
  college: string;
  degree: string;
  admissionYear: string;
  classBatch: string;
  careerGoal: string;
  liveStatus: string;
  avatarUrl: string;
  socials: {
    github: string;
    linkedin: string;
    discord: string;
    email: string;
  };
}

export interface PortfolioData {
  persona: PersonaData;
  navLinks: NavItem[];
  stats: {
    apps: string;
    dsa: string;
    admission: string;
    performance: string;
  };
  projects: ProjectItem[];
  credentials: CredentialItem[];
  forge: ForgeItem[];
}

export const portfolioData: PortfolioData = {
  persona: {
    name: "Maaz Khan",
    tagline: "FULL-STACK · AI · DEVELOPER",
    bio: "Building AI-Native Products, Intelligent Workflows & High-Performance Systems.",
    location: "Bengaluru, India",
    timezone: "Asia/Kolkata (UTC+5:30)",
    college: "Polaris School of Technology",
    degree: "B.Tech in Applied Artificial Intelligence",
    admissionYear: "2026",
    classBatch: "Class of 2026 – 2030",
    careerGoal: "Software Engineer by 2030",
    liveStatus: "Building AI Systems in Bengaluru · Open for 2026 Internships",
    avatarUrl: "/assets/avatar.jpg",
    socials: {
      github: "https://github.com/Maazkhan96271",
      linkedin: "https://www.linkedin.com/in/maaz-khan-9124232bb/",
      discord: "https://discord.com/users/maazkhan-26796",
      email: "maazkhan96271@gmail.com",
    },
  },

  navLinks: [
    { label: "Projects", href: "#projects" },
    { label: "Credentials", href: "#credentials" },
    { label: "Forge", href: "#forge" },
    { label: "Persona", href: "#persona" },
  ],

  stats: {
    apps: "5+",
    dsa: "200+",
    admission: "2026",
    performance: "100/100",
  },

  projects: [
    {
      id: "scamshield",
      title: "ScamShield — AI Scam Risk Analyzer",
      filename: "scamshield.tsx",
      badge: "Live on Vercel",
      badgeType: "live",
      featured: true,
      shortDescription:
        "An open-source AI scam-risk analyzer for emails, SMS, WhatsApp forwards, payment requests, and QR codes. Combines a deterministic rule engine with LLM inference, quoting exact observed evidence with client-side AES-256-GCM encrypted scan history in IndexedDB.",
      tags: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "PWA", "AES-256-GCM", "LLM Heuristics"],
      liveUrl: "https://scamshield-jet.vercel.app",
      githubUrl: "https://github.com/Maazkhan96271/scamshield",
      metrics: [
        { label: "False Positive Priority", value: "Zero False Certainty" },
        { label: "Rule Evaluation", value: "< 350ms" },
        { label: "Vault", value: "AES-256-GCM" },
      ],
    },
    {
      id: "hospital-management-system",
      title: "Hospital Management System (HMS)",
      filename: "hospital_app.py",
      badge: "Live on Vercel",
      badgeType: "live",
      shortDescription:
        "Full-stack healthcare operations platform featuring secure role-based portals for Admins, Doctors, and Patients. Includes doctor search by specialization, 7-day slot availability scheduling, double-booking conflict prevention, and diagnosis logs.",
      tags: ["Python", "Flask", "FastAPI", "SQLite", "Bootstrap 5", "Next.js", "RBAC"],
      liveUrl: "https://hospital-management-system-spammer.vercel.app",
      githubUrl: "https://github.com/Maazkhan96271/Hospital-Management-System",
      metrics: [
        { label: "Portals", value: "3 Role Isolated" },
        { label: "Engine", value: "Zero-Conflict Booking" },
        { label: "ORM", value: "SQLAlchemy" },
      ],
    },
    {
      id: "gst-recon-agent",
      title: "Recon-Agent (GST AI Engine)",
      filename: "recon_agent.py",
      badge: "AWS First Commit 2026",
      badgeType: "hackathon",
      shortDescription:
        "Autonomous multi-agent GST Input Tax Credit (ITC) reconciliation & recovery engine built for AWS First Commit 2026. Automates compliance under Indian GST Rule 88D with AWS Bedrock, Strands SDK, and dual React 19 / Streamlit surfaces.",
      tags: ["AWS Bedrock", "Strands SDK", "FastAPI", "DynamoDB", "React 19", "Streamlit"],
      liveUrl: "https://github.com/Maazkhan96271/gst-recon-agent",
      githubUrl: "https://github.com/Maazkhan96271/gst-recon-agent",
      metrics: [
        { label: "Compliance", value: "Rule 88D" },
        { label: "Agent SDK", value: "Strands" },
        { label: "Cloud Model", value: "AWS Bedrock" },
      ],
    },
    {
      id: "b2b-vendor-compliance",
      title: "B2B Vendor Compliance Platform",
      filename: "vendor_compliance.js",
      badge: "Polaris OJT Sem 1",
      badgeType: "enterprise",
      shortDescription:
        "Enterprise vendor risk and compliance onboarding platform built during Semester 1 OJT at Polaris School of Technology. Replaces email workflows with centralized document verification, automated expiration alerts, and client-side state machines.",
      tags: ["JavaScript", "Bootstrap 5", "HTML5/CSS3", "State Machine", "Enterprise UX"],
      liveUrl: "https://github.com/Maazkhan96271/b2b-vendor-onboarding-compliance-ojt-sem1-pst",
      githubUrl: "https://github.com/Maazkhan96271/b2b-vendor-onboarding-compliance-ojt-sem1-pst",
      metrics: [
        { label: "Cadence", value: "1-Month OJT Ship" },
        { label: "Architecture", value: "Client State Machine" },
        { label: "Alerts", value: "Auto-Expiry Engine" },
      ],
    },
    {
      id: "ai-portfolio",
      title: "AI-Native Developer Portfolio",
      filename: "portfolio.html",
      badge: "Live on GitHub Pages",
      badgeType: "live",
      shortDescription:
        "High-performance developer editorial portfolio engineered with zero runtime frameworks for instant sub-second page loads. Features custom in-memory knowledge mesh AI assistant, interactive physics chips, and architecture modal explorer.",
      tags: ["Next.js 16", "Tailwind CSS", "Framer Motion", "TypeScript", "Glassmorphism"],
      liveUrl: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/",
      githubUrl: "https://github.com/Maazkhan96271/maazkhan-ai-portfolio",
      metrics: [
        { label: "Lighthouse", value: "100/100" },
        { label: "Cold Start", value: "< 0.3s" },
        { label: "Styling", value: "Deep Space Dark" },
      ],
    },
  ],

  credentials: [
    {
      title: "B.Tech in Applied Artificial Intelligence",
      issuer: "Polaris School of Technology · Bengaluru, India",
      period: "Aug 2026 – Present",
      status: "Admitted 2026 · Class of 2026–2030",
      details: [
        "Undergraduate engineering curriculum focused on applied machine intelligence, systems programming, and high-scale web platforms.",
        "Comprehensive study of Data Structures & Algorithms in modern C++, relational schemas, and operating system principles.",
        "Targeting elite software craftsmanship with career horizon: Software Engineer by 2030.",
      ],
    },
    {
      title: "Semester 1 On-Job-Training (OJT) Enterprise Ship",
      issuer: "Polaris School of Technology OJT",
      period: "2026",
      status: "Completed",
      details: [
        "Shipped an enterprise B2B compliance automation platform with real-time risk scoring.",
        "Modeled complex multi-step vendor approval state machines without heavyweight server dependencies.",
      ],
    },
    {
      title: "WeMakeDevs AWS First Commit 2026 Hackathon",
      issuer: "AWS & WeMakeDevs",
      period: "2026",
      status: "Finalist Engine",
      details: [
        "Architected Recon-Agent, an autonomous multi-agent tax recovery engine for GST Rule 88D compliance.",
        "Integrated AWS Bedrock foundation models with Strands SDK, FastAPI, and DynamoDB.",
      ],
    },
  ],

  forge: [
    { name: "Next.js 16", category: "Frontend", level: "Production", icon: "▲" },
    { name: "React 19", category: "Frontend", level: "Advanced", icon: "⚛" },
    { name: "TypeScript 5", category: "Language", level: "Core", icon: "TS" },
    { name: "Python 3", category: "Backend / AI", level: "Advanced", icon: "PY" },
    { name: "FastAPI", category: "Backend", level: "High Performance", icon: "⚡" },
    { name: "Flask", category: "Backend", level: "Full-Stack", icon: "⚗" },
    { name: "AWS Bedrock", category: "AI Systems", level: "Multi-Agent", icon: "☁" },
    { name: "Framer Motion", category: "Animation", level: "Interactive", icon: "✦" },
    { name: "Tailwind CSS v4", category: "Design System", level: "Glassmorphism", icon: "🎨" },
    { name: "C++20", category: "Systems", level: "DSA & CLI", icon: "⚙" },
    { name: "SQLite & SQLAlchemy", category: "Database", level: "Relational", icon: "🗄" },
    { name: "PWA & Web Crypto", category: "Security", level: "AES-256-GCM", icon: "🛡" },
  ],
};
