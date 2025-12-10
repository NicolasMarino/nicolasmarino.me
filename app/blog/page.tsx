import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export default function BlogIndex() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="blog-page">
      <div className="blog-page-container">
        {/* Header */}
        <header className="blog-page-header">
          <Link href="/" className="blog-back-link">
            ← Back to home
          </Link>
          <h1 className="blog-page-title">Blog</h1>
          <p className="blog-page-subtitle">
            Thoughts, ideas, and things I&apos;ve learned along the way.
          </p>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <article className="blog-featured">
            <Link href={`/blog/${featuredPost.slug}`} className="blog-featured-link">
              <div className="blog-featured-image-wrapper">
                <Image
                  src={featuredPost.image || '/images/blog-cover-default.png'}
                  alt={featuredPost.title}
                  fill
                  className="blog-featured-image"
                  priority
                />
                <div className="blog-featured-overlay" />
              </div>
              <div className="blog-featured-content">
                <div className="blog-featured-badge">Featured</div>
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="blog-featured-tags">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="blog-featured-title">{featuredPost.title}</h2>
                <p className="blog-featured-description">{featuredPost.description}</p>
                <div className="blog-featured-meta">
                  <time dateTime={featuredPost.date}>
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span className="blog-meta-separator">·</span>
                  <span>{featuredPost.readTime} min read</span>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* All Posts Grid */}
        {otherPosts.length > 0 && (
          <section className="blog-posts-section">
            <h2 className="blog-section-heading">More Articles</h2>
            <div className="blog-posts-grid">
              {otherPosts.map((post) => (
                <article key={post.slug} className="blog-post-card group">
                  <Link href={`/blog/${post.slug}`} className="blog-post-card-link">
                    <div className="blog-post-card-image-wrapper">
                      <Image
                        src={post.image || '/images/blog-cover-default.png'}
                        alt={post.title}
                        fill
                        className="blog-post-card-image"
                      />
                    </div>
                    <div className="blog-post-card-content">
                      {post.tags && post.tags.length > 0 && (
                        <div className="blog-post-card-tags">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="blog-tag-small">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="blog-post-card-title group-hover:underline">{post.title}</h3>
                      <p className="blog-post-card-description">{post.description}</p>
                      <div className="blog-post-card-meta">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="blog-meta-separator">·</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <div className="blog-empty">
            <p>No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
