'use client';

import Link from 'next/link';
import { TrendingUp, Award, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';

type Skill = {
  name: string;
  level: number;
  years: number;
  projects: number;
};

type SkillCategory = {
  title: string;
  icon: string;
  description: string;
  skills: Skill[];
};

type Certification = {
  title: string;
  issuer: string;
  year: string;
  badge: string;
};

export default function SkillsPage() {
  const t = useTranslations('Skills');

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getSkillLevel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Fortgeschritten';
    if (level >= 70) return 'Mittel';
    return 'Grundlagen';
  };

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

        {/* Skills Overview Stats */}
        <div className='mx-auto mb-16 grid max-w-4xl gap-6 md:grid-cols-3'>
          <Card className='text-center'>
            <CardContent className='pt-6'>
              <div className='text-primary mb-2 text-3xl font-bold'>
                {t('yearsOfExperienceCount')}
              </div>
              <div className='text-muted-foreground text-sm'>
                {t('yearsOfExperience')}
              </div>
            </CardContent>
          </Card>
          <Card className='text-center'>
            <CardContent className='pt-6'>
              <div className='text-primary mb-2 text-3xl font-bold'>
                {t('projectsCompletedCount')}
              </div>
              <div className='text-muted-foreground text-sm'>
                {t('projectsCompleted')}
              </div>
            </CardContent>
          </Card>
          <Card className='text-center'>
            <CardContent className='pt-6'>
              <div className='text-primary mb-2 text-3xl font-bold'>
                {t('technologiesCount')}
              </div>
              <div className='text-muted-foreground text-sm'>
                {t('knownTechnologies')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Categories */}
        <div className='mx-auto max-w-6xl space-y-12'>
          {(t.raw('skillCategories') as SkillCategory[]).map(
            (category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className='mb-8 text-center'>
                  <div className='mb-4 text-4xl'>{category.icon}</div>
                  <h2 className='mb-2 text-2xl font-bold lg:text-3xl'>
                    {category.title}
                  </h2>
                  <p className='text-muted-foreground mx-auto max-w-2xl'>
                    {category.description}
                  </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {category.skills.map((skill, skillIndex) => (
                    <Card
                      key={skillIndex}
                      className='transition-shadow duration-300 hover:shadow-lg'
                    >
                      <CardHeader className='pb-3'>
                        <div className='flex items-center justify-between'>
                          <CardTitle className='text-lg'>
                            {skill.name}
                          </CardTitle>
                          <Badge variant='outline' className='text-xs'>
                            {getSkillLevel(skill.level)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-3'>
                          <div>
                            <div className='mb-1 flex justify-between text-sm'>
                              <span>{t('knowledge')}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className='h-2' />
                          </div>

                          <div className='text-muted-foreground flex justify-between text-sm'>
                            <div className='flex items-center gap-1'>
                              <TrendingUp className='h-3 w-3' />
                              {skill.years}{' '}
                              {skill.years === 1 ? t('year') : t('years')}
                            </div>
                            <div className='flex items-center gap-1'>
                              <Award className='h-3 w-3' />
                              {skill.projects} {t('projects')}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Certifications */}
        <div className='mx-auto mt-20 max-w-4xl'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-2xl font-bold lg:text-3xl'>
              {t('certificates')}
            </h2>
            <p className='text-muted-foreground'>
              {t('certificatesDescription')}
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            {(t.raw('certifications') as Certification[]).map((cert, index) => (
              <Card
                key={index}
                className='text-center transition-shadow duration-300 hover:shadow-lg'
              >
                <CardHeader>
                  <div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                    <Award className='text-primary h-8 w-8' />
                  </div>
                  <CardTitle className='text-lg text-balance'>
                    {cert.title}
                  </CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant='secondary'>{cert.year}</Badge>
                </CardContent>
              </Card>
            ))}
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
              <Link href='/projects'>{t('CTASection.button')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
