import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className="blog-page">
      {/* Hero Banner */}
      <div className="blog-detail-hero">
        <Image
          src={post.image || '/images/blog-cover-default.png'}
          alt={post.title}
          fill
          className="blog-detail-hero-image"
          priority
        />
        <div className="blog-detail-hero-overlay" />
      </div>

      {/* Content Container */}
      <div className="blog-detail-container">
        {/* Back Link */}
        <Link href="/blog" className="blog-back-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al blog
        </Link>

        {/* Article Header */}
        <header className="blog-detail-header">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="blog-detail-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="blog-detail-title">{post.title}</h1>

          {/* Meta Info */}
          <div className="blog-detail-meta">
            <time dateTime={post.date} className="blog-detail-meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="blog-detail-meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime} min de lectura
            </span>
          </div>

          {/* Description */}
          {post.description && <p className="blog-detail-description">{post.description}</p>}
        </header>

        {/* Divider */}
        <hr className="blog-detail-divider" />

        {/* Article Content */}
        <article className="prose max-w-none">
          <MDXRemote source={post.content || ''} />
        </article>

        {/* Footer */}
        <footer className="blog-detail-footer">
          <div className="blog-detail-footer-content">
            <Link href="/blog" className="btn-base btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Ver más artículos
            </Link>
            <div className="blog-detail-share">
              <span className="blog-detail-share-label">Compartir:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://nicolasmarino.me/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-detail-share-btn"
                aria-label="Compartir en Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nicolasmarino.me/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-detail-share-btn"
                aria-label="Compartir en LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>

        {/* Spacer */}
        <div className="blog-detail-spacer" />
      </div>
    </main>
  );
}
