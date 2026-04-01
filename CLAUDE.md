# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rock climbing competition aggregator — a full-stack web app that collects and displays competition data from climbing gyms.

## Commands

```bash
npm run dev        # Start dev server on port 3001
npm run build      # Production build
npm run test       # Run tests with Vitest (non-watch)
npm run check      # Format with Prettier + fix ESLint issues
npm run lint       # ESLint fix only
npm run format     # Prettier format only
```

## Architecture

**Stack:** React 19 + TanStack Start (full-stack) + Nitro server + Supabase (PostgreSQL) + Tailwind CSS 4 + shadcn/ui

**Routing:** File-based via TanStack React Router. Routes live in `src/routes/`. The file `src/routeTree.gen.ts` is auto-generated — never edit it manually.

Route structure:

- `/` — home
- `/about`, `/events` — top-level pages
- `/g/$gymName/` — gym pages (dynamic param)
- `/g/$gymName/events/` and `/g/$gymName/events/$eventId` — gym event routes
- `(notFound)/$.tsx` — catch-all 404

Data fetching happens via route loaders (TanStack Router) using the Supabase client at `src/utils/supabase.ts`. TanStack Query is installed but not yet wired up.

**UI Components:** shadcn/ui components in `src/components/ui/`. New shadcn components should be added with the CLI using the config in `components.json` (style: Radix Maia, icons: Phosphor, base color: zinc). The `cn()` utility for class merging is at `src/lib/utils.ts`.

- Files in `src/components/ui/` are managed by shadcn — **always ask before modifying them**.
- Custom components build on top of shadcn primitives and live in `src/components/`. When asked to update a component, look there first.

**Path alias:** `@/*` maps to `src/*`.

**Environment variables** (required in `.env`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Code Style

**Comments:** Follow the TSDoc specification. Keep comments concise. Always document type properties that are non-obvious or have default values.

**Component structure:** Any new component under `src/components/` must live in its own folder: `src/components/<component-name>/`. Tests, hooks, types, and subcomponents should be colocated in that folder. Do not use barrel `index.ts` files — the component file should be named after the component it exports (e.g., `src/components/EventCard/EventCard.tsx`).

**React imports:** Never use the `React.` prefix for hooks or utilities. Import them directly (e.g., `import { useState, useEffect } from 'react'`).

**Exports:**

- Named exports for hooks, utility helpers, and constants
- Default exports for components

**Declarations:** Prefer function declarations over arrow functions for components, hooks, and utility helpers.

**Accessibility:** Always consider accessibility when creating components. This includes (but is not limited to): tying `<label>` to inputs via `htmlFor`/`id`, `aria-invalid` on invalid fields, `aria-describedby` to link inputs to error/helper text, `aria-label` on icon-only buttons, and appropriate ARIA roles where semantic HTML isn't sufficient.

**Whitespace for readability:** Always put a newline above `return` statements. Put newlines above and below `if` blocks and other related logical blocks of code to visually separate them.

**Before committing:** Always run `npm run format`, `npm run lint`, and `npm run test`.

**Types:** Prefer `ComponentPropsWithRef` & `ComponentPropsWithoutRef` over `ComponentProps` to be explicit about whether a component handles or doesn't handle refs.