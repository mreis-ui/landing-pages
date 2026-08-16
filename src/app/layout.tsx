import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { company } from "@/lib/site";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = `https://${company.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Werkstatt ONE — Werkstattsoftware für KFZ-Meisterbetriebe",
    template: "%s · Werkstatt ONE",
  },
  description:
    "TÜV-Reminder, Mahnwesen, Terminbuchung — alles in einer Plattform. Von einer Werkstatt aus Ganderkesee, für KFZ-Betriebe. 30 Tage kostenlos testen.",
  keywords: [
    "Werkstattsoftware",
    "KFZ-Software",
    "Werkstatt ONE",
    "TÜV Reminder",
    "Mahnwesen",
    "Online Terminbuchung Werkstatt",
    "Ganderkesee",
    "Landkreis Oldenburg",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: company.product,
    title: "Werkstatt ONE — Werkstattsoftware für KFZ-Meisterbetriebe",
    description:
      "TÜV-Reminder, Mahnwesen, Terminbuchung — alles in einer Plattform. 30 Tage kostenlos testen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Werkstatt ONE — Werkstattsoftware für KFZ-Meisterbetriebe",
    description:
      "TÜV-Reminder, Mahnwesen, Terminbuchung — alles in einer Plattform.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">
        <Analytics />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
