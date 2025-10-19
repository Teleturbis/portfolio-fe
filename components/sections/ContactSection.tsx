'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHero } from '@/components/SectionHero';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/hooks/use-contact-form';
import ContactButton from '../ContactButton';
import {
  validateContactRequest,
  sanitizeContactData,
} from '@/lib/contact.schema';
import { cn } from '@/lib/utils';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const t = useTranslations('Contact');

  const { submitForm, isLoading, isSuccess, error, reset } = useContactForm({
    onSuccess: () => {
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        reset();
      }, 3000);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Build request in API format
    const requestData = {
      name: formData.name,
      mail: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    // Validate with Zod
    const result = validateContactRequest(requestData);
    if (!result.success) {
      // Map schema fields to UI fields (mail -> email)
      const mapped: Record<string, string> = {};
      for (const err of result.errors) {
        const key = err.field === 'mail' ? 'email' : err.field;
        // Only set first error per field
        if (!mapped[key]) mapped[key] = err.message;
      }
      setFieldErrors(mapped);
      return;
    }

    // Sanitize before submit (narrow via local guard)
    const data = result.data;
    if (!data) return; // safety guard for type narrowing
    const sanitized = sanitizeContactData(data);
    await submitForm(sanitized);
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

              {/* Success Message */}
              {isSuccess && (
                <div className='mb-6 flex items-center gap-3 rounded-lg border border-green-500/50 bg-green-500/10 p-4'>
                  <CheckCircle2 className='h-5 w-5 flex-shrink-0 text-green-500' />
                  <p className='text-sm text-green-600 dark:text-green-400'>
                    {t('form.success')}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className='mb-6 flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4'>
                  <AlertCircle className='h-5 w-5 flex-shrink-0 text-red-500' />
                  <p className='text-sm text-red-600 dark:text-red-400'>
                    {error}
                  </p>
                </div>
              )}

              <form className='space-y-8' onSubmit={handleSubmit}>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='relative'>
                    <label htmlFor='name' className='mb-2 block'>
                      {t('form.name.label')}
                    </label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('form.name.placeholder')}
                      aria-invalid={!!fieldErrors.name}
                      className={cn(
                        'border-primary/30 focus:border-primary',
                        fieldErrors.name &&
                          'border-red-500 focus:border-red-500'
                      )}
                    />
                    {fieldErrors.name && (
                      <ErrorMessage message={fieldErrors.name} />
                    )}
                  </div>
                  <div className='relative'>
                    <label htmlFor='email' className='mb-2 block'>
                      {t('form.email.label')}
                    </label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('form.email.placeholder')}
                      aria-invalid={!!fieldErrors.email}
                      className={cn(
                        'border-primary/30 focus:border-primary',
                        fieldErrors.email &&
                          'border-red-500 focus:border-red-500'
                      )}
                    />
                    {fieldErrors.email && (
                      <ErrorMessage message={fieldErrors.email} />
                    )}
                  </div>
                </div>
                <div className='relative'>
                  <label htmlFor='subject' className='mb-2 block'>
                    {t('form.subject.label')}
                  </label>
                  <Input
                    id='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('form.subject.placeholder')}
                    aria-invalid={!!fieldErrors.subject}
                    className={cn(
                      'border-primary/30 focus:border-primary',
                      fieldErrors.subject &&
                        'border-red-500 focus:border-red-500'
                    )}
                  />
                  {fieldErrors.subject && (
                    <ErrorMessage message={fieldErrors.subject} />
                  )}
                </div>
                <div className='relative pb-4'>
                  <label htmlFor='message' className='mb-2 block'>
                    {t('form.message.label')}
                  </label>
                  <Textarea
                    id='message'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('form.message.placeholder')}
                    rows={6}
                    aria-invalid={!!fieldErrors.message}
                    className={cn(
                      'border-primary/30 focus:border-primary resize-y',
                      fieldErrors.message &&
                        'border-red-500 focus:border-red-500'
                    )}
                  />
                  {fieldErrors.message && (
                    <ErrorMessage message={fieldErrors.message} />
                  )}
                </div>

                <ContactButton
                  type='submit'
                  className='w-full'
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  isError={!!error}
                  labelDefault={t('form.submit')}
                  labelLoading={t('form.sending') || 'Sending…'}
                  labelSuccess={t('form.sent') || 'Sent!'}
                  labelError={t('form.failure') || 'Failed'}
                  disabled={isLoading || isSuccess}
                />
              </form>
            </Card>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='absolute mt-2 flex gap-2'>
      <AlertCircle className='h-5 w-5 flex-shrink-0 text-red-500' />
      <p className='text-xs text-red-600 dark:text-red-400'>{message}</p>
    </div>
  );
}
