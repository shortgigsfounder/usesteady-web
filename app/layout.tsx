import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://usesteady.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Title strategy ──────────────────────────────────────────────────────────
  // Primary keyword first, brand second. Under 60 chars for full display.
  title: {
    default: "UseSteady — Turn Plain Language into Controlled System Execution",
    template: "%s | UseSteady",
  },

  // ── Description ─────────────────────────────────────────────────────────────
  // Outcome-focused. 150–160 chars. Includes tension + relief.
  description:
    "Stop running commands you didn't review. UseSteady turns plain language into controlled, verifiable system execution. Every action reviewed, approved, and verified before it runs.",

  // ── Keywords ────────────────────────────────────────────────────────────────
  keywords: [
    "controlled system execution",
    "AI execution control",
    "developer command approval",
    "verifiable automation",
    "governed AI execution",
    "deterministic code execution",
    "AI agent oversight",
    "audit trail developer tool",
    "review before execute",
    "safe AI automation",
    "UseSteady",
  ],

  // ── Canonical ───────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png",   sizes: "192x192", type: "image/png" },
    ],
    apple:   { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon.ico",
  },

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    title:       "UseSteady — Turn Plain Language into Controlled System Execution",
    description: "Stop running commands you didn't review. Every action reviewed, approved, and verified before it runs.",
    images: [
      {
        url:    "/social/og-image-1200x630.png",
        width:  1200,
        height: 630,
        alt:    "UseSteady — Review it. Approve it. Then it runs.",
      },
    ],
    siteName: "UseSteady",
    type:     "website",
    url:      BASE_URL,
    locale:   "en_US",
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card:    "summary_large_image",
    site:    "@UseSteady",
    creator: "@UseSteady",
    title:   "UseSteady — Review. Approve. Then it runs.",
    description: "Turn plain language into controlled, verifiable system execution. Nothing runs silently.",
    images:  ["/social/og-image-1200x630.png"],
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":     -1,
    },
  },

  // ── App / PWA ───────────────────────────────────────────────────────────────
  applicationName: "UseSteady",
  category:        "developer tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
