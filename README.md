# Health Signal Dashboard

Health Signal Dashboard is a full rewrite of the legacy COVID tracker into a broader global health signal cockpit. It is designed for operator trust: freshness visibility, source health, and graceful degraded behavior.

## Highlights
- Multi-source-ready health telemetry model.
- Region comparison workflow with filterable table.
- Explicit source status and freshness indicators.
- Schema-validated payload boundaries to prevent malformed data leaks into UI.

## Architecture
```mermaid
flowchart LR
  O[Operator] --> UI[Next.js App Router UI]
  UI --> Q[TanStack Query Cache]
  Q --> RH[/app/api/health-signals Route Handler]
  RH --> P[Provider Aggregator]
  P --> V[Zod Payload Validation]
  P --> DS[(disease.sh API)]
  P --> FS[(Static Fallback Snapshot)]
  V --> UI
```

## Tech Stack
- Next.js 16 App Router
- React 19 + TypeScript (strict)
- TanStack Query v5
- Zod v4
- Tailwind CSS
- Vitest + Playwright

## Local Development
```bash
pnpm install
pnpm dev
```

## Verification Commands
```bash
pnpm run check
pnpm run test:e2e
pnpm run audit:high
```

## Environment
Copy `.env.example` to `.env.local` and adjust if needed.

- `HEALTH_PRIMARY_BASE_URL` optional override for the primary provider.
- `HEALTH_COUNTRIES_PATH` optional route override for country-level data.

## Product Reinvention Notes
- Legacy one-source card dashboard removed.
- New design prioritizes signal confidence and operational decision quality.
- App remains functional during upstream provider instability.
