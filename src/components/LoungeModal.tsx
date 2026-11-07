"use client";

import React, { useState, useEffect } from "react";
import { X, Bot, Send, Sparkles, Terminal, ArrowRight } from "lucide-react";
import { soundFx } from "@/lib/sound";

interface LoungeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export function LoungeModal({ isOpen, onClose }: LoungeModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hey! I'm Maaz's AI assistant. Ask me anything about his projects, architecture stack (Next.js 16, Python, AWS Bedrock, C++20), Polaris School of Technology milestones, or collaboration opportunities.",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Tell me about ScamShield",
    "What is your target for 2030?",
    "How can we collaborate?",
    "What did you build at Polaris OJT?",
  ];

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

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    soundFx.playPop();
    const userMsg: ChatMessage = {
      sender: "user",
      text: query,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Knowledge base logic for Maaz Khan
    setTimeout(() => {
      let reply = "Maaz is a Full-Stack & Applied AI developer in Bengaluru pursuing B.Tech in Applied AI at Polaris School of Technology (Class of 2026–2030).";
      const q = query.toLowerCase();

      if (q.includes("scamshield")) {
        reply = "ScamShield is Maaz's open-source AI scam-risk analyzer for SMS, emails, WhatsApp forwards, payment requests, and QR codes. It combines deterministic rules with LLM heuristics and client-side AES-256-GCM encrypted scan history in IndexedDB. Live at: https://scamshield-jet.vercel.app";
      } else if (q.includes("target") || q.includes("2030") || q.includes("goal")) {
        reply = "Maaz's career target is to become an elite Software Engineer by 2030 (SWE 2030). He is admitted to Polaris School of Technology (2026 Batch) and is actively targeting 2026 software engineering internships.";
      } else if (q.includes("collaborate") || q.includes("hire") || q.includes("contact")) {
        reply = "Maaz is open for collaborations on Applied AI engines, Next.js web applications, hackathons, and 2026 engineering internships. You can reach him at maazkhan96271@gmail.com or via the contact form on this site!";
      } else if (q.includes("ojt") || q.includes("compliance") || q.includes("b2b")) {
        reply = "During Semester 1 OJT at Polaris School of Technology, Maaz built an enterprise B2B vendor risk and compliance onboarding platform that replaced manual email workflows with centralized document verification, automated expiration alerts, and client-side state machines.";
      } else if (q.includes("stack") || q.includes("tech") || q.includes("skills")) {
        reply = "Maaz's core stack includes Next.js 16, React 19, TypeScript, and Tailwind CSS for frontend; Python (FastAPI, Flask) and C++20 for high-performance backends and DSA drills; and AWS Bedrock foundation models for Applied AI systems.";
      } else if (q.includes("hospital") || q.includes("hms")) {
        reply = "The Hospital Management System (HMS) is a full-stack platform built with Python, Flask, FastAPI, and Next.js, featuring 3 role-isolated portals (Admin, Doctor, Patient) and zero-conflict appointment scheduling. Live at: https://hospital-management-system-spammer.vercel.app";
      } else if (q.includes("recon") || q.includes("aws") || q.includes("gst")) {
        reply = "Recon-Agent was built for AWS First Commit 2026. It is an autonomous multi-agent tax recovery engine that automates compliance under Indian GST Rule 88D using AWS Bedrock and Strands SDK.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
      soundFx.playClick(700, 0.04);
    }, 600);
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
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Bot size={17} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-comfortaa font-bold text-white text-base">
                  Maaz AI Lounge
                </h3>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  ONLINE
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-400">
                Interactive Persona &amp; Knowledge Agent
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(400, 0.03);
              onClose();
            }}
            data-clickable="true"
            aria-label="Close Lounge"
            className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Chat History Viewport */}
        <div className="p-5 space-y-4 max-h-[380px] overflow-y-auto font-sans">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-cyan-500 text-black font-medium"
                    : "bg-white/[0.06] border border-white/10 text-slate-200"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 p-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px] text-slate-400">synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2.5 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              data-clickable="true"
              className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-colors whitespace-nowrap"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-black/60 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about projects, stack, or collaborations..."
            className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleSend()}
            data-clickable="true"
            aria-label="Send message"
            className="h-10 w-10 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center shrink-0 transition-transform active:scale-95"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
