'use client';

import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FloatingCTAProps {
  onNavigate: (section: string) => void;
}

export function FloatingCTA({ onNavigate }: FloatingCTAProps) {
  const t = useTranslations('Navigation.aria');

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 1 } }}
      transition={{ type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onNavigate('contact')}
      className='bg-primary text-primary-foreground hover:shadow-primary/50 fixed right-8 bottom-8 z-40 cursor-pointer rounded-full p-4 shadow-lg transition-shadow hover:shadow-xl'
      aria-label={t('contactButton')}
    >
      <Mail size={24} />
    </motion.button>
  );
}
