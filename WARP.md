# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Key commands

All commands assume the repo root and Node.js tooling installed.

- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Run production server locally (after build): `npm start`
- Lint the project: `npm run lint`
- Run dev server on a specific port: `PORT=4000 npm run dev` (Unix) or `$env:PORT=4000; npm run dev` (PowerShell)
- Run a single Next.js route handler or page in isolation: use `npm run dev` and navigate directly to the route (e.g. `/upload`, `/upload/image`, `/api/generate-keywords`). There are no per-file test commands defined.

If you prefer a different package manager, you can substitute `npm` with `yarn`, `pnpm`, or `bun` as long as the lockfile matches.

## Project architecture

This is a Next.js App Router project (`app` directory) with TypeScript and Tailwind CSS 4.

- **Entry layout**: `app/layout.tsx` defines global HTML structure, fonts, theme, TanStack Query provider, header and bottom bar, and the global `Toaster`.
- **Home feed**: `app/page.tsx` is a client component that reads URL search params (`category`, `q`), uses `useGetMemes` (TanStack Query) to fetch memes, and renders a masonry-like grid of `MemeCard` components with skeletons and basic error/empty states.
- **Upload flow**:
  - `app/upload/page.tsx` shows high-level upload options (image, video, link) using `UploadHeader` and `UploadOption` components and the `MemeUploadOptionType` type.
  - `app/upload/[type]/page.tsx` is a client page that resolves the dynamic `type` param (`MemeType`) and renders the `SubmitMeme` form for that meme type, wrapped with a simple header/back button.
- **API routes**:
  - `app/api/generate-keywords/route.ts` exposes a POST endpoint that accepts `{ imageUrl, type }`, fetches the image, calls Google Gemini (`@google/genai`) with the image and a Spanish prompt, and returns a JSON array of keyword strings. This route depends on the `GEMINI_API_KEY` environment variable.

### Cross-cutting concerns

- **Styling and theming**: Tailwind CSS 4 is configured via `@tailwindcss/postcss` and global styles in `app/globals.css`. `ThemeProvider` wraps the app for dark/light theme management, and layout/body classes attach font CSS variables.
- **Data fetching**: TanStack React Query is configured in `QueryProvider` (under `@/providers`). Hooks like `useGetMemes` live under `@/hooks` and should be used instead of calling Supabase or APIs directly from components.
- **Routing model**: Uses the Next.js App Router with file-based routes under `app/*`. Dynamic segments like `[type]` use the async `params` pattern.
- **Images and storage**: `next.config.ts` allows remote images from `picsum.photos` and a Supabase storage bucket (`/storage/v1/object/public/meme-uploads/**`). Any new external image host must be whitelisted there.
- **Path aliases**: The `@/*` alias is configured in `tsconfig.json` to resolve to the repo root. All internal imports in the app should use this alias rather than long relative paths.

## Environment and external services

- **Supabase**: The app depends on `@supabase/supabase-js`. Client instances and related hooks live under `@/providers` / `@/hooks` (follow existing patterns when adding new queries or mutations).
- **Google Gemini**: `app/api/generate-keywords/route.ts` uses `@google/genai` and requires `GEMINI_API_KEY` to be set in the environment. In development, configure this via `.env.local` and restart the dev server after changes.

## Notes for future Warp agents

- Prefer editing files via the existing architecture: create new pages under `app/*`, colocate components under `components/*`, and use query hooks in `@/hooks` for data access.
- When adding new meme types or upload flows, update `MemeType` / `MemeUploadOptionType`, extend the upload options in `app/upload/page.tsx`, and handle the new type in `SubmitMeme` and any related API routes.