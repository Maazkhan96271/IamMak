"use client";

import React, { useState, useEffect } from "react";
import { Navigation, Compass, Radio, MapPin } from "lucide-react";
import type { MapData } from "@/data/portfolioData";

interface LocationMapCardProps {
  mapData: MapData;
  className?: string;
}

export function LocationMapCard({ mapData, className = "" }: LocationMapCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [timeIST, setTimeIST] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeIST(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* ─── 1. Radial Gradient Spotlight (Follows mouse cursor) ─── */}
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

      {/* ─── 2. Top Terminal Header ─── */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 inline-block" />
          <span className="font-mono text-xs text-slate-400 ml-1.5 flex items-center gap-1.5">
            <Radio size={12} className="text-cyan-400 animate-pulse" />
            geonav.satellite.sys
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE RADAR
          </span>
        </div>
      </div>

      {/* ─── 3. Stylized Dark Interactive Map Viewport ─── */}
      <div className="relative z-10 my-4 h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-white/10 bg-[#06090e] flex items-center justify-center">
        {/* Radar concentric range circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-28 w-28 rounded-full border border-cyan-500/10" />
          <div className="absolute h-52 w-52 rounded-full border border-cyan-500/10" />
          <div className="absolute h-72 w-72 rounded-full border border-cyan-500/5" />
          {/* Radar sweeping beam */}
          <div className="absolute h-72 w-72 rounded-full border border-cyan-500/10 animate-[spin_8s_linear_infinite] [mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,1))] opacity-30 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
        </div>

        {/* Stylized SVG Map of Subcontinent / Bengaluru Position */}
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              <circle cx="30" cy="30" r="1" fill="rgba(0, 240, 255, 0.15)" />
            </pattern>
            {/* Glow Filter */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Digital Grid */}
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Stylized Asia / Indian Subcontinent Vector Silhouette */}
          <g className="transition-transform duration-700 hover:scale-[1.02] transform-origin-center">
            {/* Himalayan / Northern Border Arc */}
            <path
              d="M 170 80 Q 280 60 410 80 Q 460 100 480 140 Q 420 180 390 210 Q 350 250 330 310 Q 300 350 290 360 Q 280 350 250 300 Q 230 250 210 200 Q 180 150 170 80 Z"
              fill="#0b1320"
              stroke="rgba(0, 240, 255, 0.25)"
              strokeWidth="1.5"
            />

            {/* Deccan Plateau Inner Contour */}
            <path
              d="M 230 220 Q 280 210 330 220 Q 340 270 315 315 Q 295 340 290 345 Q 285 340 265 315 Q 240 270 230 220 Z"
              fill="#0f1b2d"
              stroke="rgba(0, 240, 255, 0.15)"
              strokeWidth="1"
            />

            {/* Latitude Grid Line (12.9716° N) */}
            <line
              x1="50"
              y1="310"
              x2="550"
              y2="310"
              stroke="rgba(0, 240, 255, 0.2)"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text x="60" y="304" fill="rgba(0, 240, 255, 0.6)" fontSize="9" fontFamily="monospace">
              LAT 12.9716° N
            </text>

            {/* Longitude Grid Line (77.5946° E) */}
            <line
              x1="290"
              y1="30"
              x2="290"
              y2="380"
              stroke="rgba(0, 240, 255, 0.2)"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text x="296" y="50" fill="rgba(0, 240, 255, 0.6)" fontSize="9" fontFamily="monospace">
              LON 77.5946° E
            </text>

            {/* ─── Glowing Dot on Bengaluru, India (Coordinate intersection: 290, 310) ─── */}
            <g transform="translate(290, 310)">
              {/* Outer Pulsing Ping Ring */}
              <circle r="22" fill="none" stroke="#00f0ff" strokeWidth="1.5" opacity="0.3" className="animate-ping" />
              <circle r="14" fill="none" stroke="#00f0ff" strokeWidth="1.5" opacity="0.5" />
              {/* Target Crosshair */}
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#00f0ff" strokeWidth="1.5" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#00f0ff" strokeWidth="1.5" />
              {/* Glowing Core Dot */}
              <circle r="5" fill="#00f0ff" filter="url(#neonGlow)" />
              <circle r="2" fill="#ffffff" />
            </g>

            {/* Interactive City Label */}
            <g transform="translate(305, 305)">
              <rect x="0" y="-14" width="110" height="20" rx="4" fill="rgba(6, 9, 14, 0.85)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
              <text x="8" y="0" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                BENGALURU
              </text>
              <circle cx="100" cy="-4" r="3" fill="#10b981" />
            </g>
          </g>
        </svg>

        {/* Live Coordinates Floating HUD Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md">
          <Navigation size={12} className="text-cyan-400 rotate-45" />
          <span className="font-mono text-[10px] text-slate-300">
            RADAR: PST CAMPUS
          </span>
        </div>

        {/* Clock HUD */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md font-mono text-[10px] text-cyan-300">
          IST {timeIST || "Asia/Kolkata"}
        </div>
      </div>

      {/* ─── 4. Required Overlay Text ─── */}
      <div className="relative z-10 space-y-2">
        <div className="rounded-xl border border-cyan-500/30 bg-black/50 p-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.1)]">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-400 shrink-0" />
            <span className="font-mono text-xs sm:text-[13px] font-bold text-white tracking-wider break-all sm:break-normal">
              {mapData.overlayText}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1 font-mono">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Compass size={13} className="text-cyan-400" />
            Polaris School of Technology
          </span>
          <span className="text-emerald-400 font-semibold">Active In Bengaluru</span>
        </div>
      </div>
    </div>
  );
}
