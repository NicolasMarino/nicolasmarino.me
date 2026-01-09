'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about">
      <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6 section-title">
        {t('about.title')}
      </h2>
      <div className="text-muted-foreground text-sm md:text-lg leading-relaxed space-y-3 md:space-y-4">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
      </div>
    </section>
  );
}
