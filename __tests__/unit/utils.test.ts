import { describe, it, expect } from 'vitest';
import { cn, formatDate, calculateReadingTime, slugify } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn() - ClassName Merge', () => {
    it('merges tailwind classes correctly overriding conflicts', () => {
      // "p-4" should overwrite "p-2" because it comes last
      expect(cn('p-2 bg-red-500', 'p-4')).toBe('bg-red-500 p-4');
    });

    it('handles conditional classes properly', () => {
      const isTrue = true;
      const isFalse = false;
      const result = cn('base-class', isTrue && 'included', isFalse && 'excluded', null, undefined);
      expect(result).toBe('base-class included');
    });

    it('handles array inputs if passed via spread', () => {
      // clsx handles arrays, so cn should too
      expect(cn(['text-red-500', 'bg-blue-500'])).toBe('text-red-500 bg-blue-500');
    });
  });

  describe('formatDate()', () => {
    it('formats dates in explicit Spanish long format', () => {
      // Avoid timezone issues by picking noon
      const date = '2024-12-25T12:00:00';
      expect(formatDate(date)).toBe('25 de diciembre de 2024');
    });

    it('handles Date objects correctly', () => {
      const date = new Date('2024-01-01T12:00:00');
      // Just checking it contains the key parts
      const result = formatDate(date);
      expect(result).toMatch(/1 de (enero|January) de 2024/i);
    });

    it('handles invalid dates gracefully (or throws if expected)', () => {
      expect(formatDate(new Date('invalid'))).toBe('Invalid Date');
    });
  });

  describe('calculateReadingTime()', () => {
    it('returns 1 minute for empty or short content', () => {
      expect(calculateReadingTime('')).toBe(1);
      expect(calculateReadingTime('Hello world')).toBe(1);
    });

    it('calculates time based on 200 WPM', () => {
      const words = Array(401).fill('word').join(' '); // 401 words -> 3 mins
      expect(calculateReadingTime(words)).toBe(3);
    });

    it('handles extra whitespace correctly', () => {
      const text = '  one   two  three  ';
      // 3 words -> 1 min
      expect(calculateReadingTime(text)).toBe(1);
    });
  });

  describe('slugify()', () => {
    it('standardizes simpler titles', () => {
      expect(slugify('My First Post')).toBe('my-first-post');
    });

    it('handles mixed case and special characters', () => {
      expect(slugify('React 19 & Next.js!')).toBe('react-19-nextjs');
    });

    it('handles accents (NFD normalization)', () => {
      expect(slugify('Fútbol & Canción')).toBe('futbol-cancion');
    });

    it('trims hyphens from start/end', () => {
      expect(slugify('-slug-with-hyphens-')).toBe('slug-with-hyphens');
    });

    it('collapses multiple spaces or hyphens', () => {
      expect(slugify('foo   bar---baz')).toBe('foo-bar-baz');
    });

    it('handles empty strings', () => {
      expect(slugify('')).toBe('');
    });
  });
});
