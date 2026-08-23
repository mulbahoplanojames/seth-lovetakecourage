import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f5ede0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lovetakesnyiawumuntu.com"),
  title: "NYIAWUMUNTU & Seth | Wedding",
  description:
    "Join NYIAWUMUNTU & Seth for a weekend of celebration in Kigali, Rwanda — schedule, travel, registry, and RSVP.",
  icons: {
    icon: "/assets/logo-main.png",
    apple: "/assets/logo-main.png",
  },
  openGraph: {
    title: "NYIAWUMUNTU & Seth · A Kigali Wedding",
    description: "October 24, 2026 — celebrate with us at Jalia Hall.",
    type: "website",
    url: "https://lovetakesnyiawumuntu.com",
    images: [
      {
        url: "/assets/hero-couple-D5jhPesi.jpg",
        width: 1200,
        height: 800,
        alt: "NYIAWUMUNTU & Seth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NYIAWUMUNTU & Seth · A Kigali Wedding",
    description: "October 24, 2026 — celebrate with us at Jalia Hall.",
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
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} ${greatVibes.variable}`}
    >
      <body className="bg-[#fdfaf4] text-[#2b2520] font-sans antialiased selection:bg-[#ccb89c]/30">
        {children}
      </body>
    </html>
  );
}
