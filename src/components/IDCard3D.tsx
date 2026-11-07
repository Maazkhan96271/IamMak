"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, RotateCw, MapPin, GraduationCap, Code, Cpu, QrCode } from "lucide-react";

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
    setIsFlipped((prev) => !prev);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[360px] h-[500px] cursor-pointer [perspective:1200px]"
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
          className="absolute inset-0 w-full h-full rounded-2xl border border-cyan-400/30 bg-[#090d16]/90 p-6 flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(0,240,255,0.25)] backdrop-blur-2xl [backface-visibility:hidden] overflow-hidden"
        >
          {/* Subtle Cyber Grid & Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.15),transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Lanyard Slot & Holographic Header */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Lanyard Hole Clip */}
            <div className="w-12 h-2.5 rounded-full bg-[#050505] border border-white/20 mb-3 shadow-inner" />

            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Cpu size={13} />
                <span>PST // 2026</span>
              </span>
              <span className="tracking-widest uppercase text-slate-400">ACCESS ID</span>
            </div>
          </div>

          {/* Photo Container */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,240,255,0.3)] bg-gradient-to-b from-cyan-400/20 to-transparent">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#050505]">
                <Image
                  src={avatarUrl}
                  alt={`${name} Photo`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="160px"
                />
              </div>
              <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#090d16] shadow-[0_0_10px_#10b981]" />
            </div>

            {/* Name */}
            <h3 className="font-display text-2xl font-extrabold text-white tracking-tight mt-4">
              {name}
            </h3>

            {/* Applied AI Student Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 font-mono text-xs font-semibold mt-2 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
              <Sparkles size={11} />
              <span>Applied AI Student</span>
            </div>
          </div>

          {/* Bottom Flip Indicator */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-slate-400">
            <span className="font-mono text-[10px] tracking-wider uppercase text-slate-500">
              SECURE BIO ID
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 animate-pulse">
              <span>TAP TO FLIP</span>
              <RotateCw size={12} />
            </div>
          </div>
        </div>

        {/* ═══ BACK OF CARD ═══ */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-emerald-500/30 bg-[#090e18]/95 p-6 flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] backdrop-blur-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

          {/* Top Lanyard Slot & Header */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-2.5 rounded-full bg-[#050505] border border-white/20 mb-3 shadow-inner" />
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <GraduationCap size={14} />
                <span>POLARIS ID MATRIX</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500">CLASS 2026-30</span>
            </div>
          </div>

          {/* Back Content */}
          <div className="relative z-10 space-y-4 my-auto">
            {/* Institution */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Institution
              </span>
              <div className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>Polaris School of Technology</span>
              </div>
            </div>

            {/* Batch & Location Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Batch</span>
                <div className="font-display font-bold text-emerald-400 text-sm">2026 Batch</div>
              </div>
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Location</span>
                <div className="font-display font-bold text-slate-200 text-sm flex items-center gap-1">
                  <MapPin size={12} className="text-cyan-400" />
                  <span>Bengaluru, IN</span>
                </div>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Core Competency &amp; Status
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs font-semibold">
                  <Code size={12} />
                  <span>Next.js · Python</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-semibold">
                  <span>▲ 0 → 1 BUILDER</span>
                </span>
              </div>
            </div>

            {/* Simulated Barcode / Verification */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <div className="font-mono text-[10px] text-slate-400 tracking-widest">
                AUTH // PST-AI-2026-MK
              </div>
              <QrCode size={20} className="text-slate-400" />
            </div>
          </div>

          {/* Bottom Flip Indicator */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-slate-400">
            <span className="font-mono text-[10px] tracking-wider uppercase text-slate-500">
              ACTIVE BADGE
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 animate-pulse">
              <span>TAP TO FLIP BACK</span>
              <RotateCw size={12} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
