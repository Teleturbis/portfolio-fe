'use client';

import { useEffect, useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHero } from '@/components/SectionHero';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks/use-contact-form';

// ToDo: Improve Naming
const animationTime = 1000;

export function ContactSection() {
  const [planeState, setPlaneState] = useState<0 | 1 | 2 | 3>(2);
  const [randomWinds, setRandomWinds] = useState<
    {
      x: number;
      y: number;
      width: number;
      speed: number;
      delay: number;
    }[]
  >([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

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

  useEffect(() => {
    if (isLoading && planeState === 0) {
      setPlaneState(1);
    } else if (isLoading) {
      setPlaneState(2);
    } else if (isSuccess || error) {
      setPlaneState(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- planeState is managed here and should not trigger this effect
  }, [isLoading, isSuccess, error]);

  useEffect(() => {
    if (planeState === 1) setTimeout(() => setPlaneState(2), animationTime);
  }, [planeState]);

  useEffect(() => {
    generateRandomWinds();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return;
    }

    // Map form data to API format
    await submitForm({
      name: formData.name,
      mail: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const generateRandomWinds = () => {
    const winds = Array.from({ length: 12 }).map(() => ({
      x: 100, // Start offscreen rechts
      y: Math.floor(Math.random() * 50) - 10, // -10 bis 40px vertikal verteilt
      width: Math.floor(Math.random() * 50) + 30, // 30-80px Breite
      speed: Math.random() * 1.5 + 2, // 2-3.5s Duration
      delay: Math.random() * 2, // 0-2s Verzögerung
    }));
    setRandomWinds(winds);
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
                  <div>
                    <p>isLoading: {`${isLoading}`}</p>
                    <p>isSuccess: {`${isSuccess}`}</p>
                    <p>error: {`${error}`}</p>
                    <p>planeState: {`${planeState}`}</p>
                    <p>randomWinds: {JSON.stringify(randomWinds)}</p>
                  </div>
                </div>

                <Button
                  type='submit'
                  size='lg'
                  disabled={isLoading || isSuccess}
                  className='group bg-primary text-primary-foreground relative h-12 w-full overflow-hidden transition-all hover:scale-105 disabled:opacity-50'
                >
                  <AnimatePresence mode='wait'>
                    {/* Wind-Linien Animation */}
                    {planeState === 2 &&
                      randomWinds.map((wind, i) => (
                        <motion.div
                          key={`wind-${i}`}
                          style={{
                            width: wind.width + 'px',
                            height: '2px',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            position: 'absolute',
                            top: wind.y + 'px',
                            borderRadius: '1px',
                          }}
                          initial={{ x: '100%', opacity: 0 }}
                          animate={{
                            x: '-120%',
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: wind.speed,
                            delay: wind.delay,
                            ease: 'linear',
                            opacity: {
                              times: [0, 0.1, 0.8, 1],
                              duration: wind.speed,
                            },
                          }}
                        />
                      ))}

                    {/* Papierflieger + Wind */}
                    {planeState === 1 || planeState === 2 ? (
                      <motion.div
                        key='loading'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='bg-primary relative z-30 flex items-center justify-center rounded-md p-2'
                      >
                        <motion.div
                          initial={{ x: 0, rotate: 0 }}
                          animate={{
                            rotate: 45,
                            transition: {
                              duration: animationTime / 1000,
                              ease: 'easeInOut',
                            },
                          }}
                        >
                          <Send className='h-5 w-5' />
                        </motion.div>
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div
                        key='success'
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className='flex items-center justify-center gap-2'
                      >
                        <CheckCircle2 className='h-5 w-5' />
                        <span>{t('form.success')}</span>
                      </motion.div>
                    ) : error ? (
                      <motion.div
                        key='error'
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className='flex items-center justify-center gap-2'
                      >
                        <AlertCircle className='h-5 w-5' />
                        <span>{t('form.failure') || 'Fehler beim Senden'}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key='default'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='flex items-center justify-center gap-2'
                      >
                        <span>{t('form.submit')}</span>
                        <Send className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </Card>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
