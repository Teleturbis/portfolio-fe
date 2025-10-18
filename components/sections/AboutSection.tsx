import { useTranslations } from 'next-intl';
import { SectionHero } from '@/components/SectionHero';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { PixelArtImage } from '@/components/shared/PixelArtImage';
import { AboutSocialLinks } from './AboutSocialLinks';

export function AboutSection() {
  const t = useTranslations('About');

  return (
    <section id='about' className='bg-muted/30 relative'>
      <SectionHero title={t('title')} />
      <div className='relative z-10 container mx-auto px-4 py-20'>
        <SectionWrapper>
          <div className='mx-auto max-w-4xl'>
            <div className='grid items-center gap-8 md:grid-cols-2'>
              <div>
                <p className='mb-6 text-lg'>{t('paragraph1')}</p>
                <p className='mb-6 text-lg'>{t('paragraph2')}</p>
                <AboutSocialLinks />
              </div>

              <div className='relative'>
                <div className='from-primary to-secondary aspect-square rounded-2xl bg-gradient-to-br p-1'>
                  <div className='bg-background flex h-full w-full items-center justify-center overflow-hidden rounded-2xl'>
                    <PixelArtImage
                      src='/guru.png'
                      alt={t('imageAlt')}
                      className='h-full w-full object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
