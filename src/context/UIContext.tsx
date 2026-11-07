"use client";

import React, { createContext, useContext, useState } from "react";
import { AnalyticsDrawer } from "@/components/AnalyticsDrawer";
import { LoungeModal } from "@/components/LoungeModal";
import { DocumentsModal } from "@/components/DocumentsModal";
import { Navbar } from "@/components/Navbar";

interface UIContextType {
  openAnalytics: () => void;
  closeAnalytics: () => void;
  openLounge: () => void;
  closeLounge: () => void;
  openDocs: () => void;
  closeDocs: () => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    // Graceful fallback if called outside provider
    return {
      openAnalytics: () => {},
      closeAnalytics: () => {},
      openLounge: () => {},
      closeLounge: () => {},
      openDocs: () => {},
      closeDocs: () => {},
    };
  }
  return context;
}

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isLoungeOpen, setIsLoungeOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const openAnalytics = () => setIsAnalyticsOpen(true);
  const closeAnalytics = () => setIsAnalyticsOpen(false);

  const openLounge = () => setIsLoungeOpen(true);
  const closeLounge = () => setIsLoungeOpen(false);

  const openDocs = () => setIsDocsOpen(true);
  const closeDocs = () => setIsDocsOpen(false);

  return (
    <UIContext.Provider
      value={{
        openAnalytics,
        closeAnalytics,
        openLounge,
        closeLounge,
        openDocs,
        closeDocs,
      }}
    >
      {/* Floating Glass Navbar */}
      <Navbar
        onOpenAnalytics={openAnalytics}
        onOpenLounge={openLounge}
        onOpenDocs={openDocs}
      />

      {/* Global Modals & Slide-over Drawer from ayushcmd.me */}
      <AnalyticsDrawer isOpen={isAnalyticsOpen} onClose={closeAnalytics} />
      <LoungeModal isOpen={isLoungeOpen} onClose={closeLounge} />
      <DocumentsModal isOpen={isDocsOpen} onClose={closeDocs} />

      {/* Main page content */}
      <div className="pt-[76px]">{children}</div>
    </UIContext.Provider>
  );
}
