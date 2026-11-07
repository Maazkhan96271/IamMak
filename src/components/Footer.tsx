"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, Activity, Sparkles, Layers } from "lucide-react";

interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  className?: string;
}

export function Footer({
  githubUrl = "https://github.com/Maazkhan96271",
  linkedinUrl = "https://www.linkedin.com/in/maaz-khan-9124232bb/",
  email = "maazkhan96271@gmail.com",
  className = "",
}: FooterProps) {
  const [visitorCount, setVisitorCount] = useState("08,492");

  useEffect(() => {
    // Generate or retrieve consistent simulated visitor count with subtle increment
    const stored = localStorage.getItem("maaz_visitor_count");
    if (stored) {
      const next = parseInt(stored, 10) + 1;
      localStorage.setItem("maaz_visitor_count", next.toString());
      setVisitorCount(next.toLocaleString("en-US", { minimumIntegerDigits: 5 }));
    } else {
      const initial = 8492;
      localStorage.setItem("maaz_visitor_count", initial.toString());
      setVisitorCount("08,492");
    }
  }, []);

  return (
    <footer className={`border-t border-white/10 pt-10 pb-16 space-y-8 ${className}`}>
      {/* ─── Top Row: Brand & Minimal Navigation ─── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: Text "© 2026 MAAZ KHAN" & PST credentials */}
        <div className="space-y-1">
          <div className="font-display font-extrabold text-white text-base tracking-wider uppercase">
            © 2026 MAAZ KHAN
          </div>
          <p className="font-mono text-xs text-slate-400">
            B.Tech in Applied AI · Polaris School of Technology · Bengaluru, IN
          </p>
        </div>

        {/* Center / Right: Gallery Link, Monitor Status Dot, and Visitors Counter */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs">
          {/* Gallery Link */}
          <Link
            href="#projects"
            data-clickable="true"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
          >
            <Layers size={13} className="text-cyan-400" />
            <span>Gallery</span>
          </Link>

          {/* Monitor Status Dot: 🟢 All Systems Normal */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold">All Systems Normal</span>
          </div>

          {/* Mock Visitors Counter: Visitors: 08,492 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-black/60 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Activity size={12} className="text-cyan-400 animate-pulse" />
            <span>Visitors: {visitorCount}</span>
          </div>
        </div>
      </div>

      {/* ─── Bottom Sub-bar: Social Links & Technology Signature ─── */}
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-clickable="true"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <span className="text-slate-600">/</span>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-clickable="true"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <span className="text-slate-600">/</span>
          <a
            href={`mailto:${email}`}
            data-clickable="true"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Mail size={14} />
            <span>Email</span>
          </a>
        </div>

        <div className="text-slate-500 text-[11px] text-center sm:text-right">
          Next.js 16 App Router · Tailwind CSS · Framer Motion · TypeScript
        </div>
      </div>
    </footer>
  );
}
