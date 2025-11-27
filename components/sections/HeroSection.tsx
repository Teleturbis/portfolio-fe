'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { ArrowDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  description: string;
  ctaContact: string;
  ctaProjects: string;
  onNavigate: (section: string) => void;
}

export function HeroSection({
  title,
  description,
  ctaContact,
  ctaProjects,
  onNavigate,
}: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section
      id='hero'
      className='relative flex min-h-screen items-center justify-center overflow-hidden pt-20'
    >
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='bg-primary/5 absolute rounded-full'
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity, scale }}
        className='relative z-10 container mx-auto px-4 text-center'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
          className='mb-8'
        >
          <Image
            src={'/logo-color-full.png'}
            alt='Kevin Poppe'
            className='mx-auto h-32 w-auto object-cover md:h-48'
            width={500}
            height={500}
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-primary mb-6'
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='text-muted-foreground mx-auto mb-12 max-w-2xl text-xl md:text-2xl'
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className='flex flex-wrap justify-center gap-4'
        >
          <Button
            size='lg'
            onClick={() => onNavigate('contact')}
            className='bg-primary hover:bg-secondary text-primary-foreground group'
          >
            {ctaContact}
            <Send className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Button>
          <Button
            size='lg'
            variant='outline'
            onClick={() => onNavigate('projects')}
            className='border-primary text-primary hover:bg-primary hover:text-primary-foreground'
          >
            {ctaProjects}
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className='text-primary' size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
