# Health Signal Dashboard Architecture

- Runtime: Next.js App Router, React 19, strict TypeScript.
- Data pipeline: provider adapter (`lib/api/health-providers.ts`) plus route handler.
- Validation: `features/health/schema.ts` with Zod gate before rendering.
- Frontend state: TanStack Query with bounded retry and stale-time policy.
- Security: strict headers, dependency audit in CI, CodeQL workflow.
