import { z } from "zod";

export const sourceHealthSchema = z.object({
  name: z.string(),
  healthy: z.boolean(),
  latencyMs: z.number().min(0),
  message: z.string(),
});

export const globalMetricSchema = z.object({
  id: z.enum(["cases", "active", "deaths"]),
  label: z.string(),
  value: z.number(),
  unit: z.string(),
  freshnessHours: z.number().min(0),
  confidenceScore: z.number().min(0).max(1),
});

export const regionSnapshotSchema = z.object({
  code: z.string(),
  country: z.string(),
  active: z.number(),
  deaths: z.number(),
  cases: z.number(),
  updatedAt: z.string(),
  confidenceScore: z.number().min(0).max(1),
});

export const trendPointSchema = z.object({
  date: z.string(),
  cases: z.number(),
  deaths: z.number(),
});

export const dashboardResponseSchema = z.object({
  generatedAt: z.string(),
  source: z.enum(["disease.sh", "fallback"]),
  fallbackUsed: z.boolean(),
  freshnessHours: z.number().min(0),
  partialData: z.boolean(),
  providerHealth: z.array(sourceHealthSchema),
  globalMetrics: z.array(globalMetricSchema),
  regionSeries: z.array(regionSnapshotSchema),
  trendSeries: z.array(trendPointSchema),
});

export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;
export type RegionSnapshot = z.infer<typeof regionSnapshotSchema>;
export type TrendPoint = z.infer<typeof trendPointSchema>;
