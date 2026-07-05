import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ReserveProvider } from "@/store/ReserveContext";
import { LoadingGate } from "@/components/ui/LoadingGate";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VILASA | Where the Lake Remembers Kings",
  description: "A private lake reserve in the hills above Udaipur, Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-ink text-ivory selection:bg-gold/30 selection:text-ivory">
        <ReserveProvider>
          <SmoothScrollProvider>
            {/* Ultra Luxury Overlays */}
            <CustomCursor />
            <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay hidden md:block" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <LoadingGate />
            <MenuOverlay />
            {children}
          </SmoothScrollProvider>
        </ReserveProvider>
      </body>
    </html>
  );
}
