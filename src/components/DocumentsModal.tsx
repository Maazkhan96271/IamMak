"use client";

import React, { useState, useEffect } from "react";
import { X, FileText, Download, Eye, Briefcase, Sparkles, ArrowLeft } from "lucide-react";
import { soundFx } from "@/lib/sound";

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoleTrack {
  id: string;
  label: string;
  desc: string;
  color: string;
  docs: {
    kind: "resume" | "cv";
    label: string;
    desc: string;
    fileName: string;
  }[];
}

export function DocumentsModal({ isOpen, onClose }: DocumentsModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roleTracks: RoleTrack[] = [
    {
      id: "fullstack-ai",
      label: "Full-Stack AI Developer",
      desc: "Next.js 16, React 19, TypeScript, and AI-native web platforms",
      color: "#00d9ff",
      docs: [
        {
          kind: "resume",
          label: "1-Page Resume",
          desc: "Targeted summary for Full-Stack & Applied AI engineering roles",
          fileName: "Maaz_Khan_FullStack_AI_Resume.pdf",
        },
        {
          kind: "cv",
          label: "Extended Curriculum Vitae",
          desc: "Full academic record at Polaris School of Technology & project deep-dives",
          fileName: "Maaz_Khan_FullStack_AI_CV.pdf",
        },
      ],
    },
    {
      id: "systems-backend",
      label: "Backend & Systems Engineer",
      desc: "Python, FastAPI, Flask, C++20 DSA drills, and state machine architecture",
      color: "#10b981",
      docs: [
        {
          kind: "resume",
          label: "1-Page Resume",
          desc: "Targeted summary for Backend API & Systems engineering positions",
          fileName: "Maaz_Khan_Backend_Systems_Resume.pdf",
        },
        {
          kind: "cv",
          label: "Extended Curriculum Vitae",
          desc: "Architecture specs: conflict-free booking, Rule 88D compliance & OJT platform",
          fileName: "Maaz_Khan_Backend_Systems_CV.pdf",
        },
      ],
    },
    {
      id: "applied-ai",
      label: "Applied AI & Cloud Specialist",
      desc: "AWS Bedrock, Strands multi-agent SDK, LLM heuristics, and vector systems",
      color: "#a78bfa",
      docs: [
        {
          kind: "resume",
          label: "1-Page Resume",
          desc: "Targeted summary for Applied AI, AWS First Commit, and model orchestration",
          fileName: "Maaz_Khan_Applied_AI_Resume.pdf",
        },
        {
          kind: "cv",
          label: "Extended Curriculum Vitae",
          desc: "Comprehensive ML telemetry, evaluation metrics & autonomous agents",
          fileName: "Maaz_Khan_Applied_AI_CV.pdf",
        },
      ],
    },
  ];

  useEffect(() => {
    if (!isOpen) setSelectedRole(null);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeTrack = roleTracks.find((r) => r.id === selectedRole);

  const handleDownload = (fileName: string) => {
    soundFx.playPop();
    // In production, downloads the actual generated PDF or triggers mailto
    const blob = new Blob(
      [
        `MAAZ KHAN — CURRICULUM VITAE & RESUME\n\n` +
          `Role: Full-Stack & Applied AI Developer\n` +
          `Education: B.Tech in Applied Artificial Intelligence @ Polaris School of Technology (Class of 2026–2030)\n` +
          `Location: Bengaluru, India\n` +
          `Target: Software Engineer by 2030 (SWE 2030)\n` +
          `GitHub: https://github.com/Maazkhan96271\n` +
          `LinkedIn: https://www.linkedin.com/in/maaz-khan-9124232bb/\n\n` +
          `FEATURED PROJECTS:\n` +
          `1. ScamShield (Next.js 16, TypeScript, Tailwind, LLM Heuristics, AES-256-GCM)\n` +
          `   Live: https://scamshield-jet.vercel.app\n` +
          `2. Hospital Management System (Python, Flask, FastAPI, Next.js, Role Isolation)\n` +
          `   Live: https://hospital-management-system-spammer.vercel.app\n` +
          `3. Recon-Agent (AWS Bedrock, Strands SDK, FastAPI, Indian GST Rule 88D)\n` +
          `   Repo: https://github.com/Maazkhan96271/gst-recon-agent\n` +
          `4. B2B Vendor Compliance Platform (Polaris OJT Sem 1 Enterprise Ship)\n\n` +
          `Contact: maazkhan96271@gmail.com\n`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.replace(".pdf", ".txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="drawer-overlay"
        onClick={() => {
          soundFx.playClick(400, 0.03);
          onClose();
        }}
        aria-hidden="true"
      />

      <div className="legal-modal rounded-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            {activeTrack && (
              <button
                onClick={() => {
                  soundFx.playClick(450, 0.03);
                  setSelectedRole(null);
                }}
                data-clickable="true"
                aria-label="Back to tracks"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
              >
                <ArrowLeft size={15} />
              </button>
            )}
            <div>
              <h3 className="font-comfortaa font-bold text-white text-lg">
                {activeTrack ? activeTrack.label : "Credentials & Documents"}
              </h3>
              <p className="font-mono text-xs text-slate-400">
                {activeTrack
                  ? "Select document format for review or download"
                  : "Choose the role or engineering track you are hiring for"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(400, 0.03);
              onClose();
            }}
            data-clickable="true"
            aria-label="Close modal"
            className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {!activeTrack ? (
            /* Role Track Selection */
            <div className="space-y-3">
              {roleTracks.map((role) => (
                <div
                  key={role.id}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedRole(role.id);
                  }}
                  data-clickable="true"
                  className="rounded-xl border border-white/10 bg-black/40 p-4 transition-all duration-300 hover:border-cyan-400/50 hover:bg-black/60 cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: role.color }}
                      />
                      <span className="font-comfortaa font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {role.label}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs font-sans pl-4">
                      {role.desc}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Document Download List */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeTrack.docs.map((doc) => (
                <div
                  key={doc.kind}
                  className="rounded-xl border border-white/10 bg-black/40 p-5 flex flex-col justify-between space-y-4 hover:border-cyan-400/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        <FileText size={18} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {doc.kind.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-comfortaa font-bold text-white text-base">
                      {doc.label}
                    </h4>
                    <p className="text-slate-400 text-xs font-sans leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownload(doc.fileName)}
                    data-clickable="true"
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-400 text-black font-comfortaa font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,217,255,0.2)] hover:bg-cyan-300 transition-all hover:scale-105 active:scale-95"
                  >
                    <Download size={14} />
                    <span>Download {doc.kind.toUpperCase()}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50 flex items-center justify-between font-mono text-[11px] text-slate-400">
          <span>Official Polaris School of Technology Undergrad Dossier</span>
          <a
            href="mailto:maazkhan96271@gmail.com"
            className="text-cyan-400 hover:underline"
            data-clickable="true"
          >
            Direct Verification ↗
          </a>
        </div>
      </div>
    </>
  );
}
