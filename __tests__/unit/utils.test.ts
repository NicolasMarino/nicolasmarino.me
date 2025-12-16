import { describe, it, expect } from 'vitest';
import { cn, formatDate, calculateReadingTime, slugify } from '@/lib/utils';

describe('cn', () => {
  it('should merge tailwind classes and handle conflicts', () => {
    expect(cn('p-2 bg-red-500', 'p-4')).toBe('bg-red-500 p-4');
  });

  it('should ignore falsy values', () => {
    const isActive = false;
    expect(cn('base', isActive && 'active', null, undefined)).toBe('base');
  });

  it('should work with arrays', () => {
    expect(cn(['text-red-500', 'bg-blue-500'])).toBe('text-red-500 bg-blue-500');
  });
});

describe('formatDate', () => {
  it('should format a date in Spanish by default', () => {
    expect(formatDate('2024-12-25T12:00:00')).toBe('25 de diciembre de 2024');
  });

  it('should work with Date objects', () => {
    const result = formatDate(new Date('2024-01-01T12:00:00'));
    expect(result).toContain('2024');
    expect(result).toContain('enero');
  });

  it('should return "Invalid Date" for bad input', () => {
    expect(formatDate('not-a-date')).toBe('Invalid Date');
  });
});

describe('calculateReadingTime', () => {
  it('should return at least 1 minute for short content', () => {
    expect(calculateReadingTime('')).toBe(1);
    expect(calculateReadingTime('Hello world')).toBe(1);
  });

  it('should calculate based on 200 WPM', () => {
    const fourHundredWords = Array(400).fill('word').join(' ');
    expect(calculateReadingTime(fourHundredWords)).toBe(2);
  });

  it('should handle whitespace correctly', () => {
    expect(calculateReadingTime('  one   two  ')).toBe(1);
  });
});

describe('slugify', () => {
  it('should convert to lowercase with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('React & Next.js!')).toBe('react-nextjs');
  });

  it('should strip accents', () => {
    expect(slugify('Café con Leche')).toBe('cafe-con-leche');
  });

  it('should clean up extra hyphens', () => {
    expect(slugify('--hello--world--')).toBe('hello-world');
    expect(slugify('one   two')).toBe('one-two');
  });

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('');
  });
});
