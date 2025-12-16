'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { PostGridProps } from '@/types';
import { BlogCard } from './blog-card';

export function PostGrid({ posts }: PostGridProps) {
  const { t } = useLanguage();

  if (posts.length === 0) return null;

  return (
    <section className="blog-posts-section">
      <h2 className="blog-section-heading">{t('blog.moreArticles')}</h2>
      <div className="blog-posts-grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
