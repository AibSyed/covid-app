import { HealthBoard } from "@/components/health-board";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 pb-4 pt-10">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Health Signal Dashboard</p>
        <h1 className="font-heading text-5xl leading-tight">Global resilience telemetry for modern response teams.</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          The legacy COVID dashboard has been rebuilt into a broader health intelligence cockpit with provider redundancy, freshness controls, and resilient rendering pipelines.
        </p>
      </header>
      <HealthBoard />
    </main>
  );
}
