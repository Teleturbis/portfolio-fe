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
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-6 text-balance'>
            {t('title')}
          </h1>
          <p className='text-xl text-muted-foreground text-pretty max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </div>

        {/* Skills Overview Stats */}
        <div className='grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto'>
          <Card className='text-center'>
            <CardContent className='pt-6'>
              <div className='text-3xl font-bold text-primary mb-2'>
                {t('yearsOfExperienceCount')}
              </div>
              <div className='text-sm text-muted-foreground'>
                {t('yearsOfExperience')}
              </div>
            </CardContent>
          </Card>
          <Card className='text-center'>
            <CardContent className='pt-6'>
              <div className='text-3xl font-bold text-primary mb-2'>
                {t('projectsCompletedCount')}
              </div>
              <div className='text-sm text-muted-foreground'>
                {t('projectsCompleted')}
              </div>
            </CardContent>
          </Card>
          <Card className='text-center'>
            <CardContent className='pt-6'>
              <div className='text-3xl font-bold text-primary mb-2'>
                {t('technologiesCount')}
              </div>
              <div className='text-sm text-muted-foreground'>
                {t('knownTechnologies')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Categories */}
        <div className='space-y-12 max-w-6xl mx-auto'>
          {(t.raw('skillCategories') as SkillCategory[]).map(
            (category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className='text-center mb-8'>
                  <div className='text-4xl mb-4'>{category.icon}</div>
                  <h2 className='text-2xl lg:text-3xl font-bold mb-2'>
                    {category.title}
                  </h2>
                  <p className='text-muted-foreground max-w-2xl mx-auto'>
                    {category.description}
                  </p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {category.skills.map((skill, skillIndex) => (
                    <Card
                      key={skillIndex}
                      className='hover:shadow-lg transition-shadow duration-300'
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
                            <div className='flex justify-between text-sm mb-1'>
                              <span>{t('knowledge')}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className='h-2' />
                          </div>

                          <div className='flex justify-between text-sm text-muted-foreground'>
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
        <div className='mt-20 max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl lg:text-3xl font-bold mb-4'>
              {t('certificates')}
            </h2>
            <p className='text-muted-foreground'>
              {t('certificatesDescription')}
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {(t.raw('certifications') as Certification[]).map((cert, index) => (
              <Card
                key={index}
                className='text-center hover:shadow-lg transition-shadow duration-300'
              >
                <CardHeader>
                  <div className='w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center'>
                    <Award className='h-8 w-8 text-primary' />
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
              <Link href='/projects'>{t('CTASection.button')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
