import { NextResponse } from "next/server";

export async function GET() {
  const analyticsData = {
    totalVisitors: 8492,
    activeNow: 4,
    latencyMs: 14,
    serverNode: "blr1 (Bengaluru, IN)",
    uptime: "99.98%",
    countries: [
      { code: "IN", name: "India", count: 6284, pct: 74 },
      { code: "US", name: "United States", count: 1188, pct: 14 },
      { code: "DE", name: "Germany", count: 339, pct: 4 },
      { code: "SG", name: "Singapore", count: 254, pct: 3 },
      { code: "GB", name: "United Kingdom", count: 254, pct: 3 },
      { code: "CA", name: "Canada", count: 173, pct: 2 },
    ],
    os: [
      { name: "macOS", pct: 48, icon: "apple" },
      { name: "Windows", pct: 28, icon: "windows" },
      { name: "Linux", pct: 14, icon: "terminal" },
      { name: "iOS", pct: 6, icon: "smartphone" },
      { name: "Android", pct: 4, icon: "tablet" },
    ],
    pageViews: {
      projects: 5120,
      credentials: 3840,
      forge: 2950,
      about: 2410,
    },
    systemStatus: {
      database: "Healthy (AES-256-GCM Vault)",
      apiGateway: "Operational (FastAPI / Next.js)",
      inference: "Ready (AWS Bedrock & LLM Heuristics)",
      cdn: "Edge Global (Vercel / GitHub)",
    },
  };

  return NextResponse.json(analyticsData, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
