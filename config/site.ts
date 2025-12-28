export const siteConfig = {
  name: 'Nicolás Marino',
  email: 'hello@nicolasmarino.me',

  github: 'https://github.com/nicolasmarino',
  linkedin: 'https://www.linkedin.com/in/nicol%C3%A1smarino/',

  avatar: 'https://images.nicolasmarino.me/blog/avatar-new-1766963328861.webp',

  title: 'Nicolás Marino - Software Developer',
  description: 'Personal portfolio and blog of Nicolás Marino, a software developer.',
  url: 'https://nicolasmarino.me',

  defaultBlogCover: 'https://images.nicolasmarino.me/blog/blog-cover-new-1766963331003.webp',
} as const;

export type SiteConfig = typeof siteConfig;
