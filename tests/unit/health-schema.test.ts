import { describe, expect, it } from "vitest";
import { healthSignalPayloadSchema } from "@/features/health/schema";

describe("healthSignalPayloadSchema", () => {
  it("accepts validated health payloads", () => {
    const result = healthSignalPayloadSchema.safeParse({
      globalMetrics: [
        { id: "active", label: "Active", value: 100, unit: "people", trend: "up", source: "test", freshnessHours: 3 },
      ],
      regionComparison: [
        { country: "US", population: 1000, active: 20, recovered: 900, deaths: 80, updatedAt: "2026-03-01T00:00:00Z" },
      ],
      sourceStatus: [{ name: "provider", healthy: true, message: "ok" }],
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid signal entries", () => {
    const result = healthSignalPayloadSchema.safeParse({
      globalMetrics: [{ id: "x", label: "bad", value: "oops" }],
      regionComparison: [],
      sourceStatus: [],
    });

    expect(result.success).toBe(false);
  });
});
