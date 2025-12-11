'use client';

import { MinimalCard } from '@/components/ui/minimal-card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { projects } from '@/data/projects';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects">
      <h2 className="text-3xl font-bold tracking-tight mb-6">{t('projects.title')}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MinimalCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
