import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import LenisProvider from "@/components/saharian/LenisProvider";
import CustomCursor from "@/components/saharian/CustomCursor";
import ScrollProgress from "@/components/saharian/ScrollProgress";
import { ThemeToggle } from "@/components/saharian/ThemeToggle";
import Navbar from "@/components/saharian/Navbar";
import Footer from "@/components/saharian/Footer";
import { ThemeProvider } from "@/components/saharian/ThemeProvider";

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
  description:
    "An immersive luxury camp at the edge of Erg Chebbi dunes. Where the Sahara whispers and golden silence speaks. Experience Berber warmth, bio gastronomy, and infinite horizons.",
  keywords: [
    "Saharian Camp",
    "luxury desert camp",
    "Merzouga",
    "Erg Chebbi",
    "Morocco",
    "glamping",
    "Sahara",
    "Berber experience",
  ],
  authors: [{ name: "Saharian Camp" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Saharian Camp — Where the Dunes Whisper",
    description:
      "Luxury camp at the edge of the impossible. Merzouga, Morocco.",
    type: "website",
    locale: "en_US",
    siteName: "Saharian Camp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saharian Camp — Where the Dunes Whisper",
    description:
      "Luxury camp at the edge of the impossible. Merzouga, Morocco.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <CustomCursor />
            <ScrollProgress />
            <ThemeToggle />
            <div className="sand-grain-overlay" />
            <Navbar />
            {children}
            <Footer />
            <Script
              id="chatbase-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="8Z6Cwj7BUj15tCWsdeJhO";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
                `,
              }}
            />
          </LenisProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
