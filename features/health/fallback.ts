import type { HealthSignalPayload } from "./schema";

export const fallbackHealthSignals: HealthSignalPayload = {
  globalMetrics: [
    { id: "active", label: "Active Cases", value: 18234567, unit: "people", trend: "down", source: "snapshot", freshnessHours: 12 },
    { id: "deaths", label: "Total Deaths", value: 7021034, unit: "people", trend: "stable", source: "snapshot", freshnessHours: 12 },
    { id: "vaccinations", label: "Vaccinations", value: 13923012345, unit: "doses", trend: "up", source: "snapshot", freshnessHours: 24 }
  ],
  regionComparison: [
    { country: "United States", population: 331000000, active: 51234, recovered: 102345001, deaths: 1122403, updatedAt: "2026-03-01T00:00:00Z" },
    { country: "Japan", population: 125000000, active: 10321, recovered: 33854211, deaths: 74694, updatedAt: "2026-03-01T00:00:00Z" },
    { country: "Brazil", population: 214000000, active: 22310, recovered: 37244303, deaths: 703399, updatedAt: "2026-03-01T00:00:00Z" }
  ],
  sourceStatus: [
    { name: "disease.sh", healthy: false, message: "Using validated fallback snapshot" },
    { name: "internal-cache", healthy: true, message: "Fallback cache available" }
  ]
};
