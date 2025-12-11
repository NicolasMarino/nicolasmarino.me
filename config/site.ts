export const siteConfig = {
  name: 'Nicolas Marino',
  email: 'contact@nicolasmarino.me',

  github: 'https://github.com/nicolasmarino',
  linkedin: 'https://www.linkedin.com/in/nicol%C3%A1smarino/',

  avatar: '/avatar.png',
  resume: '/resume.pdf',

  title: 'Nicolas Marino - Software Developer',
  description: 'Personal portfolio and blog of Nicolas Marino, a software developer.',
  url: 'https://nicolasmarino.me',

  defaultBlogCover: '/images/blog-cover-default.png',
} as const;

export type SiteConfig = typeof siteConfig;
