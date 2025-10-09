'use client';

import Link from 'next/link';
import { MapPin, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  location: string;
  image: string;
  tags: string[];
};

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className='min-h-screen py-20'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='mx-auto mb-16 max-w-4xl text-center'>
          <h1 className='mb-6 text-4xl font-bold text-balance lg:text-5xl'>
            {t('title')}
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl text-pretty'>
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className='mx-auto max-w-6xl'>
          <div className='relative'>
            {/* Timeline line */}
            <div className='bg-border absolute top-0 bottom-0 left-4 w-0.5 md:left-1/2 md:-translate-x-0.5 md:transform'></div>
            {(t.raw('timelineEvents') as TimelineEvent[])?.map(
              (event, index) => (
                <div
                  key={index}
                  className={`relative mb-16 flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className='bg-primary border-background absolute left-4 z-10 h-4 w-4 rounded-full border-4 md:left-1/2 md:-translate-x-2 md:transform'></div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0
                        ? 'pl-12 md:pr-12 md:pl-0'
                        : 'pl-12 md:pl-12'
                    }`}
                  >
                    <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
                      <div className='relative aspect-video overflow-hidden'>
                        <Image
                          src={event.image || '/placeholder.svg'}
                          alt={event.title}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          priority={index < 2}
                          placeholder='blur'
                          blurDataURL='/giphy.gif'
                        />
                        <div className='absolute top-4 left-4'>
                          <Badge
                            variant='secondary'
                            className='text-sm font-bold'
                          >
                            {event.year}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className='p-6'>
                        <div className='text-muted-foreground mb-2 flex items-center gap-2 text-sm'>
                          <MapPin className='h-4 w-4' />
                          {event.location}
                        </div>
                        <h3 className='mb-3 text-xl font-bold text-balance'>
                          {event.title}
                        </h3>
                        <p className='text-muted-foreground mb-4 text-pretty'>
                          {event.description}
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {event.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant='outline'
                              className='text-xs'
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-muted/30 mx-auto mt-20 max-w-4xl rounded-2xl p-8 text-center'>
          <h2 className='mb-4 text-2xl font-bold text-balance lg:text-3xl'>
            {t('CTASection.title')}
          </h2>
          <p className='text-muted-foreground mx-auto mb-6 max-w-2xl text-lg text-pretty'>
            {t('CTASection.subtitle')}
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button asChild size='lg'>
              <Link href='/contact'>
                {t('cta')}
                <Mail className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button asChild variant='outline' size='lg'>
              <Link href='/projects'>
                {t('CTASection.button')}
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
