import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "AyushAI - आपका मुफ़्त स्वास्थ्य सहायक",
    template: "%s | AyushAI",
  },
  description:
    "India ka pehla free Ayurveda + Modern Medicine AI. Symptoms check karo, Ayurvedic remedies paao, medicine side effects Hindi mein jaano. Bilkul free!",
  keywords: [
    "ayurveda",
    "ayurvedic remedies",
    "health tips hindi",
    "symptom checker india",
    "free clinic finder",
    "medicine side effects hindi",
    "ayush ai",
    "indian health app",
    "free health assistant india",
    "ayurveda modern medicine",
  ],
  authors: [{ name: "AyushAI" }],
  creator: "AyushAI",
  verification: {
    google: "1q8Om_MrxenH3-Di3OiP7ds3Bi7wmVsS8gGb6Og_wgw",
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: "https://ayush-ai-t6bo.vercel.app",
    title: "AyushAI - आपका मुफ़्त स्वास्थ्य सहायक",
    description:
      "India ka pehla free Ayurveda + Modern Medicine AI. Symptoms check karo, remedies paao, medicine info Hindi mein.",
    siteName: "AyushAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AyushAI - Free Ayurveda + Modern Medicine AI",
    description:
      "India ka pehla free health AI - Ayurveda + Modern Medicine ek saath",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0d4f3c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body
        className={`${dmSans.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}