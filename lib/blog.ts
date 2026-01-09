import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types';
import { calculateReadingTime } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const contentDirectory = path.join(process.cwd(), 'content/blog');

function getPostsFromDirectory(directory: string, language: 'es' | 'en'): Post[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory).filter((file) => file.endsWith('.mdx'));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(directory, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description || data.excerpt || '',
      content,
      image: data.image || siteConfig.defaultBlogCover,
      readTime: calculateReadingTime(content),
      tags: data.tags || [],
      language,
    };
  });
}

export function getPostsByLanguage(language: 'es' | 'en'): Post[] {
  const langDirectory = path.join(contentDirectory, language);
  const posts = getPostsFromDirectory(langDirectory, language);
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllPosts(): Post[] {
  const esPosts = getPostsByLanguage('es');
  const enPosts = getPostsByLanguage('en');
  return [...esPosts, ...enPosts].sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string, language?: 'es' | 'en'): Post | null {
  const languages = language ? [language] : (['es', 'en'] as const);

  for (const lang of languages) {
    const fullPath = path.join(contentDirectory, lang, `${slug}.mdx`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description || data.excerpt || '',
        content,
        image: data.image || siteConfig.defaultBlogCover,
        readTime: calculateReadingTime(content),
        tags: data.tags || [],
        language: lang,
      };
    }
  }
  return null;
}

export function getAllPostParams(): { lang: 'es' | 'en'; slug: string }[] {
  const posts = getAllPosts();
  return posts.map((post) => ({
    lang: post.language as 'es' | 'en',
    slug: post.slug,
  }));
}

export function getPostSlugs(): string[] {
  const allPosts = getAllPosts();
  return Array.from(new Set(allPosts.map((post) => post.slug)));
}
