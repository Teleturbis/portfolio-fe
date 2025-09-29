import type React from 'react';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='font-sans antialiased'>
        <NextIntlClientProvider>
          <main className='min-h-screen'>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
