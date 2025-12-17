export const siteConfig = {
  name: 'Nicolás Marino',
  email: 'hello@nicolasmarino.me',

  github: 'https://github.com/nicolasmarino',
  linkedin: 'https://www.linkedin.com/in/nicol%C3%A1smarino/',

  avatar: '/avatar.webp',
  resume: '/resume.pdf',

  title: 'Nicolás Marino - Software Developer',
  description: 'Personal portfolio and blog of Nicolás Marino, a software developer.',
  url: 'https://nicolasmarino.me',

  defaultBlogCover: '/images/blog-cover-default.png',
} as const;

export type SiteConfig = typeof siteConfig;
