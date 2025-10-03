'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleToggle } from '@/components/locale-toggle';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';
import { useTranslations } from 'next-intl';

export function Navigation() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const t = useTranslations('Navigation');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/skills', label: t('nav.skills') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLogoSrc = () => {
    if (theme === 'dark') {
      return '/logo-light.png'; // Light logo for dark background
    }
    return '/logo-dark.png'; // Dark logo for light background
  };

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <Link
          href='/'
          className='flex items-center gap-3 transition-opacity hover:opacity-80'
        >
          <Image
            src={'/logo-color.png'}
            alt='Kevin Poppe Logo'
            width={32}
            height={32}
            className='h-8 w-8 lg:hidden'
          />
          <Image
            src={'/logo-color-full.png'}
            alt='Kevin Poppe Logo'
            width={200}
            height={200}
            className='hidden h-12 w-auto lg:inline-block'
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center space-x-6 md:flex'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'hover:text-primary relative text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <div className='bg-primary absolute right-0 -bottom-1 left-0 h-0.5 rounded-full' />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className='hidden items-center space-x-2 md:flex'>
          <Button asChild size='sm' className='font-medium'>
            <Link href='/contact'>
              <Mail className='mr-2 h-4 w-4' />
              {t('home.cta')}
            </Link>
          </Button>
          <LocaleToggle />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center space-x-2 md:hidden'>
          <LocaleToggle />
          <ThemeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleMobileMenu}
            className='h-9 w-9'
          >
            {isMobileMenuOpen ? (
              <X className='h-4 w-4' />
            ) : (
              <Menu className='h-4 w-4' />
            )}
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='bg-background/95 border-t backdrop-blur md:hidden'>
          <nav className='container space-y-3 py-4'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'hover:text-primary block py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className='border-t pt-3'>
              <Button asChild size='sm' className='w-full'>
                <Link
                  href='/contact'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail className='mr-2 h-4 w-4' />
                  {t('home.cta')}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
