import { useTranslations } from 'next-intl';
import { SectionHero } from '@/components/SectionHero';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ProjectCard } from '@/components/shared/ProjectCard';

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  employer?: string;
  links?: {
    [key: string]: {
      label: string;
      url: string;
    };
  };
}

export function ProjectsSection() {
  const t = useTranslations('Projects');
  const projectsData = t.raw('items') as ProjectItem[];

  return (
    <section id='projects' className='bg-muted/30 relative'>
      <SectionHero title={t('title')} />
      <div className='relative z-10 container mx-auto px-4 py-20'>
        <SectionWrapper>
          <div className='mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {projectsData.map((project, idx) => (
              <div key={idx}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  links={project.links}
                  type={project.type}
                  employer={project.employer}
                />
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
