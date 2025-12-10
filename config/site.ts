export const siteConfig = {
  // Personal Info
  name: 'Nicolas Marino',
  email: 'contact@nicolasmarino.me',

  // Social Links
  github: 'https://github.com/nicolasmarino',
  linkedin: 'https://www.linkedin.com/in/nicol%C3%A1smarino/',

  // Assets
  avatar: '/avatar.png',
  resume: '/resume.pdf',

  // SEO & Meta
  title: 'Nicolas Marino - Software Developer',
  description: 'Personal portfolio and blog of Nicolas Marino, a software developer.',
  url: 'https://nicolasmarino.me',

  // Default images
  defaultBlogCover: '/images/blog-cover-default.png',
} as const;

export type SiteConfig = typeof siteConfig;
