'use client';

import { useState, useEffect } from 'react';

type Locale = 'de' | 'en';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>('de');
  const [init, setInit] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && ['de', 'en'].includes(stored)) {
      setLocale(stored);
      setInit(true);
    }
  }, []);

  useEffect(() => {
    if (!init) return;
    // redirect if locale changes
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    if (segments[0] !== locale) {
      segments[0] = locale;
      const newPath = '/' + segments.join('/');
      window.location.pathname = newPath;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- locale only
  }, [locale]);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return { locale, changeLocale };
}
