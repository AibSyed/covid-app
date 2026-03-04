import { z } from "zod";

export const metricSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  unit: z.string(),
  trend: z.enum(["up", "down", "stable"]),
  source: z.string(),
  freshnessHours: z.number().int().nonnegative(),
});

export const regionSchema = z.object({
  country: z.string(),
  population: z.number().int().nonnegative(),
  active: z.number().int().nonnegative(),
  recovered: z.number().int().nonnegative(),
  deaths: z.number().int().nonnegative(),
  updatedAt: z.string(),
});

export const healthSignalPayloadSchema = z.object({
  globalMetrics: z.array(metricSchema),
  regionComparison: z.array(regionSchema),
  sourceStatus: z.array(
    z.object({
      name: z.string(),
      healthy: z.boolean(),
      message: z.string(),
    }),
  ),
});

export type HealthSignalPayload = z.infer<typeof healthSignalPayloadSchema>;
