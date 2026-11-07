"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  Activity,
  FileText,
  Bot,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { soundFx } from "@/lib/sound";

interface NavbarProps {
  onOpenAnalytics?: () => void;
  onOpenLounge?: () => void;
  onOpenDocs?: () => void;
}

export function Navbar({ onOpenAnalytics, onOpenLounge, onOpenDocs }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Credentials", href: "#credentials" },
    { label: "Forge", href: "#forge" },
    { label: "Persona", href: "#persona" },
  ];

  const handleAudioToggle = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playPop();
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-[9990] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating 72px Glass Navbar matching ayushcmd.me */}
      <nav
        className="flex items-center justify-between rounded-2xl px-4 sm:px-6 lg:px-8 shadow-2xl transition-all duration-300"
        style={{
          height: "72px",
          background: "rgba(17, 17, 17, 0.58)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow:
            "0 0 0 1px rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.45), 0 0 70px rgba(0, 217, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.09)",
        }}
      >
        {/* ─── Left: House Icon + Brand in Instrument Serif Italic ─── */}
        <Link
          href="/"
          onClick={() => soundFx.playPop()}
          data-clickable="true"
          aria-label="Home"
          className="group flex items-center gap-3 shrink-0"
        >
          <HomeIcon
            size={20}
            className="text-cyan-400 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className="transition-all duration-200 group-hover:brightness-125"
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "24px",
              letterSpacing: "0.01em",
              color: "#22D3EE",
              textShadow:
                "0 0 6px rgba(34, 211, 238, 0.65), 0 0 16px rgba(34, 211, 238, 0.4), 0 0 36px rgba(34, 211, 238, 0.2)",
            }}
          >
            maaz.ai
          </span>
        </Link>

        {/* ─── Center: Main Navigation Links with Expanding Underline ─── */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 min-w-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => soundFx.playClick(500, 0.03)}
              data-clickable="true"
              className="relative flex flex-col items-center group py-1"
            >
              <span className="font-sans font-medium text-[15px] tracking-wide text-white/80 group-hover:text-white transition-colors duration-200">
                {link.label}
              </span>
              <span
                className="absolute -bottom-1.5 h-[2px] w-0 rounded-full transition-all duration-200 ease-out group-hover:w-full"
                style={{ background: "#22D3EE" }}
              />
            </Link>
          ))}
        </div>

        {/* ─── Right: Interactive Utility Dock (Sound, Telemetry, Lounge, Docs, Theme) ─── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound FX Toggle Button */}
          <button
            onClick={handleAudioToggle}
            data-clickable="true"
            aria-label={isMuted ? "Unmute audio effects" : "Mute audio effects"}
            title={isMuted ? "Audio: Muted" : "Audio: Active"}
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-cyan-400" />}
          </button>

          {/* Telemetry / Analytics Drawer Button */}
          {onOpenAnalytics && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenAnalytics();
              }}
              data-clickable="true"
              aria-label="Open System Telemetry Drawer"
              title="Real-time visitor telemetry"
              className="relative h-9 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <Activity size={14} className="text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Telemetry</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>
          )}

          {/* AI Lounge Companion Button */}
          {onOpenLounge && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenLounge();
              }}
              data-clickable="true"
              aria-label="Open AI Lounge"
              title="Chat with Maaz AI Assistant"
              className="relative h-9 px-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 flex items-center gap-1.5 text-xs font-comfortaa font-bold transition-all shadow-[0_0_15px_rgba(0,217,255,0.15)]"
            >
              <Bot size={15} />
              <span className="hidden md:inline">Lounge</span>
              <span className="min-w-[16px] h-4 px-1 rounded-full bg-cyan-400 text-black text-[9px] font-mono font-bold flex items-center justify-center">
                1
              </span>
            </button>
          )}

          {/* Documents / Resume Modal Button */}
          {onOpenDocs && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenDocs();
              }}
              data-clickable="true"
              aria-label="View Resume & Documents"
              title="Download targeted CV / Resume"
              className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <FileText size={15} />
            </button>
          )}

          <div className="hidden sm:block w-px h-6 bg-white/10 mx-0.5" />

          {/* Theme Toggler */}
          <ThemeToggle />

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundFx.playClick(400, 0.03);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            data-clickable="true"
            aria-label="Toggle mobile menu"
            className="lg:hidden h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Dropdown Menu ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 rounded-2xl border border-white/15 bg-black/90 p-5 backdrop-blur-2xl space-y-4 shadow-2xl animate-[modalIn_0.25s_ease-out]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFx.playClick(500, 0.03);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl font-sans font-medium text-slate-200 hover:bg-white/10 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-2">
            {onOpenLounge && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLounge();
                }}
                className="py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2"
              >
                <Bot size={14} />
                <span>AI Lounge</span>
              </button>
            )}

            {onOpenDocs && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDocs();
                }}
                className="py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 font-mono text-xs flex items-center justify-center gap-2"
              >
                <FileText size={14} />
                <span>Resume Dossier</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
