import type { DashboardResponse } from "@/features/signals/schema";

export const fallbackDashboard: DashboardResponse = {
  generatedAt: new Date().toISOString(),
  source: "fallback",
  fallbackUsed: true,
  freshnessHours: 12,
  partialData: false,
  providerHealth: [
    { name: "disease.sh", healthy: false, latencyMs: 0, message: "Primary provider unavailable" },
    { name: "internal-fallback", healthy: true, latencyMs: 6, message: "Fallback snapshot engaged" },
  ],
  globalMetrics: [
    { id: "cases", label: "Total Cases", value: 704753890, unit: "people", freshnessHours: 12, confidenceScore: 0.64 },
    { id: "active", label: "Active Cases", value: 22123398, unit: "people", freshnessHours: 12, confidenceScore: 0.64 },
    { id: "deaths", label: "Total Deaths", value: 7010681, unit: "people", freshnessHours: 12, confidenceScore: 0.64 },
  ],
  regionSeries: [
    { code: "US", country: "United States", active: 786167, deaths: 1219487, cases: 111820082, updatedAt: new Date().toISOString(), confidenceScore: 0.64 },
    { code: "BR", country: "Brazil", active: 1783377, deaths: 711380, cases: 38843728, updatedAt: new Date().toISOString(), confidenceScore: 0.64 },
    { code: "IN", country: "India", active: 44501823, deaths: 533570, cases: 44998123, updatedAt: new Date().toISOString(), confidenceScore: 0.64 },
    { code: "ID", country: "Indonesia", active: 20054, deaths: 162063, cases: 6829387, updatedAt: new Date().toISOString(), confidenceScore: 0.64 },
    { code: "PK", country: "Pakistan", active: 12583, deaths: 30664, cases: 1581970, updatedAt: new Date().toISOString(), confidenceScore: 0.64 },
    { code: "NG", country: "Nigeria", active: 4080, deaths: 3155, cases: 267188, updatedAt: new Date().toISOString(), confidenceScore: 0.64 }
  ],
  trendSeries: [
    { date: "2026-02-27", cases: 704091233, deaths: 7002400 },
    { date: "2026-02-28", cases: 704232104, deaths: 7003907 },
    { date: "2026-03-01", cases: 704355887, deaths: 7005268 },
    { date: "2026-03-02", cases: 704489552, deaths: 7007021 },
    { date: "2026-03-03", cases: 704612014, deaths: 7008891 },
    { date: "2026-03-04", cases: 704753890, deaths: 7010681 }
  ]
};
