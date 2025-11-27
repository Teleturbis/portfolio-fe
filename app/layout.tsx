import type React from 'react';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import ConsentManager from '@/components/ConsentManager';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning className='scroll-smooth'>
      <Script
        src='https://um.teleturbis.de/script.js'
        data-website-id='3594f23a-c13c-49a5-93fb-10f2a2a32fe0'
        data-domains='kevinpoppe.com'
        strategy='afterInteractive'
      />
      <body className='font-sans antialiased'>
        <NextIntlClientProvider messages={messages}>
          <Script
            src='https://embeds.iubenda.com/widgets/1a5b5ec3-7c2f-4a41-8aaf-df49136ce69d.js'
            strategy='afterInteractive'
          />
          <ConsentManager />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
