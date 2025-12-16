import Image from 'next/image';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { BlogDetailHeader } from '@/components/blog/blog-detail-header';
import { BlogDetailFooter } from '@/components/blog/blog-detail-footer';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <div className="relative w-full h-[300px] overflow-hidden md:h-[400px]">
        <Image
          src={post.image || '/images/blog-cover-default.png'}
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
