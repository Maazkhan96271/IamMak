/* ============================================================
   Maaz Khan — Portfolio Logic (Aditya Pillai Architecture)
   ============================================================ */

(() => {
  "use strict";

  /* ---------- 1. Projects Data (Architecture & Modals) ---------- */
  const PROJECTS_DATA = {
    "prompt-playground": {
      title: "Prompt Playground",
      shortDescription: "High-performance LLM prompt experimentation sandbox for evaluating completions side-by-side with latency benchmarking and variant scoring.",
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
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/#projects",
      featured: true
    },
    "studymate-ai": {
      title: "StudyMate AI",
      shortDescription: "Intelligent study companion that transforms unstructured lecture notes and PDFs into structured summaries, active-recall flashcards, and practice exams.",
      fullDescription: "StudyMate AI is an educational productivity platform built for university students. Leveraging NLP and generative AI, it digests complex course material, extracts foundational concepts, and dynamically generates spaced-repetition flashcards and adaptive mock quizzes to reinforce long-term concept retention.",
      tags: ["Python", "Flask", "LangChain", "React", "NLP", "TailwindCSS"],
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
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/#projects",
      featured: true
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
      live: "https://github.com/Maazkhan96271",
      featured: true
    },
    "ai-portfolio": {
      title: "AI-Native Portfolio",
      shortDescription: "High-performance developer portfolio featuring interactive particle physics, dark/light ambient themes, full project architecture modals, and built-in AI assistant.",
      fullDescription: "Designed and engineered as a showcase of modern web architecture and UI/UX design. Built from the ground up without heavy frameworks to achieve near-instant initial render times, smooth 60fps animations, interactive constellation particles, keyboard accessibility, and an intelligent interactive assistant.",
      tags: ["JavaScript", "HTML5", "CSS3", "Canvas API", "LLM Integration"],
      features: [
        "Interactive constellation canvas with collision physics and distance-based link rendering",
        "Adaptive dark/light theme engine persisted across visits",
        "Deep architecture project modals with tabbed challenge/solution breakdowns",
        "Live AI conversation interface with streaming responses",
        "Command palette (⌘K) for rapid keyboard-driven navigation"
      ],
      challenges: [
        "Rendering smooth particle networks on high-DPI displays without GPU throttling",
        "Recreating sophisticated React-style micro-interactions in pure vanilla JavaScript",
        "Managing responsive layout shifts across mobile, tablet, and widescreen displays"
      ],
      solutions: [
        "Implemented requestAnimationFrame loop with device pixel ratio scaling and particle culling",
        "Used CSS custom properties and hardware-accelerated transforms for fluid 60fps rendering",
        "Applied strict mobile-first design tokens with fluid typography and clamp() scaling"
      ],
      github: "https://github.com/Maazkhan96271/maazkhan-ai-portfolio",
      live: "https://maazkhan96271.github.io/maazkhan-ai-portfolio/",
      featured: false
    }
  };

  /* ---------- 2. Intro Loader ---------- */
  const loader = document.getElementById("introLoader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("done");
      }, 1400);
    });
    // Fallback timer if load event already triggered
    setTimeout(() => {
      if (!loader.classList.contains("done")) {
        loader.classList.add("done");
      }
    }, 2200);
  }

  /* ---------- 3. Theme Toggle Engine ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("mk_theme") || "dark";
  root.setAttribute("data-theme", storedTheme);

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("mk_theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
      showToast(next === "dark" ? "Dark mode enabled" : "Light mode enabled");
    });
  }

  /* ---------- 4. Interactive Constellation Canvas ---------- */
  const canvas = document.getElementById("particlesCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    const PARTICLE_COUNT = Math.min(80, Math.floor((width * height) / 14000));
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 1.2;
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = (Math.random() - 0.5) * 0.9;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }
      draw(color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const isDark = root.getAttribute("data-theme") !== "light";
      const dotColor = isDark ? "rgba(184, 242, 230, 0.65)" : "rgba(94, 100, 114, 0.65)";
      const linkColorRgb = isDark ? "184, 242, 230" : "94, 100, 114";

      // Draw connections
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${linkColorRgb}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(dotColor);
      });

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  /* ---------- 5. Navbar Sticky & ScrollSpy ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.classList.toggle("stuck", y > 24);
    }

    // Active link highlighting
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (y >= top) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  // Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    mobileDrawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  /* ---------- 6. Project Modal System ---------- */
  const modalOverlay = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalTags = document.getElementById("modalTags");
  const modalLive = document.getElementById("modalLive");
  const modalGithub = document.getElementById("modalGithub");
  const modalDesc = document.getElementById("modalDesc");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalChallenges = document.getElementById("modalChallenges");
  const modalSolutions = document.getElementById("modalSolutions");

  function openProjectModal(projectId) {
    const p = PROJECTS_DATA[projectId];
    if (!p || !modalOverlay) return;

    modalTitle.textContent = p.title;

    // Tags
    modalTags.innerHTML = p.tags
      .map((t) => `<span class="project-tag">${t}</span>`)
      .join("");

    // Links
    if (p.live) {
      modalLive.href = p.live;
      modalLive.style.display = "inline-flex";
    } else {
      modalLive.style.display = "none";
    }

    if (p.github) {
      modalGithub.href = p.github;
      modalGithub.style.display = "inline-flex";
    } else {
      modalGithub.style.display = "none";
    }

    // Overview
    modalDesc.textContent = p.fullDescription || p.shortDescription;

    // Features
    modalFeatures.innerHTML = p.features
      .map((f) => `<li>${f}</li>`)
      .join("");

    // Challenges
    modalChallenges.innerHTML = p.challenges
      .map((c) => `<li>${c}</li>`)
      .join("");

    // Solutions
    modalSolutions.innerHTML = p.solutions
      .map((s) => `<li>${s}</li>`)
      .join("");

    modalOverlay.classList.add("open");
    document.body.classList.add("locked");
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("open");
    document.body.classList.remove("locked");
  }

  document.querySelectorAll("[data-project-id]").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't trigger modal if user clicks direct external link
      if (e.target.closest("a")) return;
      const id = card.getAttribute("data-project-id");
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
      closeProjectModal();
    }
  });

  /* ---------- 7. Contact Form Handling ---------- */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmitBtn");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("contactName");
      const emailInput = document.getElementById("contactEmail");
      const messageInput = document.getElementById("contactMessage");

      const nameErr = document.getElementById("nameError");
      const emailErr = document.getElementById("emailError");
      const messageErr = document.getElementById("messageError");

      let valid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        nameErr.classList.add("visible");
        valid = false;
      } else {
        nameErr.classList.remove("visible");
      }

      // Email validation
      if (!validateEmail(emailInput.value.trim())) {
        emailErr.classList.add("visible");
        valid = false;
      } else {
        emailErr.classList.remove("visible");
      }

      // Message validation
      if (!messageInput.value.trim()) {
        messageErr.classList.add("visible");
        valid = false;
      } else {
        messageErr.classList.remove("visible");
      }

      if (!valid) return;

      // Submit state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        contactForm.reset();
        showToast("Message sent successfully! I'll get back to you soon.");
      }, 1200);
    });
  }

  /* ---------- 8. Floating Toast Notification ---------- */
  const toast = document.getElementById("floatingToast");
  let toastTimer;

  function showToast(message, isError = false) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
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

  // Back to top button
  const toTopBtn = document.getElementById("toTopBtn");
  if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Current Year in footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- 9. Hero Name Letter By Letter Animation ---------- */
  const heroNameEl = document.getElementById("heroAnimatedName");
  if (heroNameEl) {
    const text = heroNameEl.textContent.trim();
    heroNameEl.innerHTML = "";
    text.split("").forEach((char, idx) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(16px)";
      span.style.transition = `opacity 0.4s ease ${0.2 + idx * 0.03}s, transform 0.4s ease ${0.2 + idx * 0.03}s`;
      heroNameEl.appendChild(span);
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "none";
      }, 50);
    });
  }
})();
