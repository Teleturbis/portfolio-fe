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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
        <Languages className='h-4 w-4' />
        <span className='sr-only'>Change language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => changeLocale('de')}
          className={locale === 'de' ? 'bg-accent' : ''}
        >
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLocale('en')}
          className={locale === 'en' ? 'bg-accent' : ''}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
