import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

import { Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
V0_Font_Geist({ weight: ["100","200","300","400","500","600","700","800","900"] })
V0_Font_Geist_Mono({ weight: ["100","200","300","400","500","600","700","800","900"] })
V0_Font_Source_Serif_4({ weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: "Portfolio - Fullstack Web Developer",
  description:
    "Professional portfolio of a fullstack web developer specializing in modern web technologies, React, Next.js, and cloud solutions.",
  keywords: "fullstack developer, web developer, React, Next.js, TypeScript, portfolio",
  authors: [{ name: "Developer" }],
  creator: "Developer",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://kevinpoppe.com",
    title: "Portfolio - Fullstack Web Developer",
    description: "Professional portfolio showcasing modern web development projects and skills.",
    siteName: "Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Fullstack Web Developer",
    description: "Professional portfolio showcasing modern web development projects and skills.",
    creator: "@developer",
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
        <FloatingCTA />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
