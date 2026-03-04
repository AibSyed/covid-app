# Health Signal Dashboard

Health Signal Dashboard is a fully rewritten global health telemetry app with provider-aware resilience and confidence envelopes.

## Stack
- Next.js 16 App Router
- React 19 + TypeScript strict mode
- TanStack Query v5
- Zod validation
- Tailwind CSS
- Vitest + Playwright

## Development
```bash
pnpm install
pnpm dev
```

## Verification
```bash
pnpm run check
pnpm run test:e2e
pnpm run audit:high
```

## Data Sources
- Primary source: `disease.sh`
- Automatic fallback: schema-validated static snapshot
