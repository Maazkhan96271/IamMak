"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = target.closest("a, button, [role='button'], input, textarea, select, [data-clickable='true']");
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
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full bg-cyan-400 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 36 : 8,
          height: isHovered ? 36 : 8,
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.35)" : "#00f0ff",
          boxShadow: isHovered ? "0 0 20px rgba(0, 240, 255, 0.6)" : "0 0 8px rgba(0, 240, 255, 0.8)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 350 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[998] rounded-full border border-cyan-400/40"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          borderColor: isHovered ? "rgba(0, 240, 255, 0.8)" : "rgba(0, 240, 255, 0.25)",
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      />
    </>
  );
}
