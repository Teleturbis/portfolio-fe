import { useTranslations } from 'next-intl';

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
    </footer>
  );
}
