/* ============================================================
   Maaz Khan — Portfolio Scripts
   Interactive UI, Project Modals, Floating Guide Bar, AI Assistant
   ============================================================ */

(() => {
  "use strict";

  /* ---------- 1. Projects Architecture Data ---------- */
  const PROJECTS_ARCH = {
    "scamshield": {
      title: "ScamShield — AI Scam Risk Analyzer",
      shortDescription: "A free, open-source scam-risk analyzer for emails, SMS, WhatsApp forwards, payment requests, and QR codes.",
      fullDescription: "ScamShield is an open-source security intelligence application engineered to evaluate suspicious communications before users fall victim to financial or identity fraud. Rather than relying on a single opaque LLM call, ScamShield pairs a deterministic heuristic rule engine with an LLM verification layer — where the more cautious verdict always wins. Every flag isolates observed evidence (quoted directly from the user's input) and highlights exact phrases in real time. For uncompromising user privacy, scan history is encrypted locally using AES-256-GCM with non-extractable keys in browser IndexedDB, leaving zero sensitive data on any external server.",
      tags: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "PWA", "AES-256-GCM", "LLM APIs"],
      features: [
        "Deterministic rule engine + LLM merged verdict with zero fake statistics",
        "Exact trigger highlighting isolating suspicious phrases in original message",
        "Client-side AES-256-GCM encrypted scan history in IndexedDB (non-extractable key)",
        "Regional pattern packs for UPI/KYC, ECOWAS, LATAM, and CN scam vocabularies",
        "Installable Progressive Web App (PWA) with offline capabilities"
      ],
      challenges: [
        "Preventing false confidence and AI hallucinations on subtle phishing vectors",
        "Securing sensitive scan history without creating backend privacy liabilities",
        "Achieving instant sub-350ms analysis without waiting on heavy cloud roundtrips"
      ],
      solutions: [
        "Designed a dual-engine architecture: local deterministic heuristics execute instantly, followed by hedged LLM verification",
        "Implemented client-side cryptography via Web Crypto API with non-extractable AES-GCM keys",
        "Packaged as a lightweight PWA with local service worker caching for near-instant cold starts"
      ],
      github: "https://github.com/Maazkhan96271/scamshield",
      live: "https://scamshield-jet.vercel.app",
      liveText: "Launch Live App (scamshield-jet.vercel.app) ↗",
      embedUrl: "https://scamshield-jet.vercel.app"
    },
    "hospital-management-system": {
      title: "Hospital Management System (HMS)",
      shortDescription: "Full-stack healthcare operations platform featuring secure role-based portals for Admins, Doctors, and Patients.",
      fullDescription: "A comprehensive, multi-portal hospital operating system engineered to streamline patient appointment scheduling, staff coordination, and medical history tracking. Developed as part of Modern Application Development (MAD 1), HMS enforces strict role-based access control (RBAC) across three distinct portals: an Admin dashboard for staff CRUD and clinic telemetry, a Doctor workspace for 7-day schedule management and treatment logging, and a self-service Patient portal with real-time doctor search, slot reservation, and automated double-booking prevention.",
      tags: ["Python", "Flask", "FastAPI", "SQLite", "SQLAlchemy", "Bootstrap 5", "Next.js", "Flask-Login"],
      features: [
        "Three isolated role-based portals (Admin, Doctor, Patient) with session-based authentication",
        "Real-time doctor discovery filtered by department, specialization, and 7-day availability",
        "Zero-conflict appointment scheduling engine preventing double-booking overlaps",
        "Comprehensive diagnosis, prescription, and treatment note logging against completed visits",
        "Dual-backend architecture bridging Flask/FastAPI with SQLite and modern Next.js frontend"
      ],
      challenges: [
        "Preventing race conditions and concurrent double-booking of doctor time slots",
        "Enforcing strict data access boundaries between doctor records and patient histories",
        "Managing relational database integrity with dynamic doctor availability windows"
      ],
      solutions: [
        "Implemented atomic database transactions and slot validation rules at the ORM layer",
        "Constructed role-checking decorators (@admin_required, @doctor_required) in Flask/FastAPI",
        "Designed normalized relational schemas in SQLAlchemy with indexing on doctor IDs and timestamps"
      ],
      github: "https://github.com/Maazkhan96271/Hospital-Management-System",
      live: "https://hospital-management-system-spammer.vercel.app",
      liveText: "Launch Live App (hospital-management-system-spammer.vercel.app) ↗",
      embedUrl: null
    },
    "gst-recon-agent": {
      title: "Recon-Agent — GST ITC Reconciliation Engine",
      shortDescription: "Autonomous multi-agent GST Input Tax Credit (ITC) reconciliation & recovery engine built for AWS First Commit 2026.",
      fullDescription: "Recon-Agent is an autonomous compliance intelligence platform built for the WeMakeDevs AWS First Commit 2026 hackathon. It automates GST Input Tax Credit recovery under Indian GST Rule 88D and Section 16(2)(aa). Orchestrated using AWS Bedrock foundation models and the Strands agentic SDK, the system continuously ingests GSTR-2B vs GSTR-3B filings, detects invoice discrepancies, calculates tax liability deltas, and dispatches multi-channel supplier follow-ups with immutable DynamoDB audit trails.",
      tags: ["AWS Bedrock", "Strands SDK", "Python", "FastAPI", "DynamoDB", "React 19", "Vite 7", "Streamlit"],
      features: [
        "Autonomous multi-agent reconciliation pipeline matching purchase registers against GST portal fixtures",
        "Strict regulatory compliance engine encoding GST Rule 88D and Section 16(2)(aa) constraints",
        "AWS Bedrock LLM integration for automated discrepancy justification and supplier recovery drafts",
        "Dual-surface frontend: responsive React 19 + Vite product dashboard and Streamlit compliance console",
        "FastAPI orchestration gateway with DynamoDB audit logging for end-to-end trace verification"
      ],
      challenges: [
        "Processing high-volume tabular tax filings without losing precision or hallucinating deltas",
        "Unifying two different interfaces (Streamlit console and React dashboard) to a single backend source of truth",
        "Orchestrating multi-agent state machines reliably within cloud latency targets"
      ],
      solutions: [
        "Separated deterministic ledger math from LLM explanation: all deltas computed programmatically",
        "Built a centralized /api/dispatch gateway in FastAPI consumed equally by both frontend surfaces",
        "Integrated Strands SDK agent loops with structured JSON schemas and fallback engines for zero-cloud offline demos"
      ],
      github: "https://github.com/Maazkhan96271/gst-recon-agent",
      live: "https://github.com/Maazkhan96271/gst-recon-agent",
      liveText: "View Engine on GitHub ↗",
      embedUrl: null
    },
    "b2b-vendor-compliance": {
      title: "B2B Vendor Onboarding & Compliance Platform",
      shortDescription: "Enterprise vendor risk and compliance onboarding platform built during Semester 1 OJT at Polaris School of Technology.",
      fullDescription: "Developed as a 1-month intensive project during Semester 1 On-Job-Training (OJT) at Polaris School of Technology. The platform replaces fragmented email onboarding workflows with a centralized compliance portal. It automates vendor credential verification, monitors document expiration dates, and calculates operational risk scores without relying on bulky external frameworks or complex database dependencies.",
      tags: ["Vanilla JavaScript", "Bootstrap 5", "HTML5", "CSS3", "State Machine", "Enterprise UX"],
      features: [
        "Centralized vendor risk dashboard with real-time compliance scoring and document status badges",
        "Automated expiration monitoring system generating proactive renewal alerts",
        "Client-side reactive state machine handling multi-step vendor approval lifecycles",
        "Zero-dependency architecture proving enterprise logic execution with vanilla JavaScript and Bootstrap 5",
        "Audit log viewer tracking compliance transitions and submission milestones"
      ],
      challenges: [
        "Maintaining complex multi-step enterprise approval state without a backend server",
        "Validating multifaceted vendor tax, legal, and operational documents with clean UX",
        "Ensuring rapid client-side search and filtering across simulated vendor directories"
      ],
      solutions: [
        "Engineered an event-driven state machine stored in structured browser local storage with transactional updates",
        "Designed a modular validation schema validating GSTIN, PAN, and certificate expiry dates",
        "Implemented debounced DOM search queries rendering instantaneous UI updates"
      ],
      github: "https://github.com/Maazkhan96271/b2b-vendor-onboarding-compliance-ojt-sem1-pst",
      live: "https://github.com/Maazkhan96271/b2b-vendor-onboarding-compliance-ojt-sem1-pst",
      liveText: "View Repository on GitHub ↗",
      embedUrl: null
    },
    "ai-portfolio": {
      title: "AI-Native Developer Portfolio & Assistant",
      shortDescription: "High-performance developer editorial portfolio with zero-runtime frameworks, live AI knowledge mesh, and IDE cards.",
      fullDescription: "A developer portfolio engineered with a focus on web fundamentals and craft. Built completely framework-free in vanilla HTML5, CSS3, and modern JavaScript, achieving a perfect 100/100 Lighthouse performance score and sub-second load times. Features a GitHub Dark / VS Code editorial aesthetic inspired by top engineers, interactive physics tech chips, deep-dive architecture modal explorer, and an instant-response AI assistant drawer.",
      tags: ["Vanilla JavaScript", "HTML5", "CSS3", "Design Systems", "Knowledge Mesh", "GitHub Pages"],
      features: [
        "Zero-build vanilla web architecture deploying seamlessly to GitHub Pages",
        "GitHub Dark / VS Code editorial aesthetic with warm terracotta (#D97757) accents",
        "Interactive physics tech tags with cursor momentum and hover velocity",
        "Integrated 'Ask Maaz AI' conversation drawer powered by an in-memory knowledge mesh",
        "Persistent dark/light theme engine and responsive mobile drawer navigation"
      ],
      challenges: [
        "Achieving modern React/Next.js visual polish and interactivity without framework overhead",
        "Maintaining responsive perfection from mobile screens to 4K displays",
        "Designing an AI assistant with zero server cost and instantaneous response latency"
      ],
      solutions: [
        "Leveraged modern CSS custom properties, clamp() typography, and hardware-accelerated transforms",
        "Built an in-memory keyword-scored knowledge mesh responding in < 400ms without backend cold starts",
        "Automated continuous deployment via GitHub Pages on git push"
      ],
      github: "https://github.com/Maazkhan96271/maazkhan-ai-portfolio",
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/",
      liveText: "Launch Live Portfolio ↗",
      embedUrl: null
    }
  };

  /* ---------- 2. Theme Engine ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("mk_theme") || "dark";
  root.setAttribute("data-theme", storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("mk_theme", next);
      showToast(next === "dark" ? "Dark mode on" : "Light mode on");
    });
  }

  /* ---------- 3. Sticky Navigation & ScrollSpy ---------- */
  const headerNav = document.getElementById("headerNav");
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (headerNav) {
      headerNav.classList.toggle("stuck", y > 30);
    }

    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      if (y >= top) {
        current = sec.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  // Mobile menu drawer
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    mobileDrawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  /* ---------- 4. Interactive Tech Chips (Gaurav style) ---------- */
  document.querySelectorAll(".interactive-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.style.transform = "scale(0.92) rotate(-3deg)";
      setTimeout(() => {
        chip.style.transform = "scale(1.08) rotate(3deg)";
      }, 100);
      setTimeout(() => {
        chip.style.transform = "";
      }, 250);
    });
  });

  /* ---------- 5. Project Architecture Modal ---------- */
  const modalBackdrop = document.getElementById("archModalBackdrop");
  const modalClose = document.getElementById("archModalClose");
  const modalTitle = document.getElementById("archModalTitle");
  const modalTags = document.getElementById("archModalTags");
  const modalLive = document.getElementById("archModalLive");
  const modalLiveText = document.getElementById("archModalLiveText");
  const modalGithub = document.getElementById("archModalGithub");
  const modalOverview = document.getElementById("archModalOverview");
  const modalFeatures = document.getElementById("archModalFeatures");
  const modalChallenges = document.getElementById("archModalChallenges");
  const modalSolutions = document.getElementById("archModalSolutions");

  const liveFrameWrap = document.getElementById("archLiveFrameWrap");
  const liveFrameUrl = document.getElementById("archFrameUrl");
  const liveFrameExternal = document.getElementById("archFrameExternal");
  const liveIframe = document.getElementById("archLiveIframe");

  function openArchModal(id) {
    const data = PROJECTS_ARCH[id];
    if (!data || !modalBackdrop) return;

    modalTitle.textContent = data.title;

    modalTags.innerHTML = data.tags
      .map((t) => `<span class="syntax-tag">${t}</span>`)
      .join("");

    if (data.live) {
      modalLive.href = data.live;
      modalLive.style.display = "inline-flex";
      if (modalLiveText) {
        modalLiveText.textContent = data.liveText || "Launch Live App ↗";
      }
    } else {
      modalLive.style.display = "none";
    }

    if (data.github) {
      modalGithub.href = data.github;
      modalGithub.style.display = "inline-flex";
    } else {
      modalGithub.style.display = "none";
    }

    // Embedded live iframe if supported
    if (liveFrameWrap && liveIframe) {
      if (data.embedUrl) {
        liveFrameWrap.style.display = "block";
        liveIframe.src = data.embedUrl;
        if (liveFrameUrl) liveFrameUrl.textContent = data.embedUrl;
        if (liveFrameExternal) liveFrameExternal.href = data.embedUrl;
      } else {
        liveFrameWrap.style.display = "none";
        liveIframe.src = "about:blank";
      }
    }

    modalOverview.textContent = data.fullDescription || data.shortDescription;

    modalFeatures.innerHTML = data.features
      .map((f) => `<li>${f}</li>`)
      .join("");

    modalChallenges.innerHTML = data.challenges
      .map((c) => `<li>${c}</li>`)
      .join("");

    modalSolutions.innerHTML = data.solutions
      .map((s) => `<li>${s}</li>`)
      .join("");

    modalBackdrop.classList.add("open");
    document.body.classList.add("locked");
  }

  function closeArchModal() {
    if (!modalBackdrop) return;
    if (liveIframe) liveIframe.src = "about:blank";
    modalBackdrop.classList.remove("open");
    document.body.classList.remove("locked");
  }

  document.querySelectorAll("[data-open-arch]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = trigger.getAttribute("data-open-arch");
      openArchModal(id);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeArchModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeArchModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeArchModal();
      closeAiChat();
    }
  });

  /* ---------- 6. Floating Guide Bar (Bottom Notification) ---------- */
  const guideBar = document.getElementById("floatingGuideBar");
  const guideClose = document.getElementById("guideCloseBtn");

  if (guideClose && guideBar) {
    guideClose.addEventListener("click", () => {
      guideBar.classList.add("dismissed");
    });
  }

  /* ---------- 7. AI Assistant ("Ask Maaz AI") ---------- */
  const aiChatBackdrop = document.getElementById("aiChatBackdrop");
  const aiChatDrawer = document.getElementById("aiChatDrawer");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatLog = document.getElementById("chatLog");

  function openAiChat() {
    if (!aiChatDrawer) return;
    aiChatDrawer.classList.add("open");
    if (aiChatBackdrop) aiChatBackdrop.classList.add("open");
    if (chatInput) chatInput.focus();
  }

  function closeAiChat() {
    if (!aiChatDrawer) return;
    aiChatDrawer.classList.remove("open");
    if (aiChatBackdrop) aiChatBackdrop.classList.remove("open");
  }

  document.querySelectorAll("[data-open-ai]").forEach((btn) => {
    btn.addEventListener("click", openAiChat);
  });

  if (closeChatBtn) closeChatBtn.addEventListener("click", closeAiChat);
  if (aiChatBackdrop) aiChatBackdrop.addEventListener("click", closeAiChat);

  // Knowledge base for Maaz's AI responses
  const AI_KNOWLEDGE = [
    {
      keywords: ["project", "built", "work", "portfolio", "app", "scamshield", "hospital", "recon"],
      answer: "Maaz has built 5 production and open-source applications (all live or accessible on GitHub):\n\n1. **ScamShield** (Next.js 16 · React 19 · PWA)\n• AI scam risk analyzer merging deterministic heuristics with LLM inference\n• Client-side AES-256-GCM encrypted scan history in IndexedDB\n• **Live App**: https://scamshield-jet.vercel.app\n• **GitHub**: https://github.com/Maazkhan96271/scamshield\n\n2. **Hospital Management System (HMS)**\n• Full-stack healthcare platform in Python/Flask, SQLite, FastAPI, Next.js\n• 3 role-based portals (Admin, Doctor, Patient) with conflict-free booking\n• **Live App**: https://hospital-management-system-spammer.vercel.app\n• **GitHub**: https://github.com/Maazkhan96271/Hospital-Management-System\n\n3. **Recon-Agent (GST ITC AI Engine)**\n• Autonomous multi-agent tax recovery engine for AWS First Commit 2026\n• Powered by AWS Bedrock, Strands SDK, and DynamoDB\n• **GitHub**: https://github.com/Maazkhan96271/gst-recon-agent\n\n4. **B2B Vendor Compliance Platform**\n• Enterprise onboarding platform from Polaris Semester 1 OJT\n• Centralized risk scoring, document expiry tracking, and state machines\n• **GitHub**: https://github.com/Maazkhan96271/b2b-vendor-onboarding-compliance-ojt-sem1-pst\n\n5. **AI-Native Developer Portfolio**\n• Zero-framework, 100/100 Lighthouse performance portfolio with this AI drawer\n• **Live App**: https://maazkhan96271.github.io/maazkhan-ai-portfolio/\n• **GitHub**: https://github.com/Maazkhan96271/maazkhan-ai-portfolio"
    },
    {
      keywords: ["who", "about", "student", "polaris", "maaz", "education", "admission", "college", "university"],
      answer: "Maaz Khan is an **Applied AI student** at Polaris School of Technology in Bengaluru, India (admitted in **2026**, Class of 2026–2030). He builds production AI-assisted web platforms (Next.js, React, Flask, FastAPI), C++ systems, and enterprise compliance tools with a clear mission to become a world-class Software Engineer by **2030**."
    },
    {
      keywords: ["skill", "tech", "stack", "language", "python", "c++", "react", "nextjs", "tools"],
      answer: "Maaz's core technical stack includes:\n• **Languages**: Python, TypeScript, JavaScript (ES6+), C++20, SQL\n• **Frontend & Frameworks**: Next.js 16, React 19, Tailwind CSS v4, Bootstrap 5, PWA\n• **Backend & AI**: Flask, FastAPI, AWS Bedrock, Strands SDK, SQLAlchemy, SQLite, Node.js\n• **Tools & Systems**: Git, Docker, Linux, DynamoDB, IndexedDB (AES-256-GCM), VS Code"
    },
    {
      keywords: ["contact", "hire", "email", "internship", "reach", "message", "discord", "linkedin"],
      answer: "You can connect with Maaz directly:\n• **Email**: maazkhan96271@gmail.com\n• **LinkedIn**: linkedin.com/in/maaz-khan-9124232bb/\n• **GitHub**: github.com/Maazkhan96271\n• **Discord**: @maazkhan-26796\nHe is actively open for Software Engineering internships and technical collaborations!"
    },
    {
      keywords: ["goal", "2030", "career", "future"],
      answer: "Maaz's primary milestone is to excel as a top-tier Software Engineer by **2030**, engineering high-scale distributed architectures, resilient full-stack systems, and cutting-edge applied AI products."
    }
  ];

  function getAiResponse(query) {
    const q = query.toLowerCase();
    for (const item of AI_KNOWLEDGE) {
      if (item.keywords.some((k) => q.includes(k))) {
        return item.answer;
      }
    }
    return `Maaz is an Applied AI student at Polaris School of Technology building AI-assisted web apps and C++ systems. Feel free to ask about his **projects**, **skills**, **education**, or **how to contact him**!`;
  }

  function appendChatMessage(text, sender) {
    if (!chatLog) return;
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text.replace(/\n/g, "<br>");
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;

      appendChatMessage(val, "user");
      chatInput.value = "";

      // Typing simulation
      setTimeout(() => {
        const reply = getAiResponse(val);
        appendChatMessage(reply, "bot");
      }, 450);
    });
  }

  // Quick suggestion buttons
  document.querySelectorAll(".suggestion-pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.trim();
      appendChatMessage(text, "user");
      setTimeout(() => {
        const reply = getAiResponse(text);
        appendChatMessage(reply, "bot");
      }, 450);
    });
  });

  /* ---------- 8. Contact Form Validation & Submission ---------- */
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("contactSendBtn");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm && sendBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("formName");
      const email = document.getElementById("formEmail");
      const message = document.getElementById("formMessage");

      const errName = document.getElementById("errName");
      const errEmail = document.getElementById("errEmail");
      const errMessage = document.getElementById("errMessage");

      let valid = true;

      if (!name.value.trim()) {
        errName.classList.add("show");
        valid = false;
      } else {
        errName.classList.remove("show");
      }

      if (!isValidEmail(email.value.trim())) {
        errEmail.classList.add("show");
        valid = false;
      } else {
        errEmail.classList.remove("show");
      }

      if (!message.value.trim()) {
        errMessage.classList.add("show");
        valid = false;
      } else {
        errMessage.classList.remove("show");
      }

      if (!valid) return;

      sendBtn.classList.add("loading");
      sendBtn.disabled = true;

      setTimeout(() => {
        sendBtn.classList.remove("loading");
        sendBtn.disabled = false;
        contactForm.reset();
        showToast("Message sent successfully! I'll get back to you shortly.");
      }, 1000);
    });
  }

  /* ---------- 9. Toast Notification ---------- */
  const toast = document.getElementById("actionToast");
  let toastTimeout;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied ${val} to clipboard!`);
      });
    });
  });

  // Footer year
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
