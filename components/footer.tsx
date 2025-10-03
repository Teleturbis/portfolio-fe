'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Heart,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Navigation');

  const footerLinks = {
    navigation: [
      { href: '/', label: t('nav.home') },
      { href: '/about', label: t('nav.about') },
      { href: '/projects', label: t('nav.projects') },
      { href: '/skills', label: t('nav.skills') },
      { href: '/contact', label: t('nav.contact') },
    ],
    contact: [
      {
        icon: Mail,
        label: 'hello@developer.com',
        href: 'mailto:hello@developer.com',
      },
      { icon: Phone, label: '+49 123 456 7890', href: 'tel:+491234567890' },
      { icon: MapPin, label: 'Deutschland', href: null },
    ],
    social: [
      { icon: Github, label: 'GitHub', href: 'https://github.com/developer' },
      {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/developer',
      },
      {
        icon: Twitter,
        label: 'Twitter',
        href: 'https://twitter.com/developer',
      },
    ],
  };

  return (
    <footer className='bg-muted/30 mt-20 border-t'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand */}
          <div className='lg:col-span-1'>
            <Link href='/' className='mb-4 block text-xl font-bold'>
              Portfolio
            </Link>
            <p className='text-muted-foreground mb-4 text-sm'>
              Fullstack Web Developer mit Leidenschaft für sauberen Code und
              moderne Technologien.
            </p>
            <div className='flex space-x-3'>
              {footerLinks.social.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-background hover:bg-muted rounded-lg p-2 transition-colors'
                    aria-label={social.label}
                  >
                    <Icon className='h-4 w-4' />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className='mb-4 font-semibold'>Navigation</h3>
            <ul className='space-y-2'>
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='mb-4 font-semibold'>Kontakt</h3>
            <ul className='space-y-2'>
              {footerLinks.contact.map((contact, index) => {
                const Icon = contact.icon;
                const content = (
                  <div className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'>
                    <Icon className='h-4 w-4' />
                    {contact.label}
                  </div>
                );

                return (
                  <li key={index}>
                    {contact.href ? (
                      <a href={contact.href}>{content}</a>
                    ) : (
                      <div>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className='mb-4 font-semibold'>Projekt starten</h3>
            <p className='text-muted-foreground mb-4 text-sm'>
              Bereit für Ihr nächstes Projekt? Lassen Sie uns sprechen!
            </p>
            <Link
              href='/contact'
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors'
            >
              <Mail className='h-4 w-4' />
              {t('home.cta')}
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row'>
          <p className='text-muted-foreground text-sm'>
            © 2025 Portfolio. Alle Rechte vorbehalten.
          </p>
          <p className='text-muted-foreground flex items-center gap-1 text-sm'>
            Made with <Heart className='h-3 w-3 text-red-500' /> using Next.js &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
