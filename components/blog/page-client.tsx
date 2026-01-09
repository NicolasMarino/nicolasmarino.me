'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BlogHeader } from '@/components/blog/blog-header';
import { FeaturedPost } from '@/components/blog/featured-post';
import { PostGrid } from '@/components/blog/post-grid';
import { EmptyState } from '@/components/blog/empty-state';
import type { Post } from '@/types';

interface BlogPageClientProps {
  posts: Post[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { language } = useLanguage();

  const filteredPosts = posts.filter((post) => post.language === language);
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <main className="blog-page">
      <div className="blog-page-container">
        <BlogHeader />

        {featuredPost && <FeaturedPost post={featuredPost} />}

        {otherPosts.length > 0 && <PostGrid posts={otherPosts} />}

        {filteredPosts.length === 0 && <EmptyState />}
      </div>
    </main>
  );
}
