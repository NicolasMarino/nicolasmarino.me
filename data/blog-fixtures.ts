import type { Post } from '@/types';
import { siteConfig } from '@/config/site';

/**
 * Dummy posts for development/preview purposes.
 * These are shown when no real posts are available.
 */
export const dummyPosts: Post[] = [
  {
    slug: 'lorem-ipsum-dolor-sit',
    title: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    date: '2024-12-01',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    image: siteConfig.defaultBlogCover,
    readTime: 5,
    tags: ['Development', 'Tutorial'],
  },
  {
    slug: 'sed-ut-perspiciatis',
    title: 'Sed Ut Perspiciatis Unde Omnis Iste Natus',
    date: '2024-11-15',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.',
    image: siteConfig.defaultBlogCover,
    readTime: 8,
    tags: ['React', 'Next.js'],
  },
  {
    slug: 'nemo-enim-ipsam',
    title: 'Nemo Enim Ipsam Voluptatem Quia Voluptas',
    date: '2024-10-28',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    image: siteConfig.defaultBlogCover,
    readTime: 4,
    tags: ['JavaScript', 'Tips'],
  },
];
