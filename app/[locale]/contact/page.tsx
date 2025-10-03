'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

type Contactinfo = {
  icon: string;
  label: string;
  value: string;
  href: string | null;
  color: string;
};

type SocialLink = {
  icon: string;
  label: string;
  href: string;
  color: string;
};

export default function ContactPage() {
  const t = useTranslations('Contact');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Nachricht gesendet!',
        description:
          'Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen.',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Fehler beim Senden',
        description:
          'Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Mail,
      Phone,
      MapPin,
      Github,
      Linkedin,
      Twitter,
    };
    return icons[iconName] || Mail;
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

        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-12 lg:grid-cols-2'>
            {/* Contact Form */}
            <Card className='order-2 lg:order-1'>
              <CardHeader>
                <CardTitle className='text-2xl'>Nachricht senden</CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus und ich melde mich
                  schnellstmöglich bei Ihnen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>{t('form.name')}</Label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>{t('form.email')}</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='message'>{t('form.message')}</Label>
                    <Textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t('form.messagePlaceholder')}
                    />
                  </div>

                  <Button
                    type='submit'
                    className='w-full'
                    size='lg'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className='mr-2 h-4 w-4' />
                        {t('form.send')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className='order-1 space-y-8 lg:order-2'>
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-2xl'>
                    {t('rightSection.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('rightSection.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {(t.raw('rightSection.contactinfo') as Contactinfo[])?.map(
                    (info, index) => {
                      const Icon = getIcon(info.icon);
                      const content = (
                        <div
                          key={index}
                          className='hover:bg-muted/50 flex items-center gap-4 rounded-lg p-4 transition-colors'
                        >
                          <div className='bg-muted rounded-lg p-3'>
                            <Icon className={`h-5 w-5 ${info.color}`} />
                          </div>
                          <div>
                            <div className='font-medium'>{info.label}</div>
                            <div className='text-muted-foreground'>
                              {info.value}
                            </div>
                          </div>
                        </div>
                      );

                      return info.href ? (
                        <a key={index} href={info.href} className='block'>
                          {content}
                        </a>
                      ) : (
                        <div key={index}>{content}</div>
                      );
                    }
                  )}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl'>Social Media</CardTitle>
                  <CardDescription>
                    Folgen Sie mir auf diesen Plattformen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex gap-4'>
                    {(t.raw('rightSection.socials') as SocialLink[])?.map(
                      (social, index) => {
                        const Icon = getIcon(social.icon);
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`bg-muted hover:bg-muted/80 rounded-lg p-3 transition-colors ${social.color}`}
                            aria-label={social.label}
                          >
                            <Icon className='h-5 w-5' />
                          </a>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl'>
                    {t('rightSection.availability.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      <span className='text-sm'>
                        {t('rightSection.availability.description1')}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      <span className='text-sm'>
                        {t('rightSection.availability.description2')}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      <span className='text-sm'>
                        {t('rightSection.availability.description3')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div className='bg-muted/30 mx-auto mt-20 max-w-4xl rounded-2xl p-8 text-center'>
          <h2 className='mb-4 text-2xl font-bold text-balance lg:text-3xl'>
            {t('CTASection.title')}
          </h2>
          <p className='text-muted-foreground mx-auto mb-6 max-w-2xl text-lg text-pretty'>
            {t('CTASection.subtitle')}
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button asChild variant='outline' size='lg'>
              <Link href='/projects'>{t('CTASection.button1')}</Link>
            </Button>
            <Button asChild variant='outline' size='lg'>
              <Link href='/skills'>{t('CTASection.button2')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
