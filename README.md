# Liflode Knowledge Base

Operational Knowledge Platform — staff-facing documentation site for Liflode.

Built with [Astro Starlight](https://starlight.astro.build/).

## Purpose

This repository hosts the Liflode internal knowledge base. It is a staff-facing docs site where operational documentation is written in Markdown and organised into sections:

- **SOPs** — Standard Operating Procedures for day-to-day operations
- **Onboarding** — Guides and checklists for new staff members
- **Training** — Training materials and learning resources
- **Runbooks** — Step-by-step operational runbooks and incident response guides
- **Process Docs** — Internal workflows and process documentation

Content is authored in Markdown/MDX files under `src/content/docs/`. The site auto-deploys to Cloudflare Pages on push to `main`.

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/Curious-Owl11/liflode-docs-site.git
cd liflode-docs-site

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build

```bash
npm run build
```

Built output goes to `dist/`.

## Project Structure

```
src/
  content/
    docs/
      sops/         # Standard Operating Procedures
      onboarding/   # Onboarding guides
      training/     # Training materials
      runbooks/     # Operational runbooks
      process/      # Process documentation
      index.mdx     # Home page
astro.config.mjs    # Astro + Starlight configuration
```

## Commands

| Command             | Action                                       |
| :------------------ | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview build locally before deploying       |

## Adding Content

Add Markdown (`.md`) or MDX (`.mdx`) files to the relevant directory under `src/content/docs/`. Each file needs frontmatter with at minimum a `title` field:

```md
---
title: My New Doc
description: A short description.
---

Content goes here.
```

Starlight will automatically add new pages to the sidebar via `autogenerate`.

## Deployment

The site deploys automatically to Cloudflare Pages on push to `main`. (Deployment setup: CORE-2695.)
