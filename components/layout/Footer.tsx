import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-muted/50 border-border mt-20 border-t py-8'>
      <div className='container mx-auto px-4 text-center'>
        <p className='text-muted-foreground text-sm'>
          © {currentYear} {t('copyright')}
        </p>
      </div>
      <div className='mt-6 flex justify-center gap-4'>
        {[
          {
            href: 'https://www.iubenda.com/privacy-policy/59196958',
            title: 'Datenschutzerklärung',
          },
          {
            href: 'https://www.iubenda.com/privacy-policy/59196958/cookie-policy',
            title: 'Cookie-Richtlinie',
          },
        ].map((href, index) => (
          <Link
            href={href.href}
            title={href.title}
            key={index}
            className='text-sm text-gray-400 transition-colors hover:text-gray-200'
          >
            {href.title}
          </Link>
        ))}
      </div>
    </footer>
  );
}
