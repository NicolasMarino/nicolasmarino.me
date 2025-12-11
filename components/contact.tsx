'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact">
      <h2 className="text-3xl font-bold tracking-tight">{t('contact.title')}</h2>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
        {t('contact.description')}
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href={`mailto:${siteConfig.email}`}
          className="btn-base btn-primary gap-2"
          aria-label={t('contact.sendMessage')}
        >
          {t('contact.sendMessage')}
        </Link>
        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-secondary"
          aria-label="GitHub Profile"
        >
          {t('contact.github')}
        </Link>
        <Link
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-secondary"
          aria-label="LinkedIn Profile"
        >
          {t('contact.linkedin')}
        </Link>
      </div>
    </section>
  );
}
