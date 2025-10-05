import type React from 'react';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de' suppressHydrationWarning>
      <Script
        src='https://um.teleturbis.de/script.js'
        data-website-id='3594f23a-c13c-49a5-93fb-10f2a2a32fe0'
        data-domains='kevinpoppe.com'
        strategy='afterInteractive'
      />
      <body className='font-sans antialiased'>
        <NextIntlClientProvider>
          <main className='min-h-screen'>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
