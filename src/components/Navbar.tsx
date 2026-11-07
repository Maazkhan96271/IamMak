"use client";

import React, { useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { persona, navLinks } = portfolioData;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[72px] border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left: Brand Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 font-display text-sm font-bold text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-transform group-hover:scale-105">
            MK
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
              {persona.name}
            </span>
            <span className="font-mono text-[11px] text-cyan-400">
              Applied AI · 2026
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Projects, Credentials, Forge, Persona) */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 md:flex backdrop-blur-md">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-1.5 font-display text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Theme Toggler */}
          <ThemeToggle />

          {/* Quick Contact CTA */}
          <Link
            href="#persona"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 font-mono text-xs font-semibold text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all hover:bg-cyan-400 hover:text-black"
          >
            <span>Initiate</span>
            <span className="text-sm">✦</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 md:hidden hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-white/10 bg-[#090d14]/95 px-6 py-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
