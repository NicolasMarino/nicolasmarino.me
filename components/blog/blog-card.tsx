'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import { BlogCardProps } from '@/types';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function BlogCard({ post, priority = false, className = '' }: BlogCardProps) {
  const { t, language } = useLanguage();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const dateLocale = language === 'es' ? 'es-ES' : 'en-US';

  return (
    <Link href={`/${language}/blog/${post.slug}`} className={`blog-card-modern group ${className}`}>
      <div className="blog-card-image-wrapper">
        <Image
          src={post.image || siteConfig.defaultBlogCover}
          alt={post.title}
          fill
          className="blog-card-image"
          priority={priority}
        />
        <div className="blog-card-overlay" />
      </div>
      <div className="blog-card-content">
        {post.tags && post.tags.length > 0 && (
          <div className="blog-card-tags">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="blog-card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="blog-card-title group-hover:underline">{post.title}</h3>
        <p className="blog-card-description">{post.description || t('blog.noDescription')}</p>
        <div className="blog-card-meta">
          <time dateTime={post.date}>
            {mounted
              ? new Date(post.date).toLocaleDateString(dateLocale, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '...'}
          </time>
          {post.readTime && (
            <>
              <span className="blog-card-separator">·</span>
              <span>
                {post.readTime} {t('blog.minRead')}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
