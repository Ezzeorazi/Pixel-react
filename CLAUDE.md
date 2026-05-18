# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Run production server
npm run lint      # ESLint check
```

No test runner is configured.

## Architecture

Digital agency portfolio + CMS built with Next.js 16 App Router, Supabase, Tailwind CSS 4, and next-intl.

### Routing

- All public pages live under `src/app/[locale]/` — locale is either `en` or `es`
- Admin panel is at `src/app/admin/` (unlocalized, protected by Supabase auth)
- Path alias: `@/*` → `src/*`

### Data layer

- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/supabase/queries.ts` — all read queries
- `src/lib/supabase/admin.ts` — admin write operations
- `src/app/actions/` — Next.js Server Actions for mutations (blog, projects, services, contact, settings)
- `src/lib/data.ts` — static fallback/seed content
- `src/lib/types.ts` — shared TypeScript types

### Internationalization

- next-intl 4 handles routing and translations
- Config: `src/i18n/routing.ts` (locales: `en`, `es`) and `src/i18n/request.ts`
- Translation strings: `src/messages/en.json` and `src/messages/es.json`
- All user-facing strings must go through `useTranslations()` / `getTranslations()`

### Styling

- Tailwind CSS 4 — uses the new `@tailwindcss/postcss` plugin (not the old `tailwind.config.js` setup)
- Dark mode via `next-themes` (ThemeProvider in `src/components/Providers.tsx`)
- Icons: `lucide-react`

### Deployment

- Deployed to Netlify via `@netlify/plugin-nextjs` (see `netlify.toml`)
- Environment variables needed: Supabase URL + anon key + service role key
