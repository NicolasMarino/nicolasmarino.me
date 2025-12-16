'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { PostProps } from '@/types';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';

export function BlogDetailHeader({ post }: PostProps) {
  const { t, language } = useLanguage();
  const dateLocale = language === 'es' ? 'es-ES' : 'en-US';

  return (
    <>
      <Link href={`/${language}/blog`} className="blog-back-link">
        <ChevronLeft className="blog-back-icon" size={16} />
        {t('blog.backToBlog')}
      </Link>

      <header className="blog-detail-header">
        {post.tags && post.tags.length > 0 && (
          <div className="blog-detail-tags">
            {post.tags.map((tag: string) => (
              <span key={tag} className="blog-card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="blog-detail-title">{post.title}</h1>

        <div className="blog-detail-meta">
          <time dateTime={post.date} className="blog-detail-meta-item">
            <Calendar className="blog-meta-icon" size={16} />
            {new Date(post.date).toLocaleDateString(dateLocale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="blog-detail-meta-item">
            <Clock className="blog-meta-icon" size={16} />
            {post.readTime} {t('blog.readingTime')}
          </span>
        </div>

        {post.description && <p className="blog-detail-description">{post.description}</p>}
      </header>
    </>
  );
}
