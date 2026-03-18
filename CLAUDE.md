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

**Path alias:** `@/*` maps to `src/*`.

**Environment variables** (required in `.env`):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
