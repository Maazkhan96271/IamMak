import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maazkhan96271.github.io"),
  title: "Maaz Khan — FULL-STACK · AI · DEVELOPER",
  description:
    "Building AI-Native Products, Intelligent Workflows & High-Performance Systems. B.Tech Applied AI @ Polaris School of Technology (2026–2030).",
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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#050505] text-[#f0f6fc] antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        {/* Subtle Noise Grain Texture Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom Interactive Cursor */}
        <CustomCursor />

        {/* Fixed Glassmorphism Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="pt-[72px]">{children}</div>
      </body>
    </html>
  );
}
