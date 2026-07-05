import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ReserveProvider } from "@/store/ReserveContext";
import { LoadingGate } from "@/components/ui/LoadingGate";
import { MenuOverlay } from "@/components/layout/MenuOverlay";

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
            <LoadingGate />
            <MenuOverlay />
            {children}
          </SmoothScrollProvider>
        </ReserveProvider>
      </body>
    </html>
  );
}
