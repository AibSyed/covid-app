import { z } from "zod";
import type { DashboardResponse } from "@/features/signals/schema";

const globalSchema = z.object({
  cases: z.number(),
  active: z.number(),
  deaths: z.number(),
  updated: z.number(),
});

const countrySchema = z.object({
  country: z.string(),
  countryInfo: z.object({ iso2: z.string().nullable().default("XX") }),
  active: z.number(),
  deaths: z.number(),
  cases: z.number(),
  updated: z.number(),
});

const trendSchema = z.object({
  cases: z.record(z.string(), z.number()),
  deaths: z.record(z.string(), z.number()),
});

async function fetchJson(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal, next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Provider request failed (${response.status})`);
  }
  return response.json();
}

export async function fetchDiseaseShDashboard(): Promise<DashboardResponse> {
  const baseUrl = process.env.HEALTH_PRIMARY_BASE_URL ?? "https://disease.sh";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const startedAt = performance.now();

  try {
    const [rawGlobal, rawCountries, rawTrend] = await Promise.all([
      fetchJson(`${baseUrl}/v3/covid-19/all`, controller.signal),
      fetchJson(`${baseUrl}/v3/covid-19/countries?allowNull=false&sort=cases`, controller.signal),
      fetchJson(`${baseUrl}/v3/covid-19/historical/all?lastdays=7`, controller.signal),
    ]);

    const global = globalSchema.parse(rawGlobal);
    const countries = z.array(countrySchema).parse(rawCountries).slice(0, 10);
    const trend = trendSchema.parse(rawTrend);

    const trendDates = Object.keys(trend.cases);
    const trendSeries = trendDates.map((date) => ({
      date,
      cases: trend.cases[date] ?? 0,
      deaths: trend.deaths[date] ?? 0,
    }));

    const latency = Math.round(performance.now() - startedAt);

    return {
      generatedAt: new Date().toISOString(),
      source: "disease.sh",
      fallbackUsed: false,
      freshnessHours: 1,
      partialData: false,
      providerHealth: [
        { name: "disease.sh", healthy: true, latencyMs: latency, message: "Primary provider healthy" },
        { name: "internal-fallback", healthy: true, latencyMs: 5, message: "Standby fallback available" },
      ],
      globalMetrics: [
        { id: "cases", label: "Total Cases", value: global.cases, unit: "people", freshnessHours: 1, confidenceScore: 0.9 },
        { id: "active", label: "Active Cases", value: global.active, unit: "people", freshnessHours: 1, confidenceScore: 0.9 },
        { id: "deaths", label: "Total Deaths", value: global.deaths, unit: "people", freshnessHours: 1, confidenceScore: 0.9 },
      ],
      regionSeries: countries.map((entry) => ({
        code: (entry.countryInfo.iso2 ?? "XX").toUpperCase(),
        country: entry.country,
        active: entry.active,
        deaths: entry.deaths,
        cases: entry.cases,
        updatedAt: new Date(entry.updated).toISOString(),
        confidenceScore: 0.9,
      })),
      trendSeries,
    };
  } finally {
    clearTimeout(timeout);
  }
}
