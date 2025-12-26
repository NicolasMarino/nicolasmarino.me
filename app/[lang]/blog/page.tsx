import { getPostsByLanguage } from '@/lib/blog';
import BlogPageClient from '@/components/blog/page-client';

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = getPostsByLanguage(lang as 'es' | 'en');

  return <BlogPageClient posts={posts} />;
}
