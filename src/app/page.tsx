"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { HeroSection } from "@/components/HeroSection";
import { LocationMapCard } from "@/components/LocationMapCard";
import { AcademicDashboardCard } from "@/components/AcademicDashboardCard";
import { ValuesBentoRow } from "@/components/ValuesBentoRow";
import { ProjectBentoCard } from "@/components/ProjectBentoCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { WorkflowPipeline } from "@/components/WorkflowPipeline";
import { ContactForm } from "@/components/ContactForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { useUI } from "@/context/UIContext";
import { Sparkles, Terminal } from "lucide-react";

export default function Home() {
  const {
    persona,
    mapData,
    academicTrend,
    values,
    experience,
    workflow,
    faq,
    projects,
    forge,
  } = portfolioData;

  const { openLounge, openDocs } = useUI();

  return (
    <main className="relative min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 sm:space-y-32">
      {/* ═══ 1. Hero Section & Interactive 3D ID Card with Laser Scanner ═══ */}
      <HeroSection
        persona={persona}
        onOpenLounge={openLounge}
        onOpenDocs={openDocs}
      />

      {/* ═══ 2. "Who I Am" Bento Section (`#about`) ═══ */}
      <section id="about" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs font-semibold">
            <Sparkles size={12} />
            <span>WHO I AM · IDENTITY &amp; CORE TELEMETRY</span>
          </div>
          <h2 className="font-comfortaa text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
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
          <h2 className="font-comfortaa text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
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
          <h2 className="font-comfortaa text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
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
            <h3 className="font-comfortaa text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering Experience
            </h3>
          </div>

          <ExperienceTimeline experience={experience} />
        </div>
      </section>

      {/* ═══ 5. Forge (Skills & Arsenal) (`#forge`) ═══ */}
      <section id="forge" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-xs font-semibold">
            <Sparkles size={12} />
            <span>03 / WEAPONRY</span>
          </div>
          <h2 className="font-comfortaa text-3xl sm:text-4xl font-bold text-white tracking-tight">
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
              className="glass-card p-4 sm:p-5 flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(0,217,255,0.1)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg text-cyan-400 font-bold">{item.icon}</span>
                <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {item.level}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-comfortaa font-bold text-white text-base">{item.name}</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{item.category}</div>
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
          <h2 className="font-comfortaa text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Initiate Contact &amp; FAQ
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Ready to collaborate on ambitious Applied AI systems, production software engineering, or 2026 internships. Send a direct payload below.
          </p>
        </div>

        {/* Side-by-Side: Contact Form & FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* "Send a Message" Form with dark inputs, glowing focus rings, backend API /api/contact & loading spinner */}
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
