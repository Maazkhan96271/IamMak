/* ============================================================
   Maaz Khan — Portfolio Scripts
   Interactive UI, Project Modals, Floating Guide Bar, AI Assistant
   ============================================================ */

(() => {
  "use strict";

  /* ---------- 1. Projects Architecture Data ---------- */
  const PROJECTS_ARCH = {
    "prompt-playground": {
      title: "Prompt Playground",
      shortDescription: "High-performance LLM experimentation sandbox for evaluating model completions side-by-side with latency benchmarking and variant scoring.",
      fullDescription: "Prompt Playground is an AI developer workspace designed to streamline prompt engineering workflows. Developers can run concurrent model inferences across different parameter configurations (temperature, top-p, system instructions), compare multi-turn completions side-by-side, benchmark latency and token consumption, and export the best-performing prompts directly into production code.",
      tags: ["React", "TypeScript", "LLM APIs", "FastAPI", "TailwindCSS"],
      features: [
        "Side-by-side multi-model comparison interface with real-time streaming tokens",
        "Dynamic system prompt and variable substitution engine",
        "Latency, token count, and cost estimation telemetry",
        "Preset library with version control for experiment iterations",
        "One-click code snippet export in Python, TypeScript, and cURL"
      ],
      challenges: [
        "Handling simultaneous streaming responses across heterogeneous API providers without UI stutter",
        "Managing persistent prompt version histories in browser storage while keeping state lightweight",
        "Calculating token metrics accurately across differing tokenizers (cl100k_base, sentencepiece)"
      ],
      solutions: [
        "Architected an asynchronous worker queue utilizing Web Streams API for lag-free token updates",
        "Implemented an indexed storage schema with delta snapshots for prompt history management",
        "Integrated lightweight client-side BPE tokenizer approximations for instant metrics"
      ],
      github: "https://github.com/Maazkhan96271",
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/#projects"
    },
    "studymate-ai": {
      title: "StudyMate AI",
      shortDescription: "Intelligent study companion that transforms unstructured lecture notes and PDFs into structured summaries, active-recall flashcards, and practice exams.",
      fullDescription: "StudyMate AI is an educational productivity platform built for university students. Leveraging NLP and generative AI, it digests complex course material, extracts foundational concepts, and dynamically generates spaced-repetition flashcards and adaptive mock quizzes to reinforce long-term concept retention.",
      tags: ["Python", "Flask", "LangChain", "React", "NLP"],
      features: [
        "Multimodal document ingestion supporting raw text, Markdown, and PDF lecture slides",
        "Recursive hierarchical summarization for long-context lecture transcripts",
        "Automated flashcard synthesis with spaced repetition interval scheduling",
        "Interactive quiz generation with automated explanation of incorrect choices",
        "Exportable study guides in Anki and Markdown formats"
      ],
      challenges: [
        "Preventing hallucinated questions when processing dense technical subjects",
        "Chunking long lecture transcripts without splitting critical context or definitions",
        "Optimizing API response latency when processing multi-page documents"
      ],
      solutions: [
        "Built context-aware semantic chunking pipelines preserving heading hierarchies",
        "Enforced strict JSON schema validation and verification loops on model outputs",
        "Implemented background chunk processing with incremental streaming feedback"
      ],
      github: "https://github.com/Maazkhan96271",
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/#projects"
    },
    "dsa-drill": {
      title: "DSA Drill",
      shortDescription: "Terminal-based spaced repetition CLI tool designed in modern C++ to drill data structures and algorithmic patterns before technical interviews.",
      fullDescription: "DSA Drill is an interactive command-line application built for aspiring software engineers. Instead of passive memorization, DSA Drill forces active recall of critical patterns (two pointers, sliding window, topological sort, monotonic stack) through timed terminal drills, performance tracking, and spaced repetition intervals.",
      tags: ["C++20", "Algorithms", "CLI", "Data Structures", "Linux"],
      features: [
        "Curated library of 100+ fundamental patterns categorized by complexity and frequency",
        "SuperMemo-2 (SM-2) spaced repetition algorithm tailored to problem-solving drills",
        "Interactive CLI with colored syntax highlighting and progress visualization",
        "Local persistent telemetry tracking speed, accuracy, and confidence curves",
        "Custom pattern authoring workflow in simple YAML format"
      ],
      challenges: [
        "Ensuring zero external dependency bloat while delivering a responsive TUI",
        "Designing a cross-platform ANSI escape sequencing engine for terminal rendering",
        "Modeling efficient in-memory graph and tree data structures in modern C++"
      ],
      solutions: [
        "Authored the core TUI renderer from scratch using POSIX terminal control sequences",
        "Utilized modern C++20 standard library features (concepts, ranges) for minimal binary size",
        "Serialized flashcard mastery data into lightweight binary storage for sub-millisecond startup"
      ],
      github: "https://github.com/Maazkhan96271",
      live: "https://github.com/Maazkhan96271"
    },
    "ai-portfolio": {
      title: "AI-Native Portfolio",
      shortDescription: "High-performance developer portfolio featuring interactive physics chips, dark/light themes, project architecture modals, and built-in AI assistant.",
      fullDescription: "Designed and engineered as a showcase of modern web architecture and UI/UX design. Built from the ground up without heavy frameworks to achieve near-instant initial render times, smooth 60fps animations, keyboard accessibility, and an intelligent interactive assistant.",
      tags: ["JavaScript", "HTML5", "CSS3", "Design Systems", "AI Assistant"],
      features: [
        "Two-column editorial hero layout with profile glow ring and telemetry badges",
        "Adaptive dark/light theme engine persisted across visits",
        "Deep architecture project modals with technical challenge breakdowns",
        "Integrated AI conversation interface with instant domain answers",
        "Interactive physics-style tech chips and guide notification bar"
      ],
      challenges: [
        "Recreating modern Next.js/React design fidelity in clean, framework-free vanilla code",
        "Maintaining responsive perfection across mobile, tablet, and ultra-wide screens",
        "Balancing rich interactive elements with lightning-fast load times"
      ],
      solutions: [
        "Organized CSS with modular custom property tokens and fluid clamp() typography",
        "Implemented GPU-accelerated transforms for jitter-free micro-interactions",
        "Constructed an in-memory knowledge graph for zero-latency AI responses"
      ],
      github: "https://github.com/Maazkhan96271/maazkhan-ai-portfolio",
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/"
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
  const modalGithub = document.getElementById("archModalGithub");
  const modalOverview = document.getElementById("archModalOverview");
  const modalFeatures = document.getElementById("archModalFeatures");
  const modalChallenges = document.getElementById("archModalChallenges");
  const modalSolutions = document.getElementById("archModalSolutions");

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
    } else {
      modalLive.style.display = "none";
    }

    if (data.github) {
      modalGithub.href = data.github;
      modalGithub.style.display = "inline-flex";
    } else {
      modalGithub.style.display = "none";
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
      keywords: ["project", "built", "work", "portfolio"],
      answer: "Maaz has built 4 key applications:\n1. **Prompt Playground** — Side-by-side LLM experimentation sandbox with latency & token metrics.\n2. **StudyMate AI** — Lecture note summarizer and active-recall flashcard generator using NLP.\n3. **DSA Drill** — Modern C++20 terminal spaced repetition tool for algorithmic interview patterns.\n4. **AI-Native Portfolio** — The fast, responsive portfolio you're exploring right now!"
    },
    {
      keywords: ["who", "about", "student", "polaris", "maaz"],
      answer: "Maaz Khan is an **Applied AI student** at Polaris School of Technology in Bengaluru, India. He builds AI-native web experiences, C++ systems, and modern React applications with a mission to become a top Software Engineer by **2030**."
    },
    {
      keywords: ["skill", "tech", "stack", "language", "python", "c++", "react"],
      answer: "Maaz's core stack includes:\n• **Languages**: Python, C++, JavaScript (ES6+), Java, TypeScript, SQL\n• **Frontend**: React, Next.js, Tailwind CSS, Canvas API, Vite\n• **AI & Backend**: LLM APIs, LangChain, Prompt Engineering, FastAPI, Flask, Node.js\n• **Tools**: Git, Docker, Linux, Postman, VS Code"
    },
    {
      keywords: ["contact", "hire", "email", "internship", "reach", "message", "discord"],
      answer: "You can reach Maaz directly at:\n• **Email**: maazkhan96271@gmail.com\n• **LinkedIn**: linkedin.com/in/maaz-khan-9124232bb/\n• **Discord**: @maazkhan-26796\n• **GitHub**: github.com/Maazkhan96271\nHe is open for software engineering internships and collaborations!"
    },
    {
      keywords: ["goal", "2030", "career", "future"],
      answer: "Maaz's primary goal is to become an exceptional Software Engineer by **2030**, working on high-impact systems, distributed architectures, and AI-native products with teams that ship fast and care about engineering craft."
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
