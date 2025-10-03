import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FloatingCTA } from '@/components/floating-cta';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://kevinpoppe.com'),
  title: {
    default: 'Kevin Poppe – Fullstack Web Developer',
    template: '%s | Kevin Poppe',
  },
  description:
    'Ich baue performante, skalierbare Webanwendungen – von Architektur & Prototyp bis Produktion. Spezialisiert auf Next.js, React, TypeScript, Node.js und Docker.',
  keywords: [
    'Kevin Poppe',
    'Fullstack Developer',
    'Webentwickler',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express',
    'Docker',
    'PostgreSQL',
    'MongoDB',
    'DevOps',
    'Portfolio',
    'Deutschland',
  ],
  authors: [{ name: 'Kevin Poppe', url: 'https://kevinpoppe.com' }],
  creator: 'Kevin Poppe',
  publisher: 'Kevin Poppe',
  applicationName: 'Kevin Poppe – Portfolio',
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
      en: '/en',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://kevinpoppe.com',
    siteName: 'Kevin Poppe – Fullstack Web Developer',
    title: 'Kevin Poppe – Fullstack Web Developer',
    description:
      'Portfolio von Kevin Poppe: moderne Webentwicklung mit Next.js, React, TypeScript, Node.js und Docker – von R&D über Architektur bis Betrieb.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Kevin Poppe – Fullstack Web Developer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='font-sans antialiased'>
      <Navigation />
      <div className='min-h-screen'>
        <Suspense>{children}</Suspense>
      </div>
      <Footer />
      <FloatingCTA />
      <Toaster />
      <Analytics />
    </div>
  );
}
