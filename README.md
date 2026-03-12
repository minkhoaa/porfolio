# Dev_Console :: Portfolio

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-black?style=for-the-badge&logo=tailwindcss)
![React](https://img.shields.io/badge/React-black?style=for-the-badge&logo=react)

A personal developer portfolio website styled as a terminal/console interface. Built with Next.js 16, React 19, and Tailwind CSS 4, using pixel and monospace fonts to deliver a retro dev-console aesthetic.

---

## Features

- **Terminal Aesthetic** — Dark background with green/purple accent colors, Press Start 2P pixel font, and JetBrains Mono for body text
- **Responsive Grid Layout** — 12-column desktop grid collapsing to a single-column mobile layout
- **Modular Window Panels** — Distinct sections for Profile, Contact, Tech Stack, and Projects rendered as bordered console windows
- **Static Export** — Built for fast, static hosting via Next.js static output mode

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Fonts | Press Start 2P, JetBrains Mono (Google Fonts) |
| React | React 19 with React Compiler |
| Linting | ESLint with eslint-config-next |

---

## Project Structure

```
src/
  app/
    layout.tsx    # Root layout — font loading, global metadata, base styles
    page.tsx      # Homepage — grid layout with panel sections
    globals.css   # Global Tailwind base styles
next.config.ts    # Next.js configuration
tailwind.config.ts
tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/minkhoaa/porfolio.git
cd porfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## License

This project is for personal use.
