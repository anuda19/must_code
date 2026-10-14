import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// next/font self-hosts and subsets Google Fonts at build time —
// no render-blocking external font request, which also helps Core Web Vitals (a ranking factor).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://www.groundwork.example"; // TODO: replace with your real production domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skillgist — Know what to study before your next interview",
    template: "%s | Skillgist ",
  },
  description:
    "Skillgist assesses your skills against a specific role and company, shows you exactly where the gaps are, and builds an AI-adapted preparation plan with realistic mock interviews.",
  keywords: [
    "interview preparation",
    "technical interview prep",
    "software engineer interview",
    "AI mock interview",
    "skill gap analysis",
  ],
  authors: [{ name: "Skillgist" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Skillgist",
    title: "Skillgist — Know what to study before your next interview",
    description:
      "Personalized skill assessment, gap analysis, and AI mock interviews for your target role and company.",
    images: [
      {
        url: "/og-image.png", // TODO: add a real 1200x630 image to /public
        width: 1200,
        height: 630,
        alt: "Skillgist  interview preparation platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillgist — Know what to study before your next interview",
    description:
      "Personalized skill assessment, gap analysis, and AI mock interviews for your target role and company.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  width: "device-width",
  initialScale: 1,
};

// Organization structured data lives at the root layout since it applies site-wide.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skillgist",
  url: siteUrl,
  description:
    "AI-powered interview preparation platform offering personalized skill assessment, gap analysis, and mock interviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(manrope.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
