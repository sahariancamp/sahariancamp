import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saharian Camp — Luxury Desert Experience | Merzouga, Morocco",
  description: "An immersive luxury camp at the edge of Erg Chebbi dunes. Where the Sahara whispers and golden silence speaks. Experience Berber warmth, bio gastronomy, and infinite horizons.",
  keywords: ["Saharian Camp", "luxury desert camp", "Merzouga", "Erg Chebbi", "Morocco", "glamping", "Sahara", "Berber experience"],
  authors: [{ name: "Saharian Camp" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Saharian Camp — Where the Dunes Whisper",
    description: "Luxury camp at the edge of the impossible. Merzouga, Morocco.",
    type: "website",
    locale: "en_US",
    siteName: "Saharian Camp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saharian Camp — Where the Dunes Whisper",
    description: "Luxury camp at the edge of the impossible. Merzouga, Morocco.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F0F1E] text-[#E8D5B7]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
