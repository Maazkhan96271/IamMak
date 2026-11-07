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
  subtitle?: string;
  filename: string;
  badge: string;
  badgeType: "live" | "hackathon" | "enterprise";
  featured?: boolean;
  bentoSpan?: string;
  shortDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  metrics: MetricItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  current?: boolean;
  badge?: string;
  description: string;
  details?: string[];
  tags: string[];
}

export interface WorkflowItem {
  step: number;
  label: string;
  shortDesc: string;
  description: string;
  icon: string;
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

export interface MapData {
  city: string;
  country: string;
  coordinates: string;
  timezone: string;
  overlayText: string;
}

export interface AcademicMetric {
  stat: string;
  label: string;
  description: string;
  badge: string;
  accent: string;
}

export interface AcademicTrendData {
  title: string;
  subtitle: string;
  target: string;
  institution: string;
  metrics: AcademicMetric[];
}

export interface ValueItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  accent: "cyan" | "emerald" | "purple";
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
  mapData: MapData;
  academicTrend: AcademicTrendData;
  values: ValueItem[];
  experience: ExperienceItem[];
  workflow: WorkflowItem[];
  projects: ProjectItem[];
  archivedProjects?: ProjectItem[];
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

  mapData: {
    city: "Bengaluru",
    country: "India",
    coordinates: "12.9716° N, 77.5946° E",
    timezone: "GMT+5:30",
    overlayText: "BENGALURU, INDIA · 12.9716° N, 77.5946° E · GMT+5:30",
  },

  academicTrend: {
    title: "Academic Trend & Stats",
    subtitle: "Real-time engineering metrics & milestone velocity",
    target: "Target: SWE 2030",
    institution: "Polaris School of Technology",
    metrics: [
      {
        stat: "5+",
        label: "Apps Built",
        description: "Full-Stack & Applied AI Deployments",
        badge: "Production Ready",
        accent: "text-cyan-400",
      },
      {
        stat: "200+",
        label: "DSA Solved",
        description: "C++20 & Algorithmic Problem Solving",
        badge: "Daily Practice",
        accent: "text-emerald-400",
      },
      {
        stat: "SWE 2030",
        label: "Target Milestone",
        description: "Software Engineer by 2030",
        badge: "Target: SWE 2030",
        accent: "text-purple-400",
      },
      {
        stat: "PST Undergrad",
        label: "Polaris School of Technology",
        description: "B.Tech in Applied AI (2026 Batch)",
        badge: "Bengaluru, IN",
        accent: "text-blue-400",
      },
    ],
  },

  values: [
    {
      id: "growth",
      title: "Growth",
      tagline: "An explorer of systems, driven by curiosity.",
      badge: "Curiosity Engine",
      accent: "cyan",
    },
    {
      id: "focus",
      title: "Focus",
      tagline: "Deep work on efficiency and AI workflows.",
      badge: "Deep Work Mode",
      accent: "emerald",
    },
    {
      id: "craft",
      title: "Craft",
      tagline: "Discipline in every single line of code.",
      badge: "Production Discipline",
      accent: "purple",
    },
  ],

  experience: [
    {
      id: "pst-btech",
      role: "B.Tech Applied AI",
      organization: "Polaris School of Technology",
      period: "2026 - Present",
      current: true,
      badge: "Undergraduate Degree",
      description:
        "Undergraduate engineering curriculum focused on applied machine intelligence, systems programming, and high-scale web platforms.",
      details: [
        "Rigorous training in Data Structures & Algorithms in modern C++20 and relational architectures.",
        "Engineering AI-native applications and intelligent agentic workflows in Bengaluru, India.",
        "Targeting elite software craftsmanship with career horizon: Software Engineer by 2030.",
      ],
      tags: ["Applied AI", "C++20", "Systems", "Next.js 16", "Python"],
    },
    {
      id: "polaris-ojt",
      role: "B2B Vendor Compliance Developer",
      organization: "Polaris OJT Sem 1",
      period: "2026",
      current: false,
      badge: "Enterprise Ship",
      description:
        "Built enterprise risk onboarding platform replacing email threads with centralized document verification and state machines.",
      details: [
        "Modeled complex multi-step vendor approval state machines without heavyweight server dependencies.",
        "Centralized document verification with automated expiration alerts and audit trails.",
      ],
      tags: ["Vanilla JS", "Bootstrap", "Enterprise UX"],
    },
  ],

  workflow: [
    {
      step: 1,
      label: "IDEA",
      shortDesc: "Problem Discovery",
      description: "0 → 1 Problem definition, user friction mapping & feasibility scope.",
      icon: "Lightbulb",
    },
    {
      step: 2,
      label: "PLAN",
      shortDesc: "Architecture & Schemas",
      description: "Data contracts, database schemas, and state machine specifications.",
      icon: "FileText",
    },
    {
      step: 3,
      label: "AI HELP",
      shortDesc: "Agent Pairing",
      description: "LLM heuristic design, agentic loops & prompt engineering.",
      icon: "Bot",
    },
    {
      step: 4,
      label: "CODE",
      shortDesc: "Clean Implementation",
      description: "Type-safe TypeScript, Python, and high-performance frontend/backend code.",
      icon: "Code2",
    },
    {
      step: 5,
      label: "REVIEW",
      shortDesc: "Security & Auditing",
      description: "Security rules verification, token efficiency, and edge case audits.",
      icon: "Eye",
    },
    {
      step: 6,
      label: "TEST",
      shortDesc: "Validation & Zero-Conflict",
      description: "End-to-end stress tests, conflict-prevention drills & Lighthouse audits.",
      icon: "CheckCircle",
    },
    {
      step: 7,
      label: "DEPLOY",
      shortDesc: "Cloud Production Ship",
      description: "Vercel / AWS cloud deploy with automated CI/CD and live telemetry.",
      icon: "Rocket",
    },
  ],

  projects: [
    {
      id: "scamshield",
      title: "ScamShield",
      subtitle: "AI Scam Risk Analyzer",
      filename: "scamshield.tsx",
      badge: "Live on Vercel",
      badgeType: "live",
      featured: true,
      bentoSpan: "md:col-span-2 lg:col-span-2",
      shortDescription:
        "AI Scam Risk Analyzer. An open-source scam detection engine for SMS, emails, WhatsApp forwards, payment requests, and QR codes. Combines a deterministic rule engine with LLM heuristics and client-side AES-256-GCM encrypted scan history in IndexedDB.",
      tags: ["Next.js 16", "TypeScript", "Tailwind", "LLM Heuristics"],
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
      title: "Hospital Management System",
      subtitle: "Full-stack healthcare platform",
      filename: "hospital_app.py",
      badge: "Live on Vercel",
      badgeType: "live",
      bentoSpan: "md:col-span-1 lg:col-span-1",
      shortDescription:
        "Full-stack healthcare platform featuring secure role-based portals for Admins, Doctors, and Patients with conflict-prevention appointment scheduling, 7-day slot availability, and diagnosis logs.",
      tags: ["Python", "Flask", "FastAPI", "Next.js"],
      liveUrl: "https://hospital-management-system-spammer.vercel.app",
      githubUrl: "https://github.com/Maazkhan96271/Hospital-Management-System",
      metrics: [
        { label: "Portals", value: "3 Role Isolated" },
        { label: "Engine", value: "Zero-Conflict Booking" },
        { label: "Architecture", value: "FastAPI + Flask" },
      ],
    },
    {
      id: "gst-recon-agent",
      title: "Recon-Agent",
      subtitle: "GST AI Engine for AWS First Commit",
      filename: "recon_agent.py",
      badge: "AWS First Commit 2026",
      badgeType: "hackathon",
      bentoSpan: "md:col-span-1 lg:col-span-3",
      shortDescription:
        "GST AI Engine for AWS First Commit. Autonomous multi-agent GST Input Tax Credit (ITC) reconciliation & recovery engine automating compliance under Indian GST Rule 88D with AWS Bedrock.",
      tags: ["AWS Bedrock", "FastAPI", "React 19"],
      liveUrl: "https://github.com/Maazkhan96271/gst-recon-agent",
      githubUrl: "https://github.com/Maazkhan96271/gst-recon-agent",
      metrics: [
        { label: "Indian Compliance", value: "Rule 88D" },
        { label: "Agent SDK", value: "Strands" },
        { label: "Cloud Model", value: "AWS Bedrock" },
      ],
    },
  ],

  archivedProjects: [
    {
      id: "b2b-vendor-compliance",
      title: "B2B Vendor Compliance Platform",
      subtitle: "Enterprise Risk & Vendor Onboarding",
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
      subtitle: "High-Performance Next.js Architecture",
      filename: "portfolio.tsx",
      badge: "Live on GitHub Pages",
      badgeType: "live",
      shortDescription:
        "High-performance developer editorial portfolio engineered with Next.js 15 App Router, Framer Motion, and Tailwind CSS. Features 3D interactive flip card, mouse-following radial spotlight bento grid, and deep space dark theme.",
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
