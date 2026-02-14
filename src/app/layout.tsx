import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Optimized Metadata Function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Craftology With Anupama || Envelopes || Coin Box || Gaddi Box || Toran || Tag || Resin || Scrapbook",
    description:
      "Explore our collection of handcrafted envelopes, resin art, gaddi, and bespoke scrapbooks. Unique, artisanal creations for every occasion.",
    keywords: [
      "handcrafted",
      "luxury envelopes",
      "custom resin art",
      "handmade gaddi",
      "scrapbooks",
      "torans",
      "artisan gifts",
      "raipur",
      "craft raipur",
      "craftology",
      "gifting envelopes",
      "gifts",
      "wedding envelopes",
      "resin",
      "bookmarks",
      "gift",
      "scrapbook",
    ],
    openGraph: {
      title: "Handcrafted Treasures",
      description:
        "Bespoke handcrafted items ranging from luxury envelopes to resin art.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Handcrafted Treasures",
      description: "Artisanal, handmade gifts and stationery.",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
