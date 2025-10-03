'use client';

import Link from 'next/link';
import { ExternalLink, Github, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  year: string;
  team: string;
  duration: string;
  status: string;
  links: {
    demo: string;
    github: string;
  };
  highlights: string[];
};

export default function ProjectsPage() {
  const t = useTranslations('Projects');

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

        {/* Filter Buttons */}
        <div className='mb-12 flex flex-wrap justify-center gap-2'>
          {(t.raw('categories') as string[]).map((category) => (
            <Button
              key={category}
              variant='outline'
              size='sm'
              className='hover:bg-primary hover:text-primary-foreground bg-transparent'
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className='mx-auto grid max-w-7xl gap-8 lg:grid-cols-2'>
          {(t.raw('projects') as Project[]).map((project, index) => (
            <Card
              key={index}
              className='overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
            >
              <div className='relative aspect-video overflow-hidden'>
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className='h-full w-full object-cover'
                  layout='fill'
                  objectFit='cover'
                />
                <div className='absolute top-4 left-4'>
                  <Badge variant='secondary'>{project.category}</Badge>
                </div>
                <div className='absolute top-4 right-4'>
                  <Badge
                    variant={project.status === 'Live' ? 'default' : 'outline'}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='mb-2 text-xl text-balance'>
                      {project.title}
                    </CardTitle>
                    <div className='text-muted-foreground mb-3 flex items-center gap-4 text-sm'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-4 w-4' />
                        {project.year}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className='text-base text-pretty'>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className='mb-4'>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant='outline'
                        className='text-xs'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className='mb-6'>
                  <h4 className='mb-2 text-sm font-semibold'>
                    {t('highlights')}:
                  </h4>
                  <ul className='text-muted-foreground space-y-1 text-sm'>
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className='flex items-center gap-2'
                      >
                        <div className='bg-primary h-1.5 w-1.5 rounded-full'></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className='flex gap-3'>
                  {project.links.demo && (
                    <Button asChild size='sm' className='flex-1'>
                      <a
                        href={project.links.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='mr-2 h-4 w-4' />
                        {t('projectCta')}
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button
                      asChild
                      variant='outline'
                      size='sm'
                      className='flex-1 bg-transparent'
                    >
                      <a
                        href={project.links.github}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='mr-2 h-4 w-4' />
                        {t('codeCta')}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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
              <Link href='/skills'>{t('ctaSection.button')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
