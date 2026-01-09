import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPostSlugs, getPostBySlug, getAllPosts, getPostsByLanguage } from '@/lib/blog';
import fs from 'fs';
import matter from 'gray-matter';
import { siteConfig } from '@/config/site';

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

const mockedFs = vi.mocked(fs);
const mockedMatter = vi.mocked(matter);

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(process, 'cwd').mockReturnValue('/app');
});

function mockPost(data: Record<string, unknown>, content = 'Some content here') {
  mockedMatter.mockReturnValue({ data, content } as unknown as ReturnType<typeof matter>);
}

describe('getPostsByLanguage', () => {
  it('returns posts for the specified language', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(['my-post.mdx'] as unknown as ReturnType<
      typeof fs.readdirSync
    >);
    mockedFs.readFileSync.mockReturnValue('');
    mockPost({ title: 'Mi Post', date: '2025-01-01' });

    const posts = getPostsByLanguage('es');

    expect(posts).toHaveLength(1);
    expect(posts[0].language).toBe('es');
  });

  it('returns empty array when directory is missing', () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getPostsByLanguage('es')).toEqual([]);
  });

  it('filters out non-mdx files', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue([
      'post.mdx',
      'readme.md',
      'notes.txt',
    ] as unknown as ReturnType<typeof fs.readdirSync>);
    mockedFs.readFileSync.mockReturnValue('');
    mockPost({ title: 'Post', date: '2025-01-01' });

    expect(getPostsByLanguage('es')).toHaveLength(1);
  });
});

describe('getPostBySlug', () => {
  it('finds a post by slug', () => {
    mockedFs.existsSync.mockImplementation(((p: string) =>
      p.includes('/es/')) as unknown as typeof fs.existsSync);
    mockedFs.readFileSync.mockReturnValue('');
    mockPost({
      title: 'Test Post',
      date: '2025-01-01',
      description: 'A test',
      image: '/img.png',
      tags: ['react'],
    });

    const post = getPostBySlug('test-post');

    expect(post).not.toBeNull();
    expect(post?.title).toBe('Test Post');
    expect(post?.tags).toEqual(['react']);
  });

  it('respects the provided language override', () => {
    mockedFs.existsSync.mockImplementation(((p: string) =>
      p.includes('/en/')) as unknown as typeof fs.existsSync);
    mockedFs.readFileSync.mockReturnValue('');
    mockPost({ title: 'English Only', date: '2025-01-01' });

    // Try to find in ES (should fail/null)
    const post = getPostBySlug('english-only', 'es');
    expect(post).toBeNull();
  });

  it('returns null when post does not exist in any language', () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getPostBySlug('ghost-post')).toBeNull();
  });

  it('populates default values for missing frontmatter fields', () => {
    mockedFs.existsSync.mockImplementation(((p: string) =>
      p.includes('/es/')) as unknown as typeof fs.existsSync);
    mockedFs.readFileSync.mockReturnValue('');
    mockPost({ title: 'Minimal', date: '2025-01-01' });

    const post = getPostBySlug('minimal');

    expect(post?.image).toBe(siteConfig.defaultBlogCover);
    expect(post?.tags).toEqual([]);
    expect(post?.description).toBe('');
  });
});

describe('getAllPosts', () => {
  it('returns all posts sorted by date descending', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockImplementation(((path: string) => {
      if (path.includes('/es')) return ['old.mdx'];
      if (path.includes('/en')) return ['new.mdx'];
      return [];
    }) as unknown as typeof fs.readdirSync);
    mockedFs.readFileSync.mockImplementation(((path: string) =>
      path.includes('old') ? 'old' : 'new') as unknown as typeof fs.readFileSync);
    mockedMatter.mockImplementation(((content: string) => {
      if (content === 'old') {
        return { data: { title: 'Old Post', date: '2024-01-01' }, content: '' };
      }
      return { data: { title: 'New Post', date: '2025-01-01' }, content: '' };
    }) as unknown as typeof matter);

    const posts = getAllPosts();

    expect(posts[0].title).toBe('New Post');
    expect(posts[1].title).toBe('Old Post');
  });
});

describe('getPostSlugs', () => {
  it('returns unique slugs from both languages', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockImplementation(((path: string) => {
      if (path.includes('/es')) return ['post-es.mdx'];
      if (path.includes('/en')) return ['post-en.mdx'];
      return [];
    }) as unknown as typeof fs.readdirSync);
    mockedFs.readFileSync.mockReturnValue('');
    mockPost({ title: 'Post', date: '2025-01-01' });

    const slugs = getPostSlugs();

    expect(slugs).toContain('post-es');
    expect(slugs).toContain('post-en');
  });
});
