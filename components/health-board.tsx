"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, Globe2, ShieldCheck } from "lucide-react";
import type { HealthSignalPayload } from "@/features/health/schema";

async function fetchSignals() {
  const response = await fetch("/api/health-signals");
  if (!response.ok) {
    throw new Error("Health signals unavailable");
  }
  return (await response.json()) as HealthSignalPayload;
}

export function HealthBoard() {
  const [countryFilter, setCountryFilter] = useState("");
  const query = useQuery({ queryKey: ["health-signals"], queryFn: fetchSignals });

  const regions = useMemo(() => {
    if (!query.data) {
      return [];
    }
    return query.data.regionComparison.filter((row) => row.country.toLowerCase().includes(countryFilter.toLowerCase()));
  }, [query.data, countryFilter]);

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-14 pt-4 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6 rounded-3xl border border-cyan-900 bg-slate-950/75 p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-100">Global Health Signal Engine</span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Provider-safe mode</span>
        </div>

        {query.isPending && <p className="text-slate-300">Collecting world signals...</p>}
        {query.isError && <p className="rounded-lg border border-rose-500/40 bg-rose-950/30 p-3 text-rose-100">Signal feed unavailable. Retry shortly.</p>}

        <div className="grid gap-4 md:grid-cols-3">
          {query.data?.globalMetrics.map((metric) => (
            <article key={metric.id} className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold">{metric.value.toLocaleString()}</p>
              <p className="text-xs text-slate-400">{metric.unit} · {metric.freshnessHours}h freshness budget</p>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <label className="text-sm text-slate-300">Filter Regions</label>
          <input
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            placeholder="Type a country name"
            value={countryFilter}
            onChange={(event) => setCountryFilter(event.target.value)}
          />

          <div className="mt-4 max-h-96 overflow-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/90 text-slate-300">
                <tr>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">Active</th>
                  <th className="px-3 py-2">Deaths</th>
                  <th className="px-3 py-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((row) => (
                  <tr key={row.country} className="border-t border-slate-800">
                    <td className="px-3 py-2">{row.country}</td>
                    <td className="px-3 py-2">{row.active.toLocaleString()}</td>
                    <td className="px-3 py-2">{row.deaths.toLocaleString()}</td>
                    <td className="px-3 py-2">{new Date(row.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <h2 className="font-heading text-2xl">Trust Envelope</h2>
        <p className="text-sm text-slate-300">Every metric includes freshness metadata and source status so operators can spot stale data before acting.</p>
        <div className="space-y-3">
          {query.data?.sourceStatus.map((source) => (
            <div key={source.name} className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
              <p className="flex items-center gap-2 font-medium">
                {source.healthy ? <ShieldCheck size={16} className="text-emerald-300" /> : <Activity size={16} className="text-amber-300" />}
                {source.name}
              </p>
              <p className="text-xs text-slate-400">{source.message}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-cyan-800/60 bg-cyan-950/40 p-3 text-xs text-cyan-100">
          <p className="flex items-center gap-2"><Globe2 size={14} /> Region comparison is provider-agnostic and schema-validated before render.</p>
        </div>
      </aside>
    </section>
  );
}
