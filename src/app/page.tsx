import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { ExternalLink, Github, Sparkles, Terminal, Shield, Cpu, Activity, Award } from "lucide-react";

export default function Home() {
  const { persona, stats, projects, credentials, forge } = portfolioData;

  return (
    <main className="relative min-h-screen px-6 py-12 md:py-20 max-w-7xl mx-auto space-y-28">

      {/* ═══ 1. Hero Section ═══ */}
      <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-6">
        {/* Left Column: Intro */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{persona.liveStatus}</span>
          </div>

          {/* Tagline */}
          <p className="font-mono text-sm tracking-widest text-cyan-400 uppercase font-semibold">
            {persona.tagline}
          </p>

          {/* Name & Headline */}
          <h1 className="font-display text-4xl sm:text-64 md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Hi, I&apos;m <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">{persona.name}</span>
          </h1>

          {/* Bio */}
          <p className="text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
            {persona.bio}
          </p>

          <p className="text-sm font-mono text-slate-400">
            Admitted in <strong className="text-cyan-400 font-semibold">{persona.admissionYear}</strong> at {persona.college} ({persona.classBatch}) · Focused on becoming a top <strong className="text-white font-semibold">{persona.careerGoal}</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
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

        {/* Right Column: Avatar with Concentric Rotating Ring */}
        <div className="relative flex items-center justify-center">
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
            {/* Ambient Cyan Glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />

            {/* Concentric Dashed Orbital Ring */}
            <div className="absolute -inset-3 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" aria-hidden="true" />

            {/* Single Face-Focused Round Avatar Frame */}
            <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,240,255,0.25)] bg-[#090d14]">
              <Image
                src={persona.avatarUrl}
                alt={`${persona.name} portrait`}
                fill
                priority
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>

            {/* Telemetry Chips */}
            <div className="absolute -top-3 -left-4 px-3.5 py-1.5 rounded-full bg-[#090d14]/90 border border-white/10 backdrop-blur-md font-mono text-xs text-cyan-400 shadow-xl">
              Polaris &apos;26 Batch
            </div>
            <div className="absolute -bottom-3 -right-3 px-3.5 py-1.5 rounded-full bg-[#090d14]/90 border border-white/10 backdrop-blur-md font-mono text-xs text-emerald-400 shadow-xl">
              Target: SWE 2030
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. Telemetry Stats Bar ═══ */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="font-mono text-xs text-cyan-400">Deployed Code</span>
          <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">{stats.apps}</div>
          <span className="text-xs text-slate-400 mt-1">Production Applications</span>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="font-mono text-xs text-emerald-400">C++20 Drills</span>
          <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">{stats.dsa}</div>
          <span className="text-xs text-slate-400 mt-1">Algorithmic Problems</span>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="font-mono text-xs text-purple-400">PST Admission</span>
          <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">{stats.admission}</div>
          <span className="text-xs text-slate-400 mt-1">Applied AI Undergrad</span>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="font-mono text-xs text-blue-400">Lighthouse</span>
          <div className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2">{stats.performance}</div>
          <span className="text-xs text-slate-400 mt-1">Architecture Standard</span>
        </div>
      </section>

      {/* ═══ 3. Projects Showcase (`#projects`) ═══ */}
      <section id="projects" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            01 / Work Systems
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Projects &amp; Live Deployments
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Real software built and deployed across Next.js 16, Flask, FastAPI, and AWS Bedrock. Click to launch live apps directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`glass-card p-6 sm:p-8 flex flex-col justify-between ${
                project.featured ? "md:col-span-2 border-cyan-400/30" : ""
              }`}
            >
              <div className="space-y-4">
                {/* Header: Filename & Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="font-mono text-xs text-slate-400 ml-2">{project.filename}</span>
                  </div>
                  <span
                    className={`font-mono text-xs px-2.5 py-0.5 rounded-full border ${
                      project.badgeType === "live"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : project.badgeType === "hackathon"
                        ? "border-orange-500/40 bg-orange-500/10 text-orange-400"
                        : "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/5 font-mono text-xs"
                    >
                      <span className="text-slate-400">{m.label}: </span>
                      <span className="text-cyan-300 font-semibold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/5 font-mono text-[11px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 text-black font-display text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all hover:bg-cyan-300 hover:scale-105"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white font-display text-xs font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                >
                  <Github size={13} />
                  <span>Source</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 4. Credentials & Education (`#credentials`) ═══ */}
      <section id="credentials" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            02 / Academics &amp; Milestones
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Credentials &amp; Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Undergraduate journey at Polaris School of Technology, industry OJT, and hackathon accomplishments.
          </p>
        </div>

        <div className="space-y-4">
          {credentials.map((cred) => (
            <div key={cred.title} className="glass-card p-6 sm:p-8 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    {cred.title}
                  </h3>
                  <p className="font-mono text-xs text-cyan-400">{cred.issuer}</p>
                </div>
                <div className="font-mono text-xs text-slate-400 sm:text-right">
                  <div>{cred.period}</div>
                  <div className="text-emerald-400">{cred.status}</div>
                </div>
              </div>

              <ul className="space-y-1.5 pt-2 text-sm text-slate-300">
                {cred.details.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">▹</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

      {/* ═══ 6. Persona (`#persona`) ═══ */}
      <section id="persona" className="space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            04 / Identity &amp; Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Ready to collaborate on ambitious software challenges, Applied AI systems, or 2026 software engineering internships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity Tile */}
          <div className="glass-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-cyan-400">Direct Comms</span>
              <h3 className="font-display text-2xl font-bold text-white">
                Maaz Khan
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Bengaluru-based Applied AI undergrad at Polaris School of Technology (Class of 2026–2030). Building with Next.js, Python, and C++.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-400 border-t border-white/10 pt-4">
              <div>Timezone: {persona.timezone}</div>
              <div>Location: {persona.location}</div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`mailto:${persona.socials.email}`}
                className="px-4 py-2 rounded-full bg-cyan-400 text-black font-display text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:bg-cyan-300 transition-colors"
              >
                Send Email
              </a>
              <a
                href={persona.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white font-display text-xs font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={persona.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white font-display text-xs font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Dispatch Form */}
          <div className="glass-card p-8 space-y-4">
            <span className="font-mono text-xs text-emerald-400">Dispatch Channel</span>
            <form
              action={`mailto:${persona.socials.email}`}
              method="POST"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">Your Name / Organization</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Acme AI"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">Message Payload</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share details on the role or technical collaboration..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-cyan-400 text-black font-display font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:bg-cyan-300 transition-all"
              >
                Transmit Payload ↵
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-white/10 pt-8 pb-16 text-center space-y-2">
        <p className="font-mono text-xs text-slate-400">
          &copy; 2026 {persona.name} · {persona.degree} @ {persona.college}
        </p>
        <p className="text-[11px] text-slate-500">
          Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, &amp; Framer Motion
        </p>
      </footer>

    </main>
  );
}
