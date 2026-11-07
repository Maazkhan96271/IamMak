"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  FileText,
  Bot,
  Code2,
  Eye,
  CheckCircle2,
  Rocket,
  Sparkles,
  Terminal,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type { WorkflowItem } from "@/data/portfolioData";

interface WorkflowPipelineProps {
  workflow: WorkflowItem[];
  className?: string;
}

export function WorkflowPipeline({ workflow, className = "" }: WorkflowPipelineProps) {
  const [activeStep, setActiveStep] = useState<number>(3); // Default highlight "AI HELP" or "CODE"
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getStepIcon = (iconName: string, isActive: boolean) => {
    const props = {
      size: 20,
      className: isActive ? "text-cyan-300 animate-pulse" : "text-slate-300",
    };

    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb {...props} />;
      case "FileText":
        return <FileText {...props} />;
      case "Bot":
        return <Bot {...props} />;
      case "Code2":
        return <Code2 {...props} />;
      case "Eye":
        return <Eye {...props} />;
      case "CheckCircle":
        return <CheckCircle2 {...props} />;
      case "Rocket":
        return <Rocket {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const activeItem = workflow.find((w) => w.step === activeStep) || workflow[0];

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] space-y-8 overflow-hidden ${className}`}
    >
      {/* ─── Radial Gradient Spotlight ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.15), transparent 60%)`,
        }}
      />

      {/* ─── Top Header ─── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 inline-block" />
            <span className="font-mono text-xs text-slate-400 ml-1.5 flex items-center gap-1.5">
              <Terminal size={12} className="text-cyan-400" />
              pipeline.development.methodology
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            Autonomous Development Workflow
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-xl">
            My structured 7-stage engineering pipeline from initial problem conception to production cloud ship.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 backdrop-blur-md self-start sm:self-auto shrink-0">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          7 NODES CONNECTED
        </span>
      </div>

      {/* ─── Horizontal Animated Pipeline Viewport ─── */}
      <div className="relative z-10 overflow-x-auto pb-4 pt-6 px-2 -mx-2 scrollbar-none">
        <div className="min-w-[760px] relative flex items-center justify-between">
          {/* Glowing Animated Connecting Rail (Runs behind all 7 nodes) */}
          <div className="absolute top-[28px] left-8 right-8 h-1 bg-white/10 rounded-full z-0 overflow-hidden">
            {/* Animated Glowing Gradient Stream */}
            <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-emerald-400 via-purple-400 to-cyan-400 bg-[length:200%_100%] animate-[pulse_2.5s_ease-in-out_infinite] shadow-[0_0_12px_rgba(0,240,255,0.7)]" />
          </div>

          {/* Glowing Moving Comet Light */}
          <div className="absolute top-[26px] left-8 right-8 h-2 z-0 pointer-events-none overflow-hidden">
            <div className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[2px] animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
          </div>

          {/* 7 Workflow Nodes */}
          {workflow.map((item, idx) => {
            const isActive = item.step === activeStep;

            return (
              <div
                key={item.label}
                onClick={() => setActiveStep(item.step)}
                className="relative z-10 flex flex-col items-center cursor-pointer group/node transition-transform duration-300 hover:scale-105"
              >
                {/* Node Orb with Glowing Border */}
                <div
                  className={`h-14 w-14 rounded-2xl border-2 flex items-center justify-center backdrop-blur-xl transition-all duration-300 shadow-lg ${
                    isActive
                      ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                      : "border-white/15 bg-[#0a0e17] group-hover/node:border-cyan-400/60 group-hover/node:bg-white/10"
                  }`}
                >
                  {getStepIcon(item.icon, isActive)}
                </div>

                {/* Step Index Badge */}
                <span
                  className={`font-mono text-[10px] mt-2.5 px-2 py-0.5 rounded-full border transition-colors ${
                    isActive
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 font-bold"
                      : "border-white/10 bg-white/5 text-slate-400"
                  }`}
                >
                  0{item.step}
                </span>

                {/* Node Label: IDEA → PLAN → AI HELP → CODE → REVIEW → TEST → DEPLOY */}
                <span
                  className={`font-display text-xs sm:text-sm font-bold tracking-wider uppercase mt-1.5 transition-colors ${
                    isActive ? "text-cyan-300" : "text-white group-hover/node:text-cyan-300"
                  }`}
                >
                  {item.label}
                </span>

                {/* Node Subtitle */}
                <span className="font-mono text-[10px] text-slate-400 text-center max-w-[90px] mt-0.5 truncate">
                  {item.shortDesc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Active Node Inspector Telemetry Card ─── */}
      <div className="relative z-10 rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-3 rounded-xl border border-cyan-400/30 bg-cyan-500/10 shrink-0">
            {getStepIcon(activeItem.icon, true)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">
                STAGE 0{activeItem.step}
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-display font-bold text-white text-base sm:text-lg">
                {activeItem.label}
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm font-sans mt-0.5">
              {activeItem.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 font-mono text-[11px] text-slate-400">
          <span>Click any node to inspect</span>
          <ArrowRight size={13} className="text-cyan-400" />
        </div>
      </div>
    </div>
  );
}
