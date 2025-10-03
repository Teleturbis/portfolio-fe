'use client';

import { useState, useEffect } from 'react';
import { type Locale, defaultLocale } from '@/lib/i18n';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && ['de', 'en'].includes(stored)) {
      setLocale(stored);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return { locale, changeLocale };
}
