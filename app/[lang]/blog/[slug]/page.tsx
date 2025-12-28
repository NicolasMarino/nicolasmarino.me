import Image from 'next/image';
import { getPostBySlug, getAllPostParams } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { BlogDetailHeader } from '@/components/blog/blog-detail-header';
import { BlogDetailFooter } from '@/components/blog/blog-detail-footer';
import { siteConfig } from '@/config/site';

export async function generateStaticParams() {
  return getAllPostParams();
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const post = getPostBySlug(slug, lang as 'es' | 'en');

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-detail min-h-screen bg-background text-foreground pb-16">
      <div className="relative w-full h-[300px] overflow-hidden md:h-[400px]">
        <Image
          src={post.image || siteConfig.defaultBlogCover}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-white/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto -mt-32 max-w-3xl px-6">
        <BlogDetailHeader post={post} />

        <hr className="my-16 border-t border-border" />

        <article className="prose max-w-none">
          <MDXRemote source={post.content || ''} />
        </article>

        <BlogDetailFooter post={post} />

        <div className="h-6 md:h-12" />
      </div>
    </main>
  );
}
