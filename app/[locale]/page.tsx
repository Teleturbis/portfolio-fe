'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User, Briefcase, Award, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Navigation');

  const sections = [
    {
      icon: User,
      title: t('home.aboutPreview'),
      description: t('home.aboutDescription'),
      href: '/about',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Briefcase,
      title: t('home.projectsPreview'),
      description: t('home.projectsDescription'),
      href: '/projects',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Award,
      title: t('home.skillsPreview'),
      description: t('home.skillsDescription'),
      href: '/skills',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Mail,
      title: t('home.contactPreview'),
      description: t('home.contactDescription'),
      href: '/contact',
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className='min-h-screen'>
      <section className='from-background via-background to-muted/20 relative bg-gradient-to-br py-20 lg:py-32'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-7xl'>
            <div className='grid items-center gap-12 lg:grid-cols-2'>
              {/* Text Content */}
              <div className='text-center lg:text-left'>
                <h1 className='mb-6 text-4xl font-bold text-balance lg:text-6xl'>
                  {t('home.title')}
                </h1>
                <p className='text-muted-foreground mb-8 text-xl text-pretty lg:text-2xl'>
                  {t('home.subtitle')}
                </p>
                <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
                  <Button asChild size='lg' className='px-8 text-lg'>
                    <Link href='/contact'>
                      {t('home.cta')}
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    size='lg'
                    className='bg-transparent px-8 text-lg'
                  >
                    <Link href='/projects'>{t('home.projectsCta')}</Link>
                  </Button>
                </div>
              </div>

              {/* Portrait Image */}
              <div className='flex justify-center lg:justify-end'>
                <div className='relative'>
                  <div className='from-primary/20 to-primary/5 absolute inset-0 rotate-3 transform rounded-2xl bg-gradient-to-br'></div>
                  <div className='bg-background relative rounded-2xl p-2 shadow-2xl'>
                    <Image
                      src='https://imgs.kevinpoppe.com/M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA/w:500/plain/https://s3-api.teleturbis.de/portfolio/guru.png'
                      alt='Kevin Poppe - Fullstack Web Developer'
                      width={500}
                      height={600}
                      className='w-full max-w-sm rounded-xl object-cover lg:max-w-md'
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className='bg-muted/30 py-20'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-16 text-center'>
              <h2 className='mb-4 text-3xl font-bold lg:text-4xl'>
                {t('home.explorePortfolio')}
              </h2>
              <p className='text-muted-foreground mx-auto max-w-2xl text-xl text-pretty'>
                {t('home.explorePortfolioDescription')}
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2'>
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={index}
                    className='group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
                  >
                    <CardHeader>
                      <div className='flex items-center gap-4'>
                        <div className='bg-muted rounded-lg p-3'>
                          <Icon className={`h-6 w-6 ${section.color}`} />
                        </div>
                        <CardTitle className='text-xl'>
                          {section.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='mb-4 text-base text-pretty'>
                        {section.description}
                      </CardDescription>
                      <Button
                        asChild
                        variant='ghost'
                        className='group-hover:text-primary h-auto p-0 font-semibold'
                      >
                        <Link
                          href={section.href}
                          className='flex items-center gap-2'
                        >
                          {t('home.viewMore')}
                          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-primary/5 py-20'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='mb-6 text-3xl font-bold text-balance lg:text-4xl'>
              {t('home.CTASection.title')}
            </h2>
            <p className='text-muted-foreground mx-auto mb-8 max-w-2xl text-xl text-pretty'>
              {t('home.CTASection.subtitle')}
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Button asChild size='lg' className='px-8 text-lg'>
                <Link href='/contact'>
                  {t('home.cta')}
                  <Mail className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='bg-transparent px-8 text-lg'
              >
                <Link href='/about'>{t('home.CTASection.button')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
