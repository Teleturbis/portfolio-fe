'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleToggle } from '@/components/locale-toggle';
import { useLocale } from '@/hooks/use-locale';
import { translations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = translations[locale];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/projects', label: t.nav.projects },
    { href: '/skills', label: t.nav.skills },
    { href: '/contact', label: t.nav.contact },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='font-bold text-xl hover:text-primary transition-colors hidden xl:inline-block'
        >
          Kevin Poppe - Fullstack Web Developer
        </Link>
        <Link
          href='/'
          className='font-bold text-xl hover:text-primary transition-colors xl:hidden'
        >
          Kevin Poppe
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-6'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary relative',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className='hidden md:flex items-center space-x-2'>
          <Button asChild size='sm' className='font-medium'>
            <Link href='/contact'>
              <Mail className='h-4 w-4 mr-2' />
              {t.home.cta}
            </Link>
          </Button>
          <LocaleToggle />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className='flex md:hidden items-center space-x-2'>
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
        <div className='md:hidden border-t bg-background/95 backdrop-blur'>
          <nav className='container py-4 space-y-3'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className='pt-3 border-t'>
              <Button asChild size='sm' className='w-full'>
                <Link
                  href='/contact'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail className='h-4 w-4 mr-2' />
                  {t.home.cta}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
