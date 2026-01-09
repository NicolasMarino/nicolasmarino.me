# Personal Portfolio and Blog

A performance-optimized portfolio and blog platform built with Next.js 16, React 19, and Tailwind CSS v4.

[Link to Live Site](https://nicolasmarino.me)

## Features

- **i18n**: Full English and Spanish support.
- **MDX Blog**: Support for Markdown, React components, Shiki syntax highlighting, and KaTeX.
- **Cloudflare R2**: Automated script for WebP conversion and asset uploading.
- **Testing**: Vitest for unit tests and Playwright for E2E.
- **UI/UX**: Built with Tailwind CSS v4, Framer Motion, and Shadcn/UI.
- **Workflow**: Husky, Lint-staged, and Conventional Commits for code consistency.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Content**: MDX, Rehype, Remark.
- **Development**: Vitest, Playwright, ESLint, Prettier.
- **Infrastructure**: Cloudflare R2, Sharp.

## Project Organization

```bash
├── app/              # Application routes and layouts
├── components/       # Functional React components
│   └── ui/           # Atomic UI components
├── config/           # Site metadata and global parameters
├── content/          # Blog content in MDX (EN/ES)
├── data/             # Static data models and constants
├── lib/              # Core utilities and i18n configuration
├── scripts/          # Operational and automation scripts
├── public/           # Static public assets and documentation
└── __tests__/        # Comprehensive test suites
```

## Installation and Setup

### Prerequisites

- Node.js (v24.11.1 or higher recommended)

### Local Implementation

1. Clone the repository:
   ```bash
   git clone https://github.com/nicolasmarino/nicolasmarino.me.git
   cd nicolasmarino.me
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Environment variables are required for the automated image hosting script. Create a `.env` file using `.env.example` as a template:

- `R2_ACCESS_KEY_ID`: Cloudflare R2 access key
- `R2_SECRET_ACCESS_KEY`: Cloudflare R2 secret key
- `R2_ENDPOINT`: Account-specific S3 API endpoint
- `R2_BUCKET_NAME`: Target storage bucket
- `R2_PUBLIC_URL`: Public access URL for assets

### Execution

Start the development environment:

```bash
npm run dev
```

## Maintenance and Deployment

### Script Reference

| Command            | Description                         |
| :----------------- | :---------------------------------- |
| `npm run dev`      | Initialize local development server |
| `npm run build`    | Generate production-ready build     |
| `npm run start`    | Serve production build locally      |
| `npm run lint`     | Execute static analysis with ESLint |
| `npm run test`     | Run test suites in watch mode       |
| `npm run test:run` | Execute single-pass test suite      |
| `npm run format`   | Enforce Prettier formatting         |
| `npm run upload`   | Optimization and R2 upload script   |

### Development Standards

This project utilizes Husky and Lint-staged to ensure code integrity. Every commit must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard to maintain a clean, readable version history.

### Image Optimization Pipeline

To maintain optimal performance, the project includes a script to process and host assets before publication.

```bash
npm run upload /path/to/asset.png
```

The script performs automated WebP conversion and returns the Markdown syntax required for blog integration.

## Contact

- **Author**: Nicolás Marino
- **Website**: [nicolasmarino.me](https://nicolasmarino.me)
- **LinkedIn**: [nicolásmarino](https://www.linkedin.com/in/nicol%C3%A1smarino/)
- **Twitter**: [@nicolasmarino](https://twitter.com/nicolasmarino)

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
