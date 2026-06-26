import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DataForge AI — Intelligent Data Automation Platform",
    template: "%s | DataForge AI",
  },
  description:
    "DataForge AI transforms raw data into actionable insights with autonomous pipelines, AI-driven transformations, and real-time anomaly detection. Reduce engineering overhead and ship smarter decisions.",
  keywords: [
    "AI data platform",
    "data automation",
    "ETL pipeline",
    "machine learning",
    "real-time analytics",
    "data engineering",
    "anomaly detection",
    "DataForge",
  ],
  authors: [{ name: "DataForge AI" }],
  creator: "DataForge AI",
  publisher: "DataForge AI",
  metadataBase: new URL("https://dataforge.ai"),
  openGraph: {
    title: "DataForge AI — Intelligent Data Automation Platform",
    description:
      "Autonomous AI-driven pipelines that clean, transform, and surface insights from your data at scale. No engineering overhead required.",
    url: "https://dataforge.ai",
    siteName: "DataForge AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataForge AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataForge AI — Intelligent Data Automation Platform",
    description:
      "Autonomous AI-driven pipelines that clean, transform, and surface insights from your data at scale.",
    images: ["/og-image.png"],
    creator: "@dataforge_ai",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-arctic-powder font-sans text-oceanic-noir antialiased">
        {children}
      </body>
    </html>
  );
}
