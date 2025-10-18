'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHero } from '@/components/SectionHero';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    // TODO: Implement form submission
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id='contact' className='relative'>
      <SectionHero title={t('title')} />
      <div className='relative z-10 container mx-auto px-4 py-20'>
        <SectionWrapper>
          <div className='mx-auto max-w-2xl'>
            <Card className='border-primary/20 border-2 p-8'>
              <p className='mb-8 text-center text-lg'>{t('intro')}</p>
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div>
                    <label htmlFor='name' className='mb-2 block'>
                      {t('form.name.label')}
                    </label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('form.name.placeholder')}
                      className='border-primary/30 focus:border-primary'
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='mb-2 block'>
                      {t('form.email.label')}
                    </label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('form.email.placeholder')}
                      className='border-primary/30 focus:border-primary'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='subject' className='mb-2 block'>
                    {t('form.subject.label')}
                  </label>
                  <Input
                    id='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('form.subject.placeholder')}
                    className='border-primary/30 focus:border-primary'
                  />
                </div>
                <div>
                  <label htmlFor='message' className='mb-2 block'>
                    {t('form.message.label')}
                  </label>
                  <Textarea
                    id='message'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('form.message.placeholder')}
                    rows={6}
                    className='border-primary/30 focus:border-primary resize-none'
                  />
                </div>
                <Button
                  type='submit'
                  size='lg'
                  className='bg-primary hover:bg-secondary text-primary-foreground group w-full'
                >
                  {t('form.submit')}
                  <Send className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Button>
              </form>
            </Card>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
