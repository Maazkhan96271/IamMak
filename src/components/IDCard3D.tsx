"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, RotateCw, MapPin, GraduationCap, Code, Cpu, QrCode } from "lucide-react";
import { soundFx } from "@/lib/sound";

interface IDCard3DProps {
  name: string;
  avatarUrl: string;
}

export function IDCard3D({ name, avatarUrl }: IDCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Disable tilt while flipped so back text remains crisp
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const toggleFlip = () => {
    soundFx.playPop();
    setIsFlipped((prev) => !prev);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[360px] h-[520px] cursor-pointer [perspective:1200px]"
      onClick={toggleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-clickable="true"
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{
          rotateY: isFlipped ? 180 : rotateY,
          rotateX: isFlipped ? 0 : rotateX,
        }}
        transition={{
          rotateY: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          rotateX: { duration: 0.15, ease: "easeOut" },
        }}
      >
        {/* ═══ FRONT OF CARD ═══ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-cyan-400/30 bg-[#090d16]/95 p-6 flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(0,240,255,0.25)] backdrop-blur-2xl [backface-visibility:hidden] overflow-hidden"
        >
          {/* Subtle Cyber Grid & Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.15),transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* ─── 4 Cyber Corner Brackets from ayushcmd.me ─── */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 z-20 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 z-20 pointer-events-none" />

          {/* ─── Animated Vertical Laser Scan Line ─── */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10 pointer-events-none animate-[pulse-slow_2s_infinite]" />

          {/* Top Lanyard Slot & Holographic Header */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Lanyard Hole */}
            <div className="h-2 w-14 rounded-full bg-black/80 border border-white/20 mb-3 shadow-inner" />

            {/* Header Telemetry */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-cyan-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                POLARIS PST // 2026
              </span>
              <span className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <RotateCw size={10} className="animate-spin-slow" />
                TAP TO FLIP
              </span>
            </div>
          </div>

          {/* Center Identity Section */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto space-y-4">
            {/* Avatar Photo Frame with Holographic Glow */}
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-400 via-emerald-400 to-purple-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-cyan-300 p-1 bg-black overflow-hidden shadow-2xl">
                <Image
                  src={avatarUrl}
                  alt={name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover rounded-full"
                  priority
                />
              </div>
              <span className="absolute bottom-1 right-2 h-4 w-4 rounded-full bg-emerald-500 border-2 border-black" title="Active in Bengaluru" />
            </div>

            {/* Name & Title */}
            <div className="space-y-1">
              <h3 className="font-comfortaa text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {name}
              </h3>
              <p className="font-mono text-xs text-cyan-300 tracking-wider">
                Applied AI Student
              </p>
            </div>

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-[11px]">
              <Cpu size={12} />
              <span>Full-Stack &amp; AI Systems</span>
            </div>
          </div>

          {/* Bottom Telemetry & Chips */}
          <div className="relative z-10 border-t border-white/10 pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin size={12} className="text-cyan-400" />
                Bengaluru, IN
              </span>
              <span className="text-emerald-400 font-semibold font-mono">
                Class of 2026–2030
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[10px] font-mono text-slate-400">
                SECURITY CHIP: <span className="text-cyan-300 font-semibold">AES-256</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-400">
                <span>VERIFIED</span>
                <Sparkles size={11} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BACK OF CARD ═══ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-purple-400/40 bg-[#090a14]/95 p-6 flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] backdrop-blur-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.2),transparent_60%)] pointer-events-none" />

          {/* 4 Cyber Corner Brackets */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-purple-400/50 z-20 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-purple-400/50 z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-purple-400/50 z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-purple-400/50 z-20 pointer-events-none" />

          {/* Top Header */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Lanyard Hole */}
            <div className="h-2 w-14 rounded-full bg-black/80 border border-white/20 mb-3 shadow-inner" />

            <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-purple-300 border-b border-white/10 pb-2">
              <span className="font-semibold">ACADEMIC PASSPORT</span>
              <span className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                TAP TO RETURN
              </span>
            </div>
          </div>

          {/* Middle Body */}
          <div className="relative z-10 space-y-4 my-auto">
            {/* College & Degree */}
            <div className="rounded-xl border border-white/10 bg-black/50 p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
                <GraduationCap size={15} />
                <span className="font-bold">Polaris School of Technology</span>
              </div>
              <p className="text-white font-comfortaa font-bold text-sm">
                B.Tech in Applied Artificial Intelligence
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/10 mt-1">
                <span>Admitted: <strong className="text-white">2026 Batch</strong></span>
                <span className="text-purple-300 font-semibold">Bengaluru, IN</span>
              </div>
            </div>

            {/* Core Tech Tags */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Primary Core Stack
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full border border-purple-400/40 bg-purple-500/10 font-mono text-xs text-purple-200">
                  Next.js 16 · Python
                </span>
                <span className="px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 font-mono text-xs text-cyan-200">
                  ▲ 0 → 1 BUILDER
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 font-mono text-xs text-emerald-200">
                  C++20 DSA
                </span>
              </div>
            </div>

            {/* Target Milestone */}
            <div className="rounded-xl border border-white/10 bg-black/50 p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  Career Horizon
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  Software Engineer by 2030
                </span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-bold">
                SWE 2030
              </span>
            </div>
          </div>

          {/* Bottom Barcode / QR Simulation */}
          <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between">
            <div className="space-y-0.5 font-mono text-[9px] text-slate-400">
              <div>ID: MAAZ-PST-AI-2026</div>
              <div>AUTH: VERIFIED DIGITAL IDENTITY</div>
            </div>
            <div className="p-1 rounded bg-white/10 border border-white/20 text-slate-300">
              <QrCode size={26} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
