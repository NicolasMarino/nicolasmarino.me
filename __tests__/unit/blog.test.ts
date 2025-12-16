import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { getPostSlugs, getPostBySlug, getAllPosts, getPostsByLanguage } from '@/lib/blog';
import fs from 'fs';
import matter from 'gray-matter';

vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
}));

vi.mock('gray-matter', () => ({
  default: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(process, 'cwd').mockReturnValue('/app');
});

function mockPost(data: Record<string, unknown>, content = 'Some content here') {
  (matter as unknown as Mock).mockReturnValue({ data, content });
}

describe('getPostsByLanguage', () => {
  it('should return posts for the given language', () => {
    (fs.existsSync as Mock).mockReturnValue(true);
    (fs.readdirSync as Mock).mockReturnValue(['my-post.mdx']);
    (fs.readFileSync as Mock).mockReturnValue('');
    mockPost({ title: 'Mi Post', date: '2025-01-01' });

    const posts = getPostsByLanguage('es');

    expect(posts).toHaveLength(1);
    expect(posts[0].language).toBe('es');
  });

  it('should return empty when directory does not exist', () => {
    (fs.existsSync as Mock).mockReturnValue(false);

    expect(getPostsByLanguage('es')).toEqual([]);
  });

  it('should only include .mdx files', () => {
    (fs.existsSync as Mock).mockReturnValue(true);
    (fs.readdirSync as Mock).mockReturnValue(['post.mdx', 'readme.md', 'notes.txt']);
    (fs.readFileSync as Mock).mockReturnValue('');
    mockPost({ title: 'Post', date: '2025-01-01' });

    expect(getPostsByLanguage('es')).toHaveLength(1);
  });
});

describe('getPostBySlug', () => {
  it('should find a post by slug', () => {
    (fs.existsSync as Mock).mockImplementation((p: string) => p.includes('/es/'));
    (fs.readFileSync as Mock).mockReturnValue('');
    mockPost({
      title: 'Test Post',
      date: '2025-01-01',
      description: 'A test',
      image: '/img.png',
      tags: ['react'],
    });

    const post = getPostBySlug('test-post');

    expect(post).not.toBeNull();
    expect(post!.title).toBe('Test Post');
    expect(post!.tags).toEqual(['react']);
  });

  it('should check Spanish first, then English', () => {
    (fs.existsSync as Mock).mockImplementation((p: string) => p.includes('/en/'));
    (fs.readFileSync as Mock).mockReturnValue('');
    mockPost({ title: 'English Post', date: '2025-01-01' });

    const post = getPostBySlug('my-post');

    expect(post?.language).toBe('en');
  });

  it('should return null when post not found', () => {
    (fs.existsSync as Mock).mockReturnValue(false);

    expect(getPostBySlug('ghost-post')).toBeNull();
  });

  it('should use defaults for missing fields', () => {
    (fs.existsSync as Mock).mockImplementation((p: string) => p.includes('/es/'));
    (fs.readFileSync as Mock).mockReturnValue('');
    mockPost({ title: 'Minimal', date: '2025-01-01' });

    const post = getPostBySlug('minimal');

    expect(post!.image).toBe('/images/blog-cover-default.png');
    expect(post!.tags).toEqual([]);
    expect(post!.description).toBe('');
  });
});

describe('getAllPosts', () => {
  it('should return all posts sorted by date (newest first)', () => {
    (fs.existsSync as Mock).mockReturnValue(true);
    (fs.readdirSync as Mock).mockImplementation((path: string) => {
      if (path.includes('/es')) return ['old.mdx'];
      if (path.includes('/en')) return ['new.mdx'];
      return [];
    });
    (fs.readFileSync as Mock).mockImplementation((path: string) =>
      path.includes('old') ? 'old' : 'new',
    );
    (matter as unknown as Mock).mockImplementation((content: string) => {
      if (content === 'old') {
        return { data: { title: 'Old Post', date: '2024-01-01' }, content: '' };
      }
      return { data: { title: 'New Post', date: '2025-01-01' }, content: '' };
    });

    const posts = getAllPosts();

    expect(posts[0].title).toBe('New Post');
    expect(posts[1].title).toBe('Old Post');
  });
});

describe('getPostSlugs', () => {
  it('should return slugs from both languages', () => {
    (fs.existsSync as Mock).mockReturnValue(true);
    (fs.readdirSync as Mock).mockImplementation((path: string) => {
      if (path.includes('/es')) return ['post-es.mdx'];
      if (path.includes('/en')) return ['post-en.mdx'];
      return [];
    });
    (fs.readFileSync as Mock).mockReturnValue('');
    mockPost({ title: 'Post', date: '2025-01-01' });

    const slugs = getPostSlugs();

    expect(slugs).toContain('post-es');
    expect(slugs).toContain('post-en');
  });
});
