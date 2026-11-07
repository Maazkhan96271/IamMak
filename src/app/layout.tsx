import type { Metadata } from "next";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://maazkhan96271.github.io"),
  title: "Maaz Khan — FULL-STACK · AI · DEVELOPER",
  description:
    "Building AI-Native Products, Intelligent Workflows & High-Performance Systems. B.Tech Applied AI @ Polaris School of Technology (Class of 2026–2030), Bengaluru, India.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Maaz Khan — FULL-STACK · AI · DEVELOPER",
    description:
      "Building AI-Native Products, Intelligent Workflows & High-Performance Systems.",
    images: ["/assets/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-[#f0f6fc] antialiased selection:bg-cyan-500/30 selection:text-cyan-300 min-h-screen">
        {/* Subtle Noise Grain Texture Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Multi-layer Luxury Custom Cursor matching ayushcmd.me */}
        <CustomCursor />

        {/* Global UI Provider with Floating 72px Glass Navbar, Telemetry Drawer, Lounge & Docs Modals */}
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
