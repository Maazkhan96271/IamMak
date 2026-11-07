"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mk_theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("mk_theme", nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
      aria-label="Toggle Dark / Light Theme"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.6, rotate: -45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.6, rotate: 45, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </motion.div>
    </button>
  );
}
