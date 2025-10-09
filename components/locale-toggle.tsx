'use client';

import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from '@/hooks/use-locale';

export function LocaleToggle() {
  const { locale, changeLocale } = useLocale();

  const handleChange = (lang: 'de' | 'en') => {
    changeLocale(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
        <Languages className='h-4 w-4' />
        <span className='sr-only'>Change language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => handleChange('de')}
          className={
            locale === 'de' ? 'bg-accent/75 text-accent-foreground' : ''
          }
        >
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChange('en')}
          className={
            locale === 'en' ? 'bg-accent/75 text-accent-foreground' : ''
          }
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
