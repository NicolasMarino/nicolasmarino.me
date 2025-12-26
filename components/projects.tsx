'use client';

import { ProjectCard3D } from '@/components/project-card-3d';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { projects } from '@/data/projects';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects">
      <h2 className="text-3xl font-bold tracking-tight mb-4 section-title">
        {t('projects.title')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
        {projects.map((project) => (
          <ProjectCard3D key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
