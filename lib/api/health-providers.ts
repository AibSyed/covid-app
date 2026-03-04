import { fallbackHealthSignals } from "@/features/health/fallback";
import { healthSignalPayloadSchema, type HealthSignalPayload } from "@/features/health/schema";
import { fetchWithTimeout } from "@/lib/http";

type DiseaseGlobal = { cases: number; active: number; deaths: number; updated: number };
type DiseaseCountry = {
  country: string;
  population: number;
  active: number;
  recovered: number;
  deaths: number;
  updated: number;
};

function toIso(timestamp: number) {
  return new Date(timestamp).toISOString();
}

export async function getHealthSignals(): Promise<HealthSignalPayload> {
  try {
    const [globalRes, countriesRes] = await Promise.all([
      fetchWithTimeout("https://disease.sh/v3/covid-19/all", {}, 7000),
      fetchWithTimeout("https://disease.sh/v3/covid-19/countries?allowNull=false", {}, 7000),
    ]);

    if (!globalRes.ok || !countriesRes.ok) {
      throw new Error("Provider unhealthy");
    }

    const global = (await globalRes.json()) as DiseaseGlobal;
    const countries = (await countriesRes.json()) as DiseaseCountry[];

    const payload: HealthSignalPayload = {
      globalMetrics: [
        {
          id: "active",
          label: "Active Cases",
          value: global.active,
          unit: "people",
          trend: "stable",
          source: "disease.sh",
          freshnessHours: 6,
        },
        {
          id: "deaths",
          label: "Total Deaths",
          value: global.deaths,
          unit: "people",
          trend: "stable",
          source: "disease.sh",
          freshnessHours: 6,
        },
        {
          id: "cases",
          label: "Total Cases",
          value: global.cases,
          unit: "people",
          trend: "stable",
          source: "disease.sh",
          freshnessHours: 6,
        },
      ],
      regionComparison: countries
        .sort((a, b) => b.population - a.population)
        .slice(0, 8)
        .map((country) => ({
          country: country.country,
          population: country.population,
          active: country.active,
          recovered: country.recovered,
          deaths: country.deaths,
          updatedAt: toIso(country.updated),
        })),
      sourceStatus: [
        { name: "disease.sh", healthy: true, message: "Primary source healthy" },
        { name: "internal-cache", healthy: true, message: "In-memory validation active" },
      ],
    };

    const parsed = healthSignalPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new Error("Schema validation failed");
    }

    return parsed.data;
  } catch {
    return fallbackHealthSignals;
  }
}
