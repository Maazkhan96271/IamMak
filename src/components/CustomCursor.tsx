"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Fast tight spring for center dot
  const dotX = useSpring(rawX, { damping: 30, stiffness: 600, mass: 0.2 });
  const dotY = useSpring(rawY, { damping: 30, stiffness: 600, mass: 0.2 });

  // Smooth floating spring for glass circle (40px)
  const ringX = useSpring(rawX, { damping: 25, stiffness: 350, mass: 0.5 });
  const ringY = useSpring(rawY, { damping: 25, stiffness: 350, mass: 0.5 });

  // Soft atmospheric lag for large ambient glow (100px)
  const glowX = useSpring(rawX, { damping: 22, stiffness: 200, mass: 0.8 });
  const glowY = useSpring(rawY, { damping: 22, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Disable on coarse touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-clickable='true'], summary"
      );
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [isVisible, rawX, rawY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* ─── Layer 1: Ambient 100px Cyan Radial Glow ─── */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 h-[100px] w-[100px] rounded-full pointer-events-none -z-10"
        css-glow=""
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.12)_0%,transparent_65%)] blur-[4px]" />
      </motion.div>

      {/* ─── Layer 2: 40px Frosted Glass Floating Ring with Highlight ─── */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.35 : 1,
          borderColor: isHovered ? "rgba(0, 217, 255, 0.45)" : "rgba(255, 255, 255, 0.16)",
          backgroundColor: isHovered ? "rgba(0, 217, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed top-0 left-0 h-[40px] w-[40px] rounded-full pointer-events-none backdrop-blur-[4px] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_12px_rgba(0,217,255,0.1)] flex items-center justify-center"
      >
        {/* Subtle glass reflection highlight rotated -20deg */}
        <div className="absolute top-[7px] left-[9px] w-[10px] h-[3px] rounded-full bg-white/40 blur-[1.2px] -rotate-[20deg]" />
      </motion.div>

      {/* ─── Layer 3: Sharp 6px Glowing Center Dot ─── */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
          backgroundColor: isHovered ? "#ffffff" : "#00d9ff",
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 h-[6px] w-[6px] rounded-full pointer-events-none shadow-[0_0_8px_rgba(0,217,255,0.9)]"
      />
    </div>
  );
}
