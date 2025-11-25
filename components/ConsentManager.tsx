'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    _iub?: {
      cs?: {
        api?: {
          consentGiven?: () => boolean;
        };
        consent?: {
          purposes?: {
            [key: number]: boolean;
          };
        };
      };
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConsentManager() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Prüfe initial den Consent-Status
    const checkConsent = () => {
      if (
        window._iub?.cs?.consent?.purposes &&
        window._iub.cs.consent.purposes[4] === true
      ) {
        setHasConsent(true);
        return true;
      }
      setHasConsent(false);
      return false;
    };

    // Initialer Check
    if (checkConsent()) {
      return;
    }

    // Höre auf Consent-Änderungen - diese Events werden sofort gefeuert
    const handleConsentGiven = () => {
      if (checkConsent()) {
        // Trigger re-render sofort
        setHasConsent(true);
      }
    };

    const handlePreferenceExpressed = () => {
      checkConsent();
    };

    const handleConsentRejected = () => {
      setHasConsent(false);
    };

    // Events registrieren
    window.addEventListener('iubenda_consent_given', handleConsentGiven);
    window.addEventListener(
      'iubenda_preference_expressed',
      handlePreferenceExpressed
    );
    window.addEventListener('iubenda_consent_rejected', handleConsentRejected);

    // Fallback: Polling für den Fall dass Events nicht funktionieren
    const interval = setInterval(() => {
      if (window._iub?.cs?.consent) {
        checkConsent();
      }
    }, 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('iubenda_consent_given', handleConsentGiven);
      window.removeEventListener(
        'iubenda_preference_expressed',
        handlePreferenceExpressed
      );
      window.removeEventListener(
        'iubenda_consent_rejected',
        handleConsentRejected
      );
    };
  }, []);

  // Verhindere Hydration Mismatch
  if (!isMounted) {
    return null;
  }

  // Wenn kein Consent, zeige nichts
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id='gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-ML3PJGN2');
          `,
        }}
      />
      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-ML3PJGN2'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Google Analytics */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-TCTWYSGDB9'
        strategy='afterInteractive'
      />
      <Script
        id='ga-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TCTWYSGDB9');
          `,
        }}
      />
    </>
  );
}
