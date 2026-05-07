# Jaewoo Ann Portfolio

A bilingual portfolio site for Jaewoo Ann, focused on frontend engineering, AI-native product work, and concise project storytelling.

## Overview

This portfolio is built as a single-page Next.js site with a refined product-interface direction inspired by Open Design. It keeps the content structure editable while supporting English-first presentation with Korean localized sections where needed.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Icons

## Features

- English and Korean language toggle
- Product-style hero section
- Minimal identity section
- Categorized tech stack with large icon cards
- Career Journey section with project card transitions
- Coffee chat and contact form
- Responsive desktop and mobile layout

## Project Structure

```text
src/
  app/
    globals.css        Global styles and design tokens
    layout.tsx         App metadata and font setup
    page.tsx           Page entry
  components/
    portfolio-page.tsx Main portfolio UI
  data/
    portfolio.ts       Portfolio content and localization data
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will choose another available port.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Design Direction

The current redesign is based on an Open Design-generated prototype, adapted into the existing Next.js architecture instead of copying static HTML directly. The visual direction uses a calm, developer-tool inspired interface with light grid surfaces, restrained motion, large technical primitives, and short editorial copy.

## Content Notes

Most content is managed in:

```text
src/data/portfolio.ts
```

Company history, project details, contact links, and Korean/English copy can be updated there without changing the main component structure.
