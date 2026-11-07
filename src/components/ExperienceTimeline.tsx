"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Calendar, MapPin, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import type { ExperienceItem } from "@/data/portfolioData";

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
  className?: string;
}

export function ExperienceTimeline({ experience, className = "" }: ExperienceTimelineProps) {
  return (
    <div className={`relative space-y-10 ${className}`}>
      {/* ─── Sleek Vertical Glowing Timeline Rail ─── */}
      <div className="absolute top-4 bottom-4 left-6 sm:left-8 w-[2px] bg-gradient-to-b from-cyan-400 via-emerald-400 to-purple-500 shadow-[0_0_12px_rgba(0,240,255,0.4)] pointer-events-none" />

      {experience.map((node, index) => (
        <TimelineNodeCard key={node.id} node={node} isLast={index === experience.length - 1} />
      ))}
    </div>
  );
}

function TimelineNodeCard({ node, isLast }: { node: ExperienceItem; isLast: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative flex items-start">
      {/* ─── Glowing Timeline Node Beacon ─── */}
      <div className="absolute left-6 sm:left-8 -translate-x-1/2 mt-6 z-20 flex items-center justify-center">
        {node.current && (
          <span className="absolute h-9 w-9 rounded-full bg-cyan-400/30 animate-ping" />
        )}
        <div
          className={`h-6 w-6 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.5)] ${
            node.current
              ? "border-cyan-400 bg-cyan-500/30"
              : "border-emerald-400 bg-emerald-500/30"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              node.current ? "bg-cyan-300" : "bg-emerald-300"
            }`}
          />
        </div>
      </div>

      {/* ─── Frosted Glass Content Card (Offset by Left Margin) ─── */}
      <div
        onMouseMove={handleMouseMove}
        className="ml-14 sm:ml-20 flex-1 group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] overflow-hidden"
      >
        {/* Radial Gradient Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.15), transparent 60%)`,
          }}
        />

        <div className="relative z-10 space-y-4">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                {node.current ? (
                  <GraduationCap size={18} className="text-cyan-400" />
                ) : (
                  <Briefcase size={18} className="text-emerald-400" />
                )}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {node.role}
                </h3>
              </div>
              <p className="font-mono text-xs sm:text-sm text-cyan-400 font-medium mt-1">
                {node.organization}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {node.badge && (
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300">
                  {node.badge}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border backdrop-blur-md ${
                  node.current
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                    : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                }`}
              >
                <Calendar size={12} />
                <span>{node.period}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed font-sans">
            {node.description}
          </p>

          {/* Key Achievements & Bullet details */}
          {node.details && node.details.length > 0 && (
            <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-300">
              {node.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono text-sm leading-none mt-1">▹</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Sleek Pill-Shaped Tags */}
          {node.tags && node.tags.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                {node.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-300 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
