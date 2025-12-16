import { getAllPosts } from '@/lib/blog';
import BlogPageClient from '@/components/blog/page-client';

export default function BlogIndex() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}
