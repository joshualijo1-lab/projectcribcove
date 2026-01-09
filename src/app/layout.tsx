import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cribcove.ie"),
  title: {
    default: "CribCove | Luxury Real Estate Curated Worldwide",
    template: "%s | CribCove"
  },
  description:
    "CribCove curates luxury residences, private estates, and bespoke villas with a concierge-led viewing experience.",
  openGraph: {
    title: "CribCove | Luxury Real Estate Curated Worldwide",
    description:
      "Discover a curated portfolio of luxury residences, villas, and estates with a private concierge experience.",
    url: "https://cribcove.ie",
    siteName: "CribCove",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CribCove"
      }
    ],
    locale: "en_IE",
    type: "website"
  },
  alternates: {
    canonical: "https://cribcove.ie"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-ivory text-ink">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
