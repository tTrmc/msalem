import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: "Moustafa Salem",
  description: "Full Stack Developer & Software Engineer - Creating exceptional digital experiences through clean code and innovative solutions.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased transition-colors duration-300">
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
      </body>
      </html>
  );
}