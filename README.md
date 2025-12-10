# nicolasmarino.me

Personal portfolio website built with **Next.js 16** and **React 19**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

🔗 **Live Demo:** [nicolasmarino.me](https://nicolasmarino.me)

---

## 🖥️ Preview

![Portfolio Preview](./public/preview.png)

---

## Features

- 🌐 **Internationalization** – Full EN/ES support with language switcher
- 📝 **MDX Blog** – Syntax highlighting with Shiki, KaTeX for math formulas
- 🎨 **Unique Design** – Minimalist notebook-style aesthetic
- ⚡ **Performance** – Optimized with Next.js App Router
- 📱 **Responsive** – Works seamlessly on all devices
- ♿ **Accessible** – Semantic HTML and keyboard navigation

---

## Tech Stack

| Category  | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| UI        | React 19, Framer Motion |
| Styling   | Tailwind CSS v4         |
| Blog      | MDX, Shiki, KaTeX       |
| Testing   | Vitest                  |
| Tooling   | ESLint, Prettier, Husky |

---

## Project Structure

```
├── app/           # Next.js App Router pages
├── components/    # React components
│   └── ui/        # Reusable UI components
├── config/        # Site configuration (links, metadata)
├── content/       # MDX blog posts
├── data/          # Static data (projects, tech stack)
├── lib/           # Utilities & i18n
├── types/         # TypeScript interfaces
└── public/        # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

| Command            | Description               |
| ------------------ | ------------------------- |
| `npm run dev`      | Development server        |
| `npm run build`    | Production build          |
| `npm run lint`     | Run ESLint                |
| `npm run test`     | Run tests (watch mode)    |
| `npm run test:run` | Run tests once            |
| `npm run format`   | Format code with Prettier |

---

## Author

**Nicolas Marino**

- 🌐 [nicolasmarino.me](https://nicolasmarino.me)
- 💼 [LinkedIn](https://www.linkedin.com/in/nicol%C3%A1smarino/)
- 🐙 [GitHub](https://github.com/nicolasmarino)

---
