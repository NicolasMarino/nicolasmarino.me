import { describe, it, expect } from 'vitest';
import { cn, formatDate, calculateReadingTime, slugify } from '@/lib/utils';

describe('cn', () => {
  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('p-2 bg-red-500', 'p-4')).toBe('bg-red-500 p-4');
  });

  it('ignores falsy values like false, null, and undefined', () => {
    expect(cn('base', false && 'active', null, undefined)).toBe('base');
  });

  it('handles array inputs', () => {
    expect(cn(['text-red-500', 'bg-blue-500'])).toBe('text-red-500 bg-blue-500');
  });
});

describe('formatDate', () => {
  it('formats dates in Spanish (es-ES) by default', () => {
    expect(formatDate('2024-12-25T12:00:00')).toBe('25 de diciembre de 2024');
  });

  it('supports explicit locale overrides', () => {
    expect(formatDate('2024-12-25T12:00:00', 'en-US')).toBe('December 25, 2024');
  });

  it('handles Date objects correctly', () => {
    const date = new Date('2024-01-01T12:00:00');
    expect(formatDate(date)).toContain('2024');
    expect(formatDate(date)).toContain('enero');
  });

  it('returns "Invalid Date" for malformed strings', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });
});

describe('calculateReadingTime', () => {
  it('returns 1 minute minimum for short or empty text', () => {
    expect(calculateReadingTime('')).toBe(1);
    expect(calculateReadingTime('short content')).toBe(1);
  });

  it('calculates time based on ~200 words per minute', () => {
    const content = Array(400).fill('word').join(' ');
    expect(calculateReadingTime(content)).toBe(2);
  });

  it('handles excessive whitespace gracefully', () => {
    expect(calculateReadingTime('  one   two  three  ')).toBe(1);
  });
});

describe('slugify', () => {
  it('converts text to lowercase with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('strips special characters and punctuation', () => {
    expect(slugify('React & Next.js!')).toBe('react-nextjs');
  });

  it('normalizes accented characters', () => {
    expect(slugify('Canción de Invierno')).toBe('cancion-de-invierno');
  });

  it('collapses multiple hyphens and trims boundaries', () => {
    expect(slugify('--hello--world--')).toBe('hello-world');
    expect(slugify('spanned    text')).toBe('spanned-text');
  });

  it('returns an empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });
});
