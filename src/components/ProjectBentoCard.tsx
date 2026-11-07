"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Terminal, Sparkles, Activity } from "lucide-react";
import type { ProjectItem } from "@/data/portfolioData";

interface ProjectBentoCardProps {
  project: ProjectItem;
  className?: string;
}

export function ProjectBentoCard({ project, className = "" }: ProjectBentoCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] flex flex-col justify-between overflow-hidden ${
        project.bentoSpan || ""
      } ${className}`}
    >
      {/* ─── 1. Radial Gradient Spotlight (Follows mouse cursor) ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.15), transparent 60%)`,
        }}
      />

      {/* Subtle border highlight that follows mouse */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.35), transparent 65%)`,
        }}
      />

      {/* Subtle ambient corner glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors" />

      {/* ─── 2. Top Card Content ─── */}
      <div className="relative z-10 space-y-5">
        {/* Terminal Header & Status Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 inline-block" />
            <span className="font-mono text-xs text-slate-400 ml-1.5 flex items-center gap-1.5">
              <Terminal size={11} className="text-cyan-400" />
              {project.filename}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
              project.badgeType === "live"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : project.badgeType === "hackathon"
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                : "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full animate-ping ${
                project.badgeType === "live"
                  ? "bg-emerald-400"
                  : project.badgeType === "hackathon"
                  ? "bg-amber-400"
                  : "bg-cyan-400"
              }`}
            />
            {project.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
          </div>
          {project.subtitle && (
            <p className="font-mono text-xs text-cyan-400 font-medium tracking-wide">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed font-sans">
          {project.shortDescription}
        </p>

        {/* Telemetry Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg bg-black/40 border border-white/5 p-2.5 flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate">
                  {m.label}
                </span>
                <span className="text-xs font-semibold text-cyan-200 mt-0.5 font-mono">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Sleek Pill-Shaped Tech Stack Tags */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-300 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 3. Bottom Actions: View Live & GitHub ─── */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/10">
        {/* View Live Link Icon Button */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-display text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all hover:scale-105 active:scale-95"
            data-clickable="true"
            aria-label={`View live demo of ${project.title}`}
          >
            <span>View Live</span>
            <ExternalLink size={13} className="stroke-[2.5]" />
          </a>
        )}

        {/* GitHub Link Icon Button */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white font-display text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            data-clickable="true"
            aria-label={`View GitHub repository for ${project.title}`}
          >
            <Github size={13} className="text-slate-300" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
}
