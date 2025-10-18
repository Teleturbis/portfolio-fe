'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = section === 'hero' ? 0 : 80;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      <main>
        <HeroSection
          title={t('Hero.title')}
          description={t('Hero.description')}
          ctaContact={t('Hero.cta.contact')}
          ctaProjects={t('Hero.cta.projects')}
          onNavigate={scrollToSection}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <ContactSection />
      </main>

      <Footer />

      <FloatingCTA onNavigate={scrollToSection} />
    </>
  );
}
