import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/error-boundary";
import React from "react";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";

const  bricolageGrotesque  =  Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesque',
});

const ppSupplySans = localFont({
  src: '../../public/fonts/PPSupplyMono-Regular.otf',
  display: 'swap',
  variable: '--font-supply',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://msalem.dev'),
  title: "Moustafa Salem",
  description: "Full Stack Developer & Software Engineer - Creating exceptional digital experiences through clean code and innovative solutions.",
  keywords: "Full Stack Developer, Software Engineer, Web Developer, React, Next.js, TypeScript, JavaScript",
  authors: [{ name: "Moustafa Salem" }],
  creator: "Moustafa Salem",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://msalem.dev",
    siteName: "Moustafa Salem - Portfolio",
    title: "Moustafa Salem - Full Stack Developer",
    description: "Full Stack Developer & Software Engineer - Creating exceptional digital experiences through clean code and innovative solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Moustafa Salem - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moustafa Salem - Full Stack Developer",
    description: "Full Stack Developer & Software Engineer - Creating exceptional digital experiences through clean code and innovative solutions.",
    images: ["/og-image.jpg"],
    creator: "@msalem",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`dark ${bricolageGrotesque.variable} ${ppSupplySans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Moustafa Salem",
              jobTitle: "Full Stack Developer",
              description: "Computer Science Student at Queen's University and Full Stack Developer creating exceptional digital experiences",
              url: "https://msalem.dev",
              email: "salemmoustafa442@gmail.com",
              telephone: "+1-437-606-5735",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kingston",
                addressRegion: "ON",
                addressCountry: "CA",
              },
              sameAs: [
                "https://github.com/tTrmc",
                "https://linkedin.com/in/moustafasalem"
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Full Stack Development",
                "Web Development"
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Queen's University",
              }
            })
          }}
        />
      </head>
      <body className="font-body antialiased transition-colors duration-300">
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--primary)',
              color: 'var(--background)',
              fontFamily: 'var(--font-grotesque)',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'var(--background)',
                secondary: 'var(--primary)',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: 'var(--background)',
                secondary: '#ef4444',
              },
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
      </body>
      </html>
  );
}