'use client';

import Link from 'next/link';
import { Mail, FileText } from 'lucide-react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact">
      <h2 className="text-3xl font-bold tracking-tight mb-4 section-title">{t('contact.title')}</h2>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8">
        {t('contact.description')}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          href={`mailto:${siteConfig.email}`}
          className="btn-base btn-primary gap-2"
          aria-label={t('contact.sendMessage')}
        >
          <Mail className="w-4 h-4" />
          {t('contact.sendMessage')}
        </Link>
        <Link
          href={t('contact.cvPath')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-secondary gap-2"
          aria-label={t('contact.downloadCV')}
        >
          <FileText className="w-4 h-4" />
          {t('contact.downloadCV')}
        </Link>
      </div>

      <div className="flex items-center gap-4 flex-wrap mb-6">
        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          aria-label="GitHub Profile"
        >
          <SiGithub className="w-5 h-5" />
        </Link>
        <Link
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          aria-label="LinkedIn Profile"
        >
          <SiLinkedin className="w-5 h-5" />
        </Link>
        <span className="text-sm text-muted-foreground">
          {t('contact.orEmail')}{' '}
          <Link href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
            {siteConfig.email}
          </Link>
        </span>
      </div>
    </section>
  );
}
