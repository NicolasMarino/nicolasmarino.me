'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function BlogHeader() {
  const { t } = useLanguage();

  return (
    <header className="blog-page-header">
      <Link href="/" className="blog-back-link">
        {t('blog.backToHome')}
      </Link>
      <h1 className="blog-page-title">{t('blog.title')}</h1>
      <p className="blog-page-subtitle">{t('blog.subtitle')}</p>
    </header>
  );
}
