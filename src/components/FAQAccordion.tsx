"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Terminal, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQItem } from "@/data/portfolioData";

interface FAQAccordionProps {
  faq: FAQItem[];
  className?: string;
}

export function FAQAccordion({ faq, className = "" }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id || "tech-stack");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* ─── Radial Gradient Spotlight ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.15), transparent 60%)`,
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 inline-block" />
            <span className="font-mono text-xs text-slate-400 ml-1.5 flex items-center gap-1.5">
              <Terminal size={12} className="text-cyan-400" />
              faq.intel.knowledge
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 backdrop-blur-md">
            <HelpCircle size={12} />
            3 INQUIRIES
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-sans">
            Direct answers on tech stack, career trajectory, and technical collaborations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 pt-2">
          {faq.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-cyan-400/50 bg-black/60 shadow-[0_0_20px_rgba(0,240,255,0.08)]"
                    : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/50"
                }`}
              >
                {/* Accordion Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  data-clickable="true"
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 block">
                      {item.tag}
                    </span>
                    <span className="font-display font-bold text-white text-base sm:text-lg block">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 border-cyan-400 text-cyan-300" : "text-slate-400"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Animated Accordion Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 border-t border-white/5 mt-1">
                        <div className="border-l-2 border-cyan-400/60 pl-3.5 py-1 text-slate-300 text-sm leading-relaxed font-sans">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct contact hint */}
      <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <MessageSquare size={13} className="text-cyan-400" />
          Have custom questions?
        </span>
        <a
          href="mailto:maazkhan96271@gmail.com"
          className="text-cyan-400 hover:text-cyan-300 hover:underline"
          data-clickable="true"
        >
          maazkhan96271@gmail.com ↗
        </a>
      </div>
    </div>
  );
}
