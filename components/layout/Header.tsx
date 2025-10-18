'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useThemeContext } from '@/components/providers/ThemeProvider';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function Header({ onNavigate, activeSection }: HeaderProps) {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';

  const navItems = ['about', 'skills', 'projects', 'contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-lg'
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <motion.img
            src='/logo-color-full.png'
            alt='Kevin Poppe Logo'
            className='h-12 cursor-pointer'
            onClick={() => onNavigate('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />

          {/* Desktop Navigation */}
          <div className='hidden items-center gap-8 md:flex'>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className={`relative transition-colors ${
                  activeSection === item
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {t(`Navigation.nav.${item}`)}
                {activeSection === item && (
                  <motion.div
                    layoutId='activeSection'
                    className='bg-primary absolute right-0 -bottom-1 left-0 h-0.5'
                  />
                )}
              </button>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className='bg-muted hover:bg-muted/80 relative h-7 w-14 rounded-full border p-1 transition-colors'
              whileTap={{ scale: 0.95 }}
              aria-label='Toggle dark mode'
            >
              <motion.div
                className='bg-primary flex h-5 w-5 items-center justify-center rounded-full'
                animate={{
                  x: isDark ? 24 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                    rotate: isDark ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className='absolute'
                >
                  <Sun size={14} className='text-white' />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                    rotate: isDark ? 0 : -180,
                  }}
                  transition={{ duration: 0.2 }}
                  className='absolute'
                >
                  <Moon size={14} className='text-white' />
                </motion.div>
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className='flex items-center gap-3 md:hidden'>
            <motion.button
              onClick={toggleTheme}
              className='bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors'
              whileTap={{ scale: 0.95 }}
              aria-label={t('Navigation.aria.toggleDarkMode')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Moon size={20} className='text-primary' />
                ) : (
                  <Sun size={20} className='text-primary' />
                )}
              </motion.div>
            </motion.button>
            <button
              className='text-foreground'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-4 flex flex-col gap-4 pb-4 md:hidden'
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onNavigate(item);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-left ${
                  activeSection === item ? 'text-primary' : 'text-foreground'
                }`}
              >
                {t(`Navigation.nav.${item}`)}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
