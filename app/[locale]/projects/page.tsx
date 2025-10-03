'use client';

import Link from 'next/link';
import { ExternalLink, Github, Calendar, Users, Mail } from 'lucide-react';
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
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-6 text-balance'>
            {t('title')}
          </h1>
          <p className='text-xl text-muted-foreground text-pretty max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className='flex flex-wrap justify-center gap-2 mb-12'>
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
        <div className='grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
          {(t.raw('projects') as Project[]).map((project, index) => (
            <Card
              key={index}
              className='overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
            >
              <div className='aspect-video relative overflow-hidden'>
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className='w-full h-full object-cover'
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
                    <CardTitle className='text-xl mb-2 text-balance'>
                      {project.title}
                    </CardTitle>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
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
                  <h4 className='font-semibold mb-2 text-sm'>
                    {t('highlights')}:
                  </h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className='flex items-center gap-2'
                      >
                        <div className='w-1.5 h-1.5 bg-primary rounded-full'></div>
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
                        <ExternalLink className='h-4 w-4 mr-2' />
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
                        <Github className='h-4 w-4 mr-2' />
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
        <div className='max-w-4xl mx-auto text-center mt-20 p-8 bg-muted/30 rounded-2xl'>
          <h2 className='text-2xl lg:text-3xl font-bold mb-4 text-balance'>
            {t('CTASection.title')}
          </h2>
          <p className='text-lg text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto'>
            {t('CTASection.subtitle')}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
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
