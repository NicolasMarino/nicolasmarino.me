'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { PostProps } from '@/types';
import { ChevronLeft } from 'lucide-react';
import { SiX, SiLinkedin } from 'react-icons/si';

export function BlogDetailFooter({ post }: PostProps) {
  const { t, language } = useLanguage();

  return (
    <footer className="blog-detail-footer">
      <div className="blog-detail-footer-content">
        <Link href={`/${language}/blog`} className="btn-base btn-primary">
          <ChevronLeft size={16} />
          {t('blog.moreArticles')}
        </Link>
        <div className="blog-detail-share">
          <span className="blog-detail-share-label">{t('blog.share')}</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://nicolasmarino.me/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-detail-share-btn"
            aria-label={t('blog.shareOnTwitter')}
          >
            <SiX size={18} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nicolasmarino.me/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-detail-share-btn"
            aria-label={t('blog.shareOnLinkedIn')}
          >
            <SiLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
