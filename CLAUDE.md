# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

There is no test runner configured in this project.

## Architecture

**Stack:** Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui (Radix UI), React Router v6, TanStack React Query, React Hook Form + Zod.

**Path alias:** `@` maps to `./src/`.

### Key directories

- `src/pages/` — One component per route (20+ pages).
- `src/components/ui/` — shadcn/ui components; do not modify manually, use the shadcn CLI to add/update.
- `src/components/` — Shared custom components (Navigation, HeroSection, EquipmentCard, ProjectCard).
- `src/composables/` — Data-fetching hooks (e.g., `useEquipement.ts` wraps `useApi.ts`).
- `src/hooks/` — UI utility hooks (`use-mobile`, `use-toast`).
- `src/types/` — TypeScript interfaces; adapter files map API shapes to component props.
- `src/mockup/` — JSON mock data served via the API base when `VITE_API_BASE=/src/mockup`.

### Routing

All routes are declared in `src/App.tsx` using React Router `<BrowserRouter>`. `QueryClientProvider` and `TooltipProvider` wrap the entire app there.

### Data fetching

`src/composables/useApi.ts` exports a generic `apiCall<TResponse, TBody>()` function. All API calls go through it. It returns:

```ts
{ status: 'success' | 'error', message: string, payload: T | null }
```

`apiCall` normalizes two response formats:
1. Wrapped `{ status, message, payload }` (legacy local JSON mock)
2. Raw JSON arrays or objects (TS-Mock-API and real REST APIs)

The base URL is read from `VITE_API_BASE` (`.env`), currently `http://localhost:3000`.

### Mock API (development)

The repo at `https://github.com/Many0nne/TS-Mock-API` generates a REST API from TypeScript interfaces. To use it:

1. Copy `mock-api-types/campus-connect.types.ts` into the TS-Mock-API `test-types/` directory.
2. Start the mock server: `npx ts-mock-proxy --types-dir ./test-types --port 3000`
3. Routes follow the convention: `GET /equipments` → `Equipment[]`, `GET /equipment` → single `Equipment`.

### Composables

One composable file per domain in `src/composables/`:

| File | Endpoints used |
|---|---|
| `useEquipement.ts` | `GET /equipments` |
| `useEvents.ts` | `GET /events`, `POST /events` |
| `useForumPosts.ts` | `GET /forumPosts`, `POST /forumPosts` |
| `useProjects.ts` | `GET /projects`, `POST /projects` |
| `useDiscussions.ts` | `GET /discussions`, `POST /discussions` |
| `useMessages.ts` | `GET /messages` (filtered by `discussionId`), `POST /messages` |
| `useSchedule.ts` | `GET /scheduleEntries` (adds Tailwind color client-side) |
| `useReservations.ts` | `GET /reservations`, `POST /reservations`, `PATCH /reservations/:id` |
| `useDocuments.ts` | `GET /documents`, `POST /documents`, `DELETE /documents/:id` |

These are plain async functions (no React hooks inside). Call them inside `useEffect` or React Query's `queryFn`.

### Styling

- Campus brand colors: `campus.green` (#00796B) and `campus.yellow` (#FFC107) defined in `tailwind.config.ts`.
- Dark mode is class-based (`next-themes`).
- Use `cn()` from `src/lib/utils.ts` to merge Tailwind classes.
- TypeScript strictness is relaxed (`noImplicitAny: false`, `strictNullChecks: false`).
