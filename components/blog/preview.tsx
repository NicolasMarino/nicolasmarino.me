'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BlogCard } from '@/components/blog/blog-card';
import type { Post } from '@/types';

interface BlogPreviewProps {
  posts?: Post[];
}

export default function BlogPreview({ posts = [] }: BlogPreviewProps) {
  const { t, language } = useLanguage();

  const filteredPosts = posts.filter((post) => post.language === language);
  const displayPosts = filteredPosts.slice(0, 3);

  const renderHeader = () => (
    <div className="blog-section-header">
      <h2 className="blog-section-title">{t('blog.title')}</h2>
      <Link href={`/${language}/blog`} className="blog-view-all">
        {t('blog.viewAll')}
      </Link>
    </div>
  );

  if (displayPosts.length === 0) {
    return (
      <section id="blog">
        {renderHeader()}
        <p className="blog-empty-message">{t('blog.empty')}</p>
      </section>
    );
  }

  return (
    <section id="blog">
      {renderHeader()}

      <div className="blog-cards-grid">
        {displayPosts.map((post, index) => (
          <BlogCard
            key={post.slug}
            post={post}
            className={index === 0 ? 'featured' : ''}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
