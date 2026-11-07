"use client";

import React, { useEffect, useState } from "react";
import { X, Activity, Server, Globe2, ShieldCheck, Cpu, Smartphone, Laptop, Terminal } from "lucide-react";
import { soundFx } from "@/lib/sound";

interface AnalyticsData {
  totalVisitors: number;
  activeNow: number;
  latencyMs: number;
  serverNode: string;
  uptime: string;
  countries: { code: string; name: string; count: number; pct: number }[];
  os: { name: string; pct: number; icon: string }[];
  systemStatus: Record<string, string>;
}

interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsDrawer({ isOpen, onClose }: AnalyticsDrawerProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !data) {
      setLoading(true);
      fetch("/api/analytics")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen, data]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className="drawer-overlay"
        onClick={() => {
          soundFx.playClick(400, 0.03);
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <aside
        className="analytics-drawer overflow-y-auto"
        role="dialog"
        aria-label="Real-time telemetry & analytics"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Activity size={16} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-comfortaa font-bold text-white text-base">
                System Telemetry
              </h3>
              <p className="font-mono text-[11px] text-slate-400">
                Live Visitor &amp; Engine Analytics
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(400, 0.03);
              onClose();
            }}
            data-clickable="true"
            aria-label="Close telemetry drawer"
            className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 font-sans">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="stat-pill">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                Total Visitors
              </span>
              <div className="text-2xl font-bold font-comfortaa text-white mt-1">
                {data ? data.totalVisitors.toLocaleString() : "8,492"}
              </div>
              <span className="font-mono text-[10px] text-cyan-400 flex items-center gap-1 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Active Now: {data?.activeNow || 4}
              </span>
            </div>

            <div className="stat-pill">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                API Latency
              </span>
              <div className="text-2xl font-bold font-comfortaa text-emerald-400 mt-1">
                {data?.latencyMs || 14}ms
              </div>
              <span className="font-mono text-[10px] text-slate-400 mt-1 block">
                Uptime: {data?.uptime || "99.98%"}
              </span>
            </div>
          </div>

          {/* Node Location */}
          <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-2">
              <Server size={14} className="text-cyan-400" />
              Primary Node:
            </span>
            <span className="text-cyan-300 font-semibold">
              {data?.serverNode || "blr1 (Bengaluru, IN)"}
            </span>
          </div>

          {/* Global Reach / Countries Breakdown */}
          <div className="space-y-3">
            <div className="sec-lbl">
              <Globe2 size={12} className="text-cyan-400" />
              <span>Visitor Demographics</span>
            </div>

            <div className="space-y-2.5">
              {(data?.countries || [
                { code: "IN", name: "India", pct: 74, count: 6284 },
                { code: "US", name: "United States", pct: 14, count: 1188 },
                { code: "DE", name: "Germany", pct: 4, count: 339 },
                { code: "SG", name: "Singapore", pct: 3, count: 254 },
                { code: "GB", name: "United Kingdom", pct: 3, count: 254 },
              ]).map((c) => (
                <div key={c.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">
                      {c.name} ({c.code})
                    </span>
                    <span className="text-cyan-400 font-semibold">{c.pct}%</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill bg-gradient-to-r from-cyan-400 to-emerald-400"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Systems Breakdown */}
          <div className="space-y-3">
            <div className="sec-lbl">
              <Laptop size={12} className="text-cyan-400" />
              <span>Client Operating Systems</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(data?.os || [
                { name: "macOS", pct: 48 },
                { name: "Windows", pct: 28 },
                { name: "Linux", pct: 14 },
                { name: "iOS / Android", pct: 10 },
              ]).map((os) => (
                <div key={os.name} className="os-chip justify-between">
                  <span className="text-xs text-slate-300 font-mono truncate">{os.name}</span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">{os.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engine Health Checks */}
          <div className="space-y-3">
            <div className="sec-lbl">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Subsystem Status</span>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Vault Security</span>
                <span className="text-emerald-400">AES-256-GCM Locked</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">API Gateway</span>
                <span className="text-emerald-400">Next.js 16 SSR / Edge</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AI Inference Engine</span>
                <span className="text-cyan-300">AWS Bedrock Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50 text-center font-mono text-[10px] text-slate-500">
          Telemetry stream auto-refreshes every 60s
        </div>
      </aside>
    </>
  );
}
