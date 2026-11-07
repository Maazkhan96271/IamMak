"use client";

import React, { useState } from "react";
import { TrendingUp, Terminal, Code2, Cpu, Target, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";
import type { AcademicTrendData } from "@/data/portfolioData";

interface AcademicDashboardCardProps {
  data: AcademicTrendData;
  className?: string;
}

export function AcademicDashboardCard({ data, className = "" }: AcademicDashboardCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getMetricIcon = (label: string) => {
    if (label.includes("Apps")) return <Code2 size={16} className="text-cyan-400" />;
    if (label.includes("DSA")) return <Cpu size={16} className="text-emerald-400" />;
    if (label.includes("Target") || label.includes("Milestone")) return <Target size={16} className="text-purple-400" />;
    return <GraduationCap size={16} className="text-blue-400" />;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* ─── 1. Radial Gradient Spotlight ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.15), transparent 60%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.35), transparent 65%)`,
        }}
      />

      {/* ─── 2. Top Terminal Header & Title ─── */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 inline-block" />
            <span className="font-mono text-xs text-slate-400 ml-1.5 flex items-center gap-1.5">
              <Terminal size={11} className="text-cyan-400" />
              telemetry.metrics.dashboard
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 backdrop-blur-md">
            <TrendingUp size={12} />
            PIPELINE ACTIVE
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {data.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-sans">
            {data.subtitle}
          </p>
        </div>
      </div>

      {/* ─── 3. Modern Dashboard Grid (Showing the 4 Required Items) ─── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
        {data.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 hover:bg-black/60 group/item"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                {getMetricIcon(m.label)}
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                {m.badge}
              </span>
            </div>

            <div className="mt-3">
              <div className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight ${m.accent}`}>
                {m.stat}
              </div>
              <div className="font-display font-semibold text-white text-sm mt-0.5">
                {m.label}
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── 4. Career Velocity Horizon Pipeline ─── */}
      <div className="relative z-10 pt-4 border-t border-white/10 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Sparkles size={12} />
            Academic Trajectory
          </span>
          <span className="text-purple-400 font-bold">{data.target}</span>
        </div>

        {/* Milestone Progress Rail */}
        <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
          <div className="rounded p-2 bg-white/5 border border-cyan-500/40 text-cyan-300 flex flex-col items-center text-center">
            <span className="font-bold">2026</span>
            <span className="text-[9px] text-slate-400 truncate">PST Admitted</span>
          </div>
          <div className="rounded p-2 bg-white/5 border border-white/10 text-slate-300 flex flex-col items-center text-center">
            <span className="font-bold">2027</span>
            <span className="text-[9px] text-slate-400 truncate">OJT &amp; Systems</span>
          </div>
          <div className="rounded p-2 bg-white/5 border border-white/10 text-slate-300 flex flex-col items-center text-center">
            <span className="font-bold">2028</span>
            <span className="text-[9px] text-slate-400 truncate">Distributed AI</span>
          </div>
          <div className="rounded p-2 bg-purple-500/10 border border-purple-500/40 text-purple-300 flex flex-col items-center text-center font-bold">
            <span>2030</span>
            <span className="text-[9px] text-purple-400 truncate">SWE Career</span>
          </div>
        </div>
      </div>
    </div>
  );
}
