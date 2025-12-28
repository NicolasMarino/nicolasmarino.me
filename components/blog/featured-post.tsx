'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { PostProps } from '@/types';
import { siteConfig } from '@/config/site';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function FeaturedPost({ post }: PostProps) {
  const { t, language } = useLanguage();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const dateLocale = language === 'es' ? 'es-ES' : 'en-US';

  return (
    <article className="blog-featured">
      <Link href={`/${language}/blog/${post.slug}`} className="blog-featured-link">
        <div className="blog-featured-image-wrapper">
          <Image
            src={post.image || siteConfig.defaultBlogCover}
            alt={post.title}
            fill
            className="blog-featured-image"
            priority
          />
          <div className="blog-featured-overlay" />
        </div>
        <div className="blog-featured-content">
          <div className="blog-featured-badge">{t('blog.featured')}</div>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-featured-tags">
              {post.tags.map((tag: string) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="blog-featured-title">{post.title}</h2>
          <p className="blog-featured-description">{post.description}</p>
          <div className="blog-featured-meta">
            <time dateTime={post.date}>
              {mounted
                ? new Date(post.date).toLocaleDateString(dateLocale, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '...'}
            </time>
            <span className="blog-meta-separator">·</span>
            <span>
              {post.readTime} {t('blog.minRead')}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
