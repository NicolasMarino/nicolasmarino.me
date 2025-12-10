'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import { dummyPosts } from '@/data/blog-fixtures';
import type { Post } from '@/types';

interface BlogPreviewProps {
  posts?: Post[];
}

export default function BlogPreview({ posts = [] }: BlogPreviewProps) {
  const { t, language } = useLanguage();

  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : dummyPosts;
  const dateLocale = language === 'es' ? 'es-ES' : 'en-US';

  return (
    <section id="blog">
      <div className="blog-section-header">
        <h2 className="blog-section-title">{t('blog.title')}</h2>
        <Link href="/blog" className="blog-view-all">
          {t('blog.viewAll')}
        </Link>
      </div>

      <div className="blog-cards-grid">
        {displayPosts.length > 0 ? (
          displayPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`blog-card-modern group ${index === 0 ? 'featured' : ''}`}
            >
              <div className="blog-card-image-wrapper">
                <Image
                  src={post.image || siteConfig.defaultBlogCover}
                  alt={post.title}
                  fill
                  className="blog-card-image"
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
                <p className="blog-card-description">
                  {post.description || t('blog.noDescription')}
                </p>
                <div className="blog-card-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(dateLocale, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
          ))
        ) : (
          <p className="blog-empty-message">{t('blog.empty')}</p>
        )}
      </div>
    </section>
  );
}
