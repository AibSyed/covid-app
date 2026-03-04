import { HealthBoard } from "@/components/health-board";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen text-slate-100">
      <header className="mx-auto max-w-6xl px-6 pb-4 pt-10">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Health Signal Dashboard</p>
        <h1 className="font-heading text-5xl leading-tight">Global resilience telemetry for modern response teams.</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Built for operator confidence: source health visibility, freshness budgets, and graceful fallback behavior that keeps the signal surface usable under upstream instability.
        </p>
      </header>
      <HealthBoard />
    </main>
  );
}
