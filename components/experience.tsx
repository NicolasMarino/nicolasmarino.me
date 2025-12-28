'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { experiences } from '@/data/experience';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience">
      <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-4 md:mb-8 section-title">
        {t('experience.title')}
      </h2>
      <div className="space-y-6 md:space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative pl-6 md:pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border"
          >
            <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-base md:text-xl font-bold text-foreground">
                  {t(`experience.items.${exp.id}.role`)}
                </h3>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm md:text-lg font-medium text-primary">{exp.company}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 text-xs md:text-sm text-muted-foreground font-mono">
                <span>{exp.period}</span>
                <span>{exp.location}</span>
              </div>
            </div>
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4">
              {(() => {
                const desc = t(`experience.items.${exp.id}.description`);
                if (Array.isArray(desc)) {
                  return (
                    <ul className="list-disc list-outside ml-4 space-y-1">
                      {desc.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  );
                }
                return <p>{String(desc)}</p>;
              })()}
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {(() => {
                const tags = t(`experience.items.${exp.id}.tags`);
                return Array.isArray(tags)
                  ? tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] md:text-[10px] font-mono px-1.5 md:px-2 py-0.5 md:py-1 rounded bg-secondary/50 text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))
                  : null;
              })()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
