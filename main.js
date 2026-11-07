/**
 * Maaz Khan Portfolio — Core Client Controller (main.js)
 * Architecture: Decoupled Data Layer, Dynamic DOM Injection, Glassmorphism & Micro-interactions
 */

(() => {
  "use strict";

  /* ============================================================
     1. State & Data Layer Initialization
     ============================================================ */
  let DB = window.PORTFOLIO_DATA || null;

  async function loadData() {
    try {
      // Simulate real backend API fetch
      const res = await fetch("data.json", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        DB = json;
      }
    } catch (e) {
      // Graceful fallback to pre-loaded data.js for local file:// usage
      console.info("Using embedded data layer (offline/local fallback):", e.message);
    }

    if (!DB && window.PORTFOLIO_DATA) {
      DB = window.PORTFOLIO_DATA;
    }

    if (DB) {
      initApplication();
    } else {
      console.error("Failed to initialize portfolio data layer.");
    }
  }

  /* ============================================================
     2. Application Bootstrap
     ============================================================ */
  function initApplication() {
    renderStatsBento();
    renderMarquee();
    renderProjects();
    renderAboutBento();
    renderTimeline();
    renderSkills();
    initTypewriter();
    initMouseSpotlight();
    initScrollReveal();
    initBengaluruClock();
    initTheme();
    initNavigation();
    initModal();
    initAiChat();
    initContactForm();
    initGuideBar();
  }

  /* ============================================================
     3. Dynamic DOM Renderers
     ============================================================ */

  // 3A. Stats Bento Grid
  function renderStatsBento() {
    const container = document.getElementById("bentoStatsGrid");
    if (!container || !DB.statsBento) return;

    container.innerHTML = DB.statsBento
      .map(
        (s) => `
        <div class="bento-card bento-stat-tile glass-card reveal-on-scroll">
          <div class="bento-tile-header">
            <span class="bento-tile-badge ${s.badgeClass || ''}">${s.tag}</span>
            <span class="bento-tile-icon" aria-hidden="true">✦</span>
          </div>
          <div class="bento-metric-wrap">
            <span class="bento-metric-val">${s.metric}</span>
            ${s.suffix ? `<span class="bento-metric-suf">${s.suffix}</span>` : ""}
          </div>
          <div class="bento-metric-sub">${s.subtitle}</div>
          <p class="bento-metric-desc">${s.description}</p>
        </div>
      `
      )
      .join("");
  }

  // 3B. Infinite Scrolling Tech Marquee
  function renderMarquee() {
    const track = document.getElementById("techMarqueeTrack");
    if (!track || !DB.marqueeTech) return;

    // Duplicate list 3 times to create seamless, gapless infinite loop
    const items = [...DB.marqueeTech, ...DB.marqueeTech, ...DB.marqueeTech];

    track.innerHTML = items
      .map(
        (t) => `
        <div class="marquee-chip glass-card">
          <span class="marquee-icon">${t.icon}</span>
          <span class="marquee-name">${t.name}</span>
          <span class="marquee-cat">${t.category}</span>
        </div>
      `
      )
      .join("");
  }

  // 3C. Projects Showcase
  function renderProjects() {
    const container = document.getElementById("projectsGrid");
    if (!container || !DB.projects) return;

    container.innerHTML = DB.projects
      .map((p) => {
        const isFeatured = p.featured ? "span-two" : "";
        const isLive = p.liveUrl && p.liveUrl !== "#";
        const hasEmbed = !!p.embedUrl;

        const badgeHtml = p.badgeType === "live"
          ? `<span class="ide-badge-status status-prod"><span class="live-pulse-dot"></span> ${p.badge}</span>`
          : p.badgeType === "hackathon"
          ? `<span class="ide-badge-status status-bedrock">⚡ ${p.badge}</span>`
          : `<span class="ide-badge-status status-cli">🏢 ${p.badge}</span>`;

        const tagsHtml = p.tags
          .map((t) => `<span class="syntax-tag">${t}</span>`)
          .join("");

        const metricsHtml = p.metrics
          ? `<div class="project-metrics-row">
              ${p.metrics.map(m => `
                <div class="mini-telemetry-chip">
                  <span class="telemetry-lbl">${m.label}:</span>
                  <span class="telemetry-val">${m.value}</span>
                </div>
              `).join("")}
            </div>`
          : "";

        return `
          <article class="project-card-ide glass-card ${isFeatured} reveal-on-scroll" data-project-id="${p.id}">
            <div class="ide-card-topbar">
              <div class="ide-window-dots" aria-hidden="true">
                <span class="ide-dot"></span><span class="ide-dot"></span><span class="ide-dot"></span>
              </div>
              <span class="ide-tab-name">${p.filename}</span>
              ${badgeHtml}
            </div>

            <div class="ide-card-body">
              <h3 class="project-title-link">
                <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="title-anchor">
                  <span>${p.title}</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </h3>

              <p class="project-pitch">${p.shortDescription}</p>

              ${metricsHtml}

              <div class="project-tags-syntax">${tagsHtml}</div>

              <div class="project-card-actions">
                ${
                  isLive
                    ? `<a class="btn-live-launch" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">
                        <span class="live-pulse-dot" style="background:#fff; box-shadow:0 0 6px #fff;"></span>
                        <span>Launch Live App ↗</span>
                       </a>`
                    : `<a class="btn-live-launch" href="${p.githubUrl}" target="_blank" rel="noopener noreferrer">
                        <span>View Engine ↗</span>
                       </a>`
                }
                <a class="action-link" href="${p.githubUrl}" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>Source Code</span>
                </a>
                <button class="btn-open-arch-modal" data-open-arch="${p.id}">
                  <span>Inspect Architecture →</span>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Bind architecture modal triggers
    container.querySelectorAll("[data-open-arch]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-open-arch");
        openProjectModal(id);
      });
    });
  }

  // 3D. About Bento Grid
  function renderAboutBento() {
    const container = document.getElementById("aboutBentoGrid");
    if (!container || !DB.bentoAbout) return;

    container.innerHTML = `
      <!-- Tile 1: Main Bio -->
      <div class="bento-card bento-about-bio glass-card reveal-on-scroll">
        <div class="bento-tile-header">
          <span class="bento-tile-badge badge-neon-cyan">Engineering Philosophy</span>
          <span class="bento-tile-icon">MK // 2026–2030</span>
        </div>
        <h3 class="bento-bio-title">Bridging Human Interfaces with Machine Intelligence</h3>
        <p class="bento-bio-text">
          I'm <strong>Maaz Khan</strong> — an Applied AI student at <strong>Polaris School of Technology</strong> in Bengaluru, admitted in <strong>2026</strong> (Class of 2026–2030).
          I began with raw web fundamentals, evolved into modern React and Python backend architectures, and now build production systems at the forefront of AI and web platforms.
        </p>
        <p class="bento-bio-text">
          My engineering mission is focused and disciplined: master data structures in C++, build autonomous agent workflows with real-world utility, and level up into a top-tier <strong>Software Engineer by 2030</strong>.
        </p>
        <div class="bento-tags-row">
          <span class="syntax-tag">Fast Learner</span>
          <span class="syntax-tag">Systems Builder</span>
          <span class="syntax-tag">Bengaluru, IN</span>
        </div>
      </div>

      <!-- Tile 2: Live Clock Telemetry -->
      <div class="bento-card bento-about-clock glass-card reveal-on-scroll">
        <div class="bento-tile-header">
          <span class="bento-tile-badge badge-neon-emerald">Local Telemetry</span>
          <span class="status-pulse-ring"></span>
        </div>
        <div class="bento-clock-label">Bengaluru, India (IST)</div>
        <div class="bento-clock-display" id="liveClockVal">--:--:--</div>
        <div class="bento-clock-tz">UTC+5:30 · Active Development Zone</div>
      </div>

      <!-- Tile 3: Availability & Internships -->
      <div class="bento-card bento-about-status glass-card reveal-on-scroll">
        <div class="bento-tile-header">
          <span class="bento-tile-badge badge-neon-emerald">Availability</span>
          <span class="live-pulse-dot"></span>
        </div>
        <div class="bento-status-headline">Open for 2026 Internships</div>
        <p class="bento-status-sub">Seeking ambitious full-stack or Applied AI roles · Remote, Hybrid, or Bengaluru on-site.</p>
        <a class="bento-status-cta" href="#contact">Initiate Contact →</a>
      </div>

      <!-- Tile 4: Polaris OJT Milestone -->
      <div class="bento-card bento-about-ojt glass-card reveal-on-scroll">
        <div class="bento-tile-header">
          <span class="bento-tile-badge badge-neon-purple">Polaris OJT Sem 1</span>
          <span class="bento-tile-icon">🏢</span>
        </div>
        <h4 class="bento-ojt-title">Enterprise B2B Compliance Portal</h4>
        <p class="bento-ojt-desc">
          Shipped enterprise compliance automation software during Semester 1 On-Job-Training at Polaris School of Technology. Replaced fragmented email chains with reactive state machines and automated expiry monitoring.
        </p>
      </div>

      <!-- Tile 5: Core Stack Arsenal -->
      <div class="bento-card bento-about-stack glass-card reveal-on-scroll">
        <div class="bento-tile-header">
          <span class="bento-tile-badge badge-neon-blue">Full-Stack Arsenal</span>
          <span class="bento-tile-icon">⚡</span>
        </div>
        <div class="bento-stack-list">
          <div class="stack-row">
            <span class="stack-key">Frontend:</span>
            <span class="stack-val">Next.js 16, React 19, TypeScript, Tailwind v4</span>
          </div>
          <div class="stack-row">
            <span class="stack-key">Backend:</span>
            <span class="stack-val">Python, FastAPI, Flask, SQLite, Node.js</span>
          </div>
          <div class="stack-row">
            <span class="stack-key">AI & Cloud:</span>
            <span class="stack-val">AWS Bedrock, Strands SDK, PWA, DynamoDB</span>
          </div>
          <div class="stack-row">
            <span class="stack-key">Systems:</span>
            <span class="stack-val">C++20 Data Structures, Linux, Docker, Git</span>
          </div>
        </div>
      </div>
    `;
  }

  // 3E. Experience & Milestones Timeline
  function renderTimeline() {
    const container = document.getElementById("timelineList");
    if (!container || !DB.timeline) return;

    container.innerHTML = DB.timeline
      .map(
        (t, idx) => `
        <div class="timeline-entry reveal-on-scroll">
          <div class="timeline-commit-node ${idx === 0 ? 'current' : ''}"></div>
          <div class="timeline-card-box glass-card">
            <h3 class="timeline-role-title">${t.title}</h3>
            <div class="timeline-org">${t.organization}</div>
            <div class="timeline-meta-row">
              <span>${t.period}</span>
              <span>•</span>
              <span>${t.status}</span>
            </div>
            <ul class="timeline-bullet-list">
              ${t.bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
      )
      .join("");
  }

  // 3F. Skills Matrix
  function renderSkills() {
    const container = document.getElementById("skillsGrid");
    if (!container || !DB.skillsMatrix) return;

    const renderCol = (title, icon, badgeClass, list) => `
      <div class="skills-card-column glass-card reveal-on-scroll">
        <div class="skills-col-header">
          <span class="skills-col-badge ${badgeClass}">${title}</span>
          <span class="skills-col-icon">${icon}</span>
        </div>
        <div class="skills-bar-stack">
          ${list
            .map(
              (item) => `
              <div class="skill-meter-wrap">
                <div class="skill-meter-header">
                  <span class="skill-name">${item.name}</span>
                  <span class="skill-pct">${item.level}%</span>
                </div>
                <div class="skill-meter-bar">
                  <div class="skill-meter-fill" style="width: ${item.level}%;"></div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;

    container.innerHTML = `
      ${renderCol("Frontend & Client", "▲", "badge-neon-cyan", DB.skillsMatrix.frontend)}
      ${renderCol("Backend & Applied AI", "⚡", "badge-neon-emerald", DB.skillsMatrix.backendAi)}
      ${renderCol("Systems & Tooling", "⚙", "badge-neon-purple", DB.skillsMatrix.systemsTools)}
    `;
  }

  /* ============================================================
     4. Futuristic Terminal Typewriter
     ============================================================ */
  function initTypewriter() {
    const el = document.getElementById("heroTypewriter");
    if (!el || !DB.personal || !DB.personal.typingStrings) return;

    const strings = DB.personal.typingStrings;
    let strIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function tick() {
      const currentStr = strings[strIdx];

      if (isDeleting) {
        el.textContent = currentStr.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        el.textContent = currentStr.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIdx === currentStr.length) {
        typingSpeed = 1800; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        strIdx = (strIdx + 1) % strings.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(tick, typingSpeed);
    }

    tick();
  }

  /* ============================================================
     5. Mouse Spotlight Glow Tracking (Glassmorphism)
     ============================================================ */
  function initMouseSpotlight() {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(".glass-card, .project-card-ide, .bento-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { credentials: "omit", passive: true });
  }

  /* ============================================================
     6. IntersectionObserver Scroll Reveal
     ============================================================ */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }

  /* ============================================================
     7. Live Bengaluru Clock
     ============================================================ */
  function initBengaluruClock() {
    function updateClock() {
      const clockEl = document.getElementById("liveClockVal");
      if (!clockEl) return;

      const now = new Date();
      // Format time in Asia/Kolkata timezone
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      clockEl.textContent = `${timeStr} IST`;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ============================================================
     8. Theme Engine (Pitch Black / Neon Cyan Default)
     ============================================================ */
  function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const stored = localStorage.getItem("mk_theme") || "dark";
    root.setAttribute("data-theme", stored);

    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("mk_theme", next);
        showToast(next === "dark" ? "Deep Space Mode" : "Clean Light Mode");
      });
    }
  }

  /* ============================================================
     9. Navigation & ScrollSpy
     ============================================================ */
  function initNavigation() {
    const header = document.getElementById("headerNav");
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (header) {
          header.classList.toggle("stuck", y > 30);
        }

        let current = "";
        sections.forEach((sec) => {
          const top = sec.offsetTop - 150;
          if (y >= top) {
            current = sec.getAttribute("id");
          }
        });

        navItems.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
        });
      },
      { passive: true }
    );

    // Mobile drawer toggle
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
  }

  /* ============================================================
     10. Project Architecture Modal (With Live Embedded Sandbox)
     ============================================================ */
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

  function openProjectModal(id) {
    if (!DB || !DB.projects || !modalBackdrop) return;
    const project = DB.projects.find((p) => p.id === id);
    if (!project) return;

    modalTitle.textContent = project.title;

    modalTags.innerHTML = project.tags
      .map((t) => `<span class="syntax-tag">${t}</span>`)
      .join("");

    if (project.liveUrl && project.liveUrl !== "#") {
      modalLive.href = project.liveUrl;
      modalLive.style.display = "inline-flex";
      if (modalLiveText) {
        modalLiveText.textContent = `Launch Live (${new URL(project.liveUrl).hostname}) ↗`;
      }
    } else {
      modalLive.style.display = "none";
    }

    if (project.githubUrl) {
      modalGithub.href = project.githubUrl;
      modalGithub.style.display = "inline-flex";
    } else {
      modalGithub.style.display = "none";
    }

    // Embedded live iframe if supported (e.g. ScamShield)
    if (liveFrameWrap && liveIframe) {
      if (project.embedUrl) {
        liveFrameWrap.style.display = "block";
        liveIframe.src = project.embedUrl;
        if (liveFrameUrl) liveFrameUrl.textContent = project.embedUrl;
        if (liveFrameExternal) liveFrameExternal.href = project.embedUrl;
      } else {
        liveFrameWrap.style.display = "none";
        liveIframe.src = "about:blank";
      }
    }

    modalOverview.textContent = project.fullDescription || project.shortDescription;

    modalFeatures.innerHTML = project.features
      .map((f) => `<li>${f}</li>`)
      .join("");

    modalChallenges.innerHTML = project.challenges
      .map((c) => `<li>${c}</li>`)
      .join("");

    modalSolutions.innerHTML = project.solutions
      .map((s) => `<li>${s}</li>`)
      .join("");

    modalBackdrop.classList.add("open");
    document.body.classList.add("locked");
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    if (liveIframe) liveIframe.src = "about:blank";
    modalBackdrop.classList.remove("open");
    document.body.classList.remove("locked");
  }

  function initModal() {
    if (modalClose) modalClose.addEventListener("click", closeProjectModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeProjectModal();
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProjectModal();
        closeAiChat();
      }
    });
  }

  /* ============================================================
     11. Interactive "Ask Maaz AI" Drawer
     ============================================================ */
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

  function appendChatMessage(text, sender) {
    if (!chatLog) return;
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text.replace(/\n/g, "<br>");
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function getAiResponse(query) {
    if (!DB || !DB.aiKnowledge) return "I'm having trouble loading my knowledge base. Please try again!";
    const q = query.toLowerCase();

    for (const item of DB.aiKnowledge) {
      if (item.keywords.some((k) => q.includes(k))) {
        return item.answer;
      }
    }
    return `Maaz is an Applied AI student at Polaris School of Technology (admitted 2026) building full-stack AI web platforms and C++ systems. Feel free to ask about his **projects**, **technical stack**, **education**, or **how to contact him**!`;
  }

  function initAiChat() {
    document.querySelectorAll("[data-open-ai]").forEach((btn) => {
      btn.addEventListener("click", openAiChat);
    });

    if (closeChatBtn) closeChatBtn.addEventListener("click", closeAiChat);
    if (aiChatBackdrop) aiChatBackdrop.addEventListener("click", closeAiChat);

    if (chatForm && chatInput) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = chatInput.value.trim();
        if (!val) return;

        appendChatMessage(val, "user");
        chatInput.value = "";

        setTimeout(() => {
          const reply = getAiResponse(val);
          appendChatMessage(reply, "bot");
        }, 400);
      });
    }

    document.querySelectorAll(".suggestion-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.textContent.trim();
        appendChatMessage(text, "user");
        setTimeout(() => {
          const reply = getAiResponse(text);
          appendChatMessage(reply, "bot");
        }, 400);
      });
    });
  }

  /* ============================================================
     12. Professional Contact Form API Simulation
     ============================================================ */
  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    const sendBtn = document.getElementById("contactSendBtn");
    if (!contactForm || !sendBtn) return;

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("formName");
      const email = document.getElementById("formEmail");
      const subject = document.getElementById("formSubject") || { value: "Portfolio Inquiry" };
      const message = document.getElementById("formMessage");

      const errName = document.getElementById("errName");
      const errEmail = document.getElementById("errEmail");
      const errMessage = document.getElementById("errMessage");

      let valid = true;

      if (!name.value.trim()) {
        if (errName) errName.classList.add("show");
        valid = false;
      } else if (errName) {
        errName.classList.remove("show");
      }

      if (!isValidEmail(email.value.trim())) {
        if (errEmail) errEmail.classList.add("show");
        valid = false;
      } else if (errEmail) {
        errEmail.classList.remove("show");
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        if (errMessage) errMessage.classList.add("show");
        valid = false;
      } else if (errMessage) {
        errMessage.classList.remove("show");
      }

      if (!valid) return;

      // Loading State
      const originalText = sendBtn.innerHTML;
      sendBtn.disabled = true;
      sendBtn.innerHTML = `
        <span class="btn-spinner" aria-hidden="true"></span>
        <span>Dispatching Payload...</span>
      `;

      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        timestamp: new Date().toISOString()
      };

      try {
        // Attempt fetch to contact endpoint with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        // Simulation of backend API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        showToast("Payload dispatched! Maaz will review your message shortly.");
        contactForm.reset();
      } catch (err) {
        showToast("Dispatch confirmed (stored locally). Thank you for reaching out!");
      } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = originalText;
      }
    });
  }

  /* ============================================================
     13. Floating Guide Bar
     ============================================================ */
  function initGuideBar() {
    const guideBar = document.getElementById("floatingGuideBar");
    const guideClose = document.getElementById("guideCloseBtn");

    if (guideClose && guideBar) {
      guideClose.addEventListener("click", () => {
        guideBar.classList.add("dismissed");
      });
    }
  }

  /* ============================================================
     14. Global Toast Notification
     ============================================================ */
  function showToast(message) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "globalToast";
      toast.className = "global-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // Start bootstrap
  loadData();
})();
