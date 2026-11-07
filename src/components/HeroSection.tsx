"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Bot,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { IDCard3D } from "./IDCard3D";
import { soundFx } from "@/lib/sound";
import type { PersonaData } from "@/data/portfolioData";

interface HeroSectionProps {
  persona: PersonaData;
  onOpenLounge: () => void;
  onOpenDocs: () => void;
}

export function HeroSection({ persona, onOpenLounge, onOpenDocs }: HeroSectionProps) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [activeVersion, setActiveVersion] = useState<"NEW" | "OLD">("NEW");

  const roles = [
    { title: "DEVELOPER", gradient: "from-[#f59e0b] to-[#00d9ff]" },
    { title: "AI ARCHITECT", gradient: "from-[#00d9ff] to-[#a78bfa]" },
    { title: "0 → 1 BUILDER", gradient: "from-[#10b981] to-[#00d9ff]" },
    { title: "C++20 DSA DRILLS", gradient: "from-[#a78bfa] to-[#f59e0b]" },
    { title: "SYSTEMS ENGINEER", gradient: "from-[#00d9ff] to-[#10b981]" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-12 pb-16">
      {/* ─── Background Grid & Radial Atmosphere from ayushcmd.me ─── */}
      <div className="ambient-bg-grid" />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
        {/* ─── Left Column: Typography, Dynamic Typewriter, Conic Buttons ─── */}
        <div className="flex flex-col gap-6 text-left">
          {/* NEW / OLD Version Pill Toggle from ayushcmd.me */}
          <div className="self-start">
            <div className="flex items-center gap-0.5 rounded-lg p-0.5 bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <button
                onClick={() => {
                  soundFx.playClick(600, 0.03);
                  setActiveVersion("NEW");
                }}
                data-clickable="true"
                className={`px-3 py-1 text-[10px] font-semibold tracking-wider rounded-md transition-colors duration-200 ${
                  activeVersion === "NEW"
                    ? "text-[#00d9ff] bg-[rgba(0,217,255,0.12)]"
                    : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={activeVersion === "NEW"}
              >
                NEW (v2.0)
              </button>
              <button
                onClick={() => {
                  soundFx.playClick(400, 0.03);
                  setActiveVersion("OLD");
                  window.open("https://maazkhan96271.github.io/maazkhan-ai-portfolio/", "_blank");
                }}
                data-clickable="true"
                className={`px-3 py-1 text-[10px] font-semibold tracking-wider rounded-md transition-colors duration-200 ${
                  activeVersion === "OLD"
                    ? "text-[#00d9ff] bg-[rgba(0,217,255,0.12)]"
                    : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={activeVersion === "OLD"}
              >
                CLASSIC
              </button>
            </div>
          </div>

          {/* Headline in Comfortaa: "Maaz" and gradient "Khan" */}
          <div>
            <h1
              className="font-comfortaa font-bold text-white tracking-[-0.02em] leading-[1.02]"
              style={{ fontSize: "clamp(3.2rem, 9vw, 5.8rem)" }}
            >
              Maaz
              <br />
              <span className="bg-gradient-to-r from-[#00d9ff] via-slate-100 to-[#a78bfa] bg-clip-text text-transparent">
                Khan
              </span>
            </h1>
          </div>

          {/* Monospace Tracking Subtitle */}
          <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-slate-400">
            <span>FULL-STACK</span>
            <span className="text-[#00d9ff]">·</span>
            <span className="text-[#a78bfa]">AI</span>
            <span className="text-[#00d9ff]">·</span>
            <span>DEVELOPER</span>
          </div>

          {/* Bio text */}
          <p className="font-sans text-[15px] text-slate-300 leading-relaxed max-w-md">
            Building{" "}
            <span className="text-white font-semibold">intelligent systems</span> at the intersection
            of full-stack web platforms and applied AI workflows — from deterministic heuristic engines
            to autonomous multi-agent tax reconciliation.
          </p>

          {/* Dynamic Cycling Role Typewriter */}
          <div className="flex items-center gap-3">
            <div className="overflow-hidden h-11 flex items-center">
              <span
                key={activeRoleIndex}
                className={`font-comfortaa font-bold text-2xl sm:text-3xl bg-gradient-to-r ${roles[activeRoleIndex].gradient} bg-clip-text text-transparent whitespace-nowrap animate-[overlayIn_0.35s_ease-out]`}
              >
                {roles[activeRoleIndex].title}
              </span>
            </div>
          </div>

          {/* 5-Dot Animated Indicator Pills from ayushcmd.me */}
          <div className="flex items-center gap-2">
            {roles.map((_, idx) => (
              <div
                key={idx}
                className="rounded-full transition-all duration-300 cursor-pointer"
                onClick={() => {
                  soundFx.playClick(500, 0.02);
                  setActiveRoleIndex(idx);
                }}
                style={{
                  height: "4px",
                  width: idx === activeRoleIndex ? "24px" : "4px",
                  backgroundColor: idx === activeRoleIndex ? "#00d9ff" : "rgba(255, 255, 255, 0.15)",
                }}
              />
            ))}
          </div>

          {/* ─── Action Buttons with Conic Rotating Borders from ayushcmd.me ─── */}
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            {/* Button 1: Lounge Modal Trigger with Conic Border */}
            <div className="relative inline-flex">
              <button
                onClick={() => {
                  soundFx.playPop();
                  onOpenLounge();
                }}
                data-clickable="true"
                className="group relative inline-flex overflow-hidden rounded-2xl p-[1.5px] transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                <span
                  className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
                  style={{
                    background:
                      "conic-gradient(from 90deg at 50% 50%, transparent 0%, #00d9ff 18%, transparent 35%)",
                  }}
                />
                <span className="relative z-10 flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[#0a0f14] px-5 text-sm font-semibold text-white">
                  <Bot size={17} className="text-cyan-400" />
                  <span className="whitespace-nowrap font-comfortaa">Lounge</span>
                </span>
              </button>
              {/* Unread badge */}
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-[#00D9FF] text-[9px] font-mono font-bold text-[#04202b] rounded-full z-20">
                1
              </span>
            </div>

            {/* Button 2: Resume / Dossier Modal Trigger with Conic Border */}
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenDocs();
              }}
              data-clickable="true"
              className="group relative inline-flex overflow-hidden rounded-2xl p-[1.5px] transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
                style={{
                  background:
                    "conic-gradient(from 90deg at 50% 50%, transparent 0%, #a78bfa 18%, transparent 35%)",
                }}
              />
              <span className="relative z-10 flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[#0a0f14] px-5 text-sm font-semibold text-white">
                <FileText size={16} className="text-purple-400" />
                <span className="whitespace-nowrap font-comfortaa">Get Resume / CV</span>
              </span>
            </button>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href={persona.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              data-clickable="true"
              className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
            >
              <Github size={16} />
            </a>

            <a
              href={persona.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              data-clickable="true"
              className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={`mailto:${persona.socials.email}`}
              aria-label="Send direct email"
              data-clickable="true"
              className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* ─── Right Column: Interactive 3D ID Card with Laser Scanner ─── */}
        <div className="flex justify-center items-center">
          <IDCard3D name={persona.name} avatarUrl={persona.avatarUrl} />
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30 pointer-events-none">
        <div className="w-px h-8 bg-cyan-400" />
      </div>
    </section>
  );
}
