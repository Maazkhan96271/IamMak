"use client";

import React, { useState } from "react";
import { Compass, Zap, Flame, Terminal, Sparkles } from "lucide-react";
import type { ValueItem } from "@/data/portfolioData";

interface ValuesBentoRowProps {
  values: ValueItem[];
  className?: string;
}

export function ValuesBentoRow({ values, className = "" }: ValuesBentoRowProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {values.map((item) => (
        <ValueBentoCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ValueBentoCard({ item }: { item: ValueItem }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "growth":
        return <Compass size={22} className="text-cyan-400" />;
      case "focus":
        return <Zap size={22} className="text-emerald-400" />;
      case "craft":
        return <Flame size={22} className="text-purple-400" />;
      default:
        return <Sparkles size={22} className="text-cyan-400" />;
    }
  };

  const getAccentColors = (accent: string) => {
    switch (accent) {
      case "emerald":
        return {
          spotlight: "rgba(16, 185, 129, 0.15)",
          border: "group-hover:border-emerald-400/50",
          shadow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
          badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
          glow: "from-emerald-500/20",
        };
      case "purple":
        return {
          spotlight: "rgba(168, 85, 247, 0.15)",
          border: "group-hover:border-purple-400/50",
          shadow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
          badge: "border-purple-500/30 bg-purple-500/10 text-purple-400",
          glow: "from-purple-500/20",
        };
      default:
        return {
          spotlight: "rgba(0, 240, 255, 0.15)",
          border: "group-hover:border-cyan-400/50",
          shadow: "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]",
          badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
          glow: "from-cyan-500/20",
        };
    }
  };

  const colors = getAccentColors(item.accent);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 ${colors.border} ${colors.shadow} flex flex-col justify-between overflow-hidden`}
    >
      {/* ─── Radial Gradient Spotlight ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${colors.spotlight}, transparent 65%)`,
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Header with Icon and Badge */}
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            {getIcon(item.id)}
          </div>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colors.badge}`}
          >
            {item.badge}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1 pt-1">
          <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
            Core Philosophy
          </div>
          <h4 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {item.title}
          </h4>
        </div>

        {/* Description quote */}
        <p className="text-slate-300 text-sm leading-relaxed font-sans italic border-l-2 border-white/15 pl-3 py-0.5">
          &ldquo;{item.tagline}&rdquo;
        </p>
      </div>

      {/* Bottom glowing accent bar */}
      <div
        className={`relative z-10 mt-6 h-0.5 w-full rounded-full bg-gradient-to-r ${colors.glow} to-transparent opacity-40 group-hover:opacity-100 transition-opacity`}
      />
    </div>
  );
}
