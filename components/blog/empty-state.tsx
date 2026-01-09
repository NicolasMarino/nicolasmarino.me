'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function EmptyState() {
  const { t } = useLanguage();

  return (
    <div className="blog-empty">
      <p>{t('blog.empty')}</p>
    </div>
  );
}
