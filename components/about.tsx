'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about">
      <h2 className="text-3xl font-bold tracking-tight mb-6 section-title">{t('about.title')}</h2>
      <div className="text-muted-foreground text-lg leading-relaxed">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
      </div>
    </section>
  );
}
