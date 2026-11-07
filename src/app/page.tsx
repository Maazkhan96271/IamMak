import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { IDCard3D } from "@/components/IDCard3D";
import { LocationMapCard } from "@/components/LocationMapCard";
import { AcademicDashboardCard } from "@/components/AcademicDashboardCard";
import { ValuesBentoRow } from "@/components/ValuesBentoRow";
import { ProjectBentoCard } from "@/components/ProjectBentoCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { ContactForm } from "@/components/ContactForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { ExternalLink, Github, Sparkles, UserCheck } from "lucide-react";

export default function Home() {
  const {
    persona,
    stats,
    mapData,
    academicTrend,
    values,
    experience,
    workflow,
    faq,
    projects,
    credentials,
    forge,
  } = portfolioData;

  return (
    <main className="relative min-h-screen px-6 py-8 md:py-16 max-w-7xl mx-auto space-y-28">

      {/* ═══ 1. Hero Section & Interactive 3D ID Card ═══ */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4 md:pt-10 pb-8">
        {/* Left Column: Massive Bold Highly Tracked Typography */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{persona.liveStatus}</span>
          </div>

          {/* Massive, bold, highly tracked typography: "MAAZ KHAN" */}
          <div className="space-y-3">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.08em] sm:tracking-[0.14em] text-white uppercase leading-[0.95] select-none">
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                MAAZ KHAN
              </span>
            </h1>

            {/* Smaller bold text: "FULL-STACK · AI · DEVELOPER" */}
            <p className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.3em] text-cyan-400 uppercase">
              {persona.tagline}
            </p>
          </div>

          {/* Underneath, render bio from portfolioData.ts */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-sans leading-relaxed">
            {persona.bio}
          </p>

          <p className="text-xs sm:text-sm font-mono text-slate-400">
            Admitted in <strong className="text-cyan-400 font-semibold">{persona.admissionYear}</strong> at {persona.college} ({persona.classBatch}) · Aiming for elite <strong className="text-white font-semibold">{persona.careerGoal}</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-black font-display text-sm font-bold shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:bg-cyan-300 hover:scale-105"
            >
              <span>Explore Projects</span>
              <ExternalLink size={15} />
            </Link>

            <Link
              href="#credentials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white font-display text-sm font-semibold backdrop-blur-md transition-all hover:bg-white/10 hover:border-cyan-400/40 hover:text-cyan-400"
            >
              <span>Credentials &amp; PST</span>
              <Sparkles size={15} />
            </Link>

            <a
              href={persona.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/10"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Right Column (or below on mobile): Interactive 3D ID Card using Framer Motion */}
        <div className="flex justify-center items-center pt-4 lg:pt-0">
          <IDCard3D name={persona.name} avatarUrl={persona.avatarUrl} />
        </div>
      </section>

      {/* ═══ 2. "Who I Am" Bento Section (`#about`) ═══ */}
      <section id="about" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-semibold">
            <Sparkles size={12} />
            <span>WHO I AM · IDENTITY &amp; CORE TELEMETRY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Blueprint &amp; Academic Radar
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Undergraduate systems engineer building at the intersection of Applied AI, modern frontend architectures, and high-performance backends in Bengaluru.
          </p>
        </div>

        {/* Bento Top Row: Location Map Card + Academic Trend Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LocationMapCard mapData={mapData} />
          <AcademicDashboardCard data={academicTrend} />
        </div>

        {/* Bento Bottom Row: 3 Values Bento Boxes (Growth, Focus, Craft) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Core Operating Values
            </span>
            <span className="font-mono text-[11px] text-cyan-400">
              3 Disciplines
            </span>
          </div>
          <ValuesBentoRow values={values} />
        </div>
      </section>

      {/* ═══ 3. Featured Work Bento Grid (`#projects`) ═══ */}
      <section id="projects" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-semibold">
            <Sparkles size={12} />
            <span>01 / FEATURED WORK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Featured Systems &amp; Bento Grid
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Production software engineered across Next.js 16, Python, FastAPI, and AWS Bedrock. Hover over cards to activate the interactive spotlight, or launch live apps directly.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectBentoCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ═══ 4. Experience & Development Workflow (`#credentials`) ═══ */}
      <section id="credentials" className="space-y-12 scroll-mt-24">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold">
            <Sparkles size={12} />
            <span>02 / METHODOLOGY &amp; TRACK RECORD</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Workflow &amp; Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            How I architect software from first principles, and my engineering milestones at Polaris School of Technology.
          </p>
        </div>

        {/* Workflow Visualization: Horizontal Animated Pipeline (IDEA → PLAN → AI HELP → CODE → REVIEW → TEST → DEPLOY) */}
        <div className="space-y-4">
          <WorkflowPipeline workflow={workflow} />
        </div>

        {/* Experience Timeline: Sleek Vertical Timeline */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              Chronological Milestones
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering Experience
            </h3>
          </div>

          <ExperienceTimeline experience={experience} />
        </div>
      </section>

      {/* ═══ 5. Forge (Skills & Arsenal) (`#forge`) ═══ */}
      <section id="forge" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-semibold">
            03 / Weaponry
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The Developer Forge
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Technologies and frameworks engineered to production standards.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {forge.map((item) => (
            <div
              key={item.name}
              className="glass-card p-4 flex flex-col justify-between hover:border-cyan-400/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg text-cyan-400 font-bold">{item.icon}</span>
                <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  {item.level}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-display font-bold text-white text-base">{item.name}</div>
                <div className="text-xs text-slate-400 font-mono">{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. Contact & FAQ Accordion (`#persona`) ═══ */}
      <section id="persona" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs font-semibold">
            <Sparkles size={12} />
            <span>04 / COMMUNICATION &amp; INTEL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Initiate Contact &amp; FAQ
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Ready to collaborate on ambitious Applied AI systems, production software engineering, or 2026 internships. Send a direct payload below.
          </p>
        </div>

        {/* Side-by-Side: Contact Form & FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* "Send a Message" Form with dark inputs, glowing focus rings, mock fetch() & loading spinner */}
          <ContactForm emailRecipient={persona.socials.email} />

          {/* FAQ Accordion: Framer Motion animated accordion with 3 core questions */}
          <FAQAccordion faq={faq} />
        </div>
      </section>

      {/* ═══ Minimal Footer ═══ */}
      <Footer
        githubUrl={persona.socials.github}
        linkedinUrl={persona.socials.linkedin}
        email={persona.socials.email}
      />

    </main>
  );
}
