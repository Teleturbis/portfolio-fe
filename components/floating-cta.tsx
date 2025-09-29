'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function FloatingCTA() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show on contact page
  const shouldShow = pathname !== '/contact' && !isDismissed;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled && shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
    >
      <div className='bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-1 flex items-center gap-2'>
        <Button
          asChild
          size='sm'
          className='rounded-full bg-transparent hover:bg-primary-foreground/10'
        >
          <Link href='/contact'>
            <Mail className='h-4 w-4 mr-2' />
            {t('home.cta')}
          </Link>
        </Button>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsDismissed(true)}
          className='h-8 w-8 rounded-full hover:bg-primary-foreground/10 text-primary-foreground'
        >
          <X className='h-3 w-3' />
          <span className='sr-only'>Dismiss</span>
        </Button>
      </div>
    </div>
  );
}
