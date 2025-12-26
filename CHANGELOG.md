# Changelog

All notable changes to this project will be documented in this file.

## [2025-12-26]

### Added

- **Environment Template**: Added `.env.example` to standardize local setup for R2 integration.

### Optimized

- **Test Suite**:
  - Refactored `blog.test.ts` for better type safety using proper Vitest mocks.
  - Added coverage for redundant language switches in `language-provider.test.tsx`.
- **Infrastructure**: Updated to latest **Next.js 16** and **React 19** stable features and type definitions.
- **Clean Code**: Removed unused `tags` prop spreads in UI components (`ProjectCard3D`, `MinimalCard`).
- **i18n Safety**: Strengthened nested translation retrieval logic with better null checking and unknown type handling.

## [2025-12-23]

### Added

- **Full Internationalization (i18n) System**:
  - Localized all content (About, Experience, Projects) in English and Spanish.
  - Added dynamic project descriptions and tags supported by `en.json` and `es.json`.
- **New Content Sections**:
  - Added **Experience** section to showcase professional trajectory.
  - Added **About** section to the navigation.
- **Dynamic SEO**:
  - Localized metadata (titles, descriptions, OpenGraph) depending on the active language.
- **Cloudflare R2 Integration**:
  - Automated image processing and upload script (`scripts/upload-to-r2.mjs`).
  - Automatic conversion to **Lossless WebP**.
  - Configuration in `next.config.ts` for `images.nicolasmarino.me`.

### Optimized

- **Mobile UX**: Simplified the `DockNavbar` for smaller screens, improving touch targets and visual balance.
- **Personal Branding**: Updated hero role to **Software Engineer** and rebranded blog to **Blog @Data For Everyone**.
- **Content Integrity**: Fixed broken links and copy-paste leftovers in MDX blog posts.
- **Dependency Management**: Added `sharp`, `@aws-sdk/client-s3`, and `dotenv`.
