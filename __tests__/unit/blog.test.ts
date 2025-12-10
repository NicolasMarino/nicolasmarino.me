import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { getPostSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import fs from 'fs';
import matter from 'gray-matter';

// Mocks
// Explicitly mock fs to ensure we get spy functions
vi.mock('fs', () => {
  return {
    default: {
      readdirSync: vi.fn(),
      readFileSync: vi.fn(),
      existsSync: vi.fn(),
      // Add otherfs methods if needed by implementation
    },
  };
});

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn(),
}));

describe('Blog Utilities', () => {
  const mockCwd = '/test-cwd';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
  });

  describe('getPostSlugs', () => {
    it('returns a list of filenames from the content directory', () => {
      const mockFiles = ['post-1.mdx', 'post-2.mdx', 'draft.md'];
      (fs.readdirSync as Mock).mockReturnValue(mockFiles);

      const slugs = getPostSlugs();

      expect(fs.readdirSync).toHaveBeenCalledWith(expect.stringContaining('content/blog'));
      expect(slugs).toEqual(mockFiles);
    });
  });

  describe('getPostBySlug', () => {
    it('parses post content and metadata correctly', () => {
      const mockSlug = 'test-post';
      const mockContent = 'This is the post content with about 10 words here for reading time.';
      const mockData = {
        title: 'Test Title',
        date: '2025-01-01',
        description: 'Test Description',
        image: '/test-image.png',
        tags: ['react', 'testing'],
      };

      (fs.readFileSync as Mock).mockReturnValue('raw file content');
      // matter is a function that returns an object { data, content }
      (matter as unknown as Mock).mockReturnValue({
        data: mockData,
        content: mockContent,
      });

      const post = getPostBySlug(mockSlug);

      expect(post.slug).toBe(mockSlug);
      expect(post.title).toBe(mockData.title);
      expect(post.readTime).toBe(1); // 10 words < 200
      expect(post.tags).toEqual(mockData.tags);
      // We rely on real path.join behavior which should produce consistent paths
      expect(fs.readFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/test-post\.mdx$/),
        'utf8',
      );
    });

    it('uses defaults when optional fields are missing', () => {
      const mockSlug = 'minimal-post';
      (fs.readFileSync as Mock).mockReturnValue('raw content');
      (matter as unknown as Mock).mockReturnValue({
        data: {
          title: 'Minimal',
          date: '2024-01-01',
        },
        content: 'content',
      });

      const post = getPostBySlug(mockSlug);

      expect(post.image).toBe('/images/blog-cover-default.png');
      expect(post.tags).toEqual([]);
      expect(post.description).toBe('');
    });
  });

  describe('getAllPosts', () => {
    it('returns all posts sorted by date (newest first)', () => {
      // Mock readdir to return 2 files
      (fs.readdirSync as Mock).mockReturnValue(['old.mdx', 'new.mdx']);

      // Setup mock behavior for getPostBySlug calls via mocks
      (fs.readFileSync as Mock).mockImplementation((filePath: string) => {
        if (filePath.includes('new.mdx')) return 'new-content';
        return 'old-content';
      });

      (matter as unknown as Mock).mockImplementation((content: string) => {
        if (content === 'new-content') {
          return { data: { title: 'New', date: '2025-01-01' }, content: '...' };
        }
        return { data: { title: 'Old', date: '2020-01-01' }, content: '...' };
      });

      const posts = getAllPosts();

      expect(posts).toHaveLength(2);
      expect(posts[0].title).toBe('New');
      expect(posts[1].title).toBe('Old');
    });
  });
});
