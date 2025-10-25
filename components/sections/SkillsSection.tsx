import { useTranslations } from 'next-intl';
import {
  Code2,
  Database,
  Palette,
  Layers,
  LucideIcon,
  UsersRound,
} from 'lucide-react';
import { SectionHero } from '@/components/SectionHero';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SkillCard } from '@/components/shared/SkillCard';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  Palette,
  Layers,
  UsersRound,
};

interface SkillItem {
  name: string;
  icon: string;
  highlights: string[];
  items: string[];
}

export function SkillsSection() {
  const t = useTranslations('Skills');
  const skillsData = t.raw('items') as SkillItem[];

  const skills = skillsData.map((skill) => ({
    ...skill,
    icon: iconMap[skill.icon] || Code2,
  }));

  return (
    <section id='skills' className=''>
      <SectionHero title={t('title')} />
      <div className='container mx-auto px-4 py-20'>
        <SectionWrapper>
          <div className='mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <SkillCard
                  name={skill.name}
                  icon={skill.icon}
                  highlights={skill.highlights}
                  items={skill.items}
                  index={index}
                />
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
