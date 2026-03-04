import { afterEach, describe, expect, it, vi } from "vitest";
import { dashboardResponseSchema } from "@/features/signals/schema";
import { fallbackDashboard } from "@/features/signals/fallback";
import { getDashboardSignals } from "@/lib/domain/signals";

vi.mock("@/lib/api/providers/disease-sh", () => ({
  fetchDiseaseShDashboard: vi.fn(),
}));

import { fetchDiseaseShDashboard } from "@/lib/api/providers/disease-sh";

describe("signals contracts", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("validates fallback payload", () => {
    const parsed = dashboardResponseSchema.parse(fallbackDashboard);
    expect(parsed.globalMetrics.length).toBeGreaterThan(0);
    expect(parsed.regionSeries.length).toBeGreaterThan(0);
    expect(parsed.source).toBe("fallback");
  });

  it("falls back when provider fails", async () => {
    vi.mocked(fetchDiseaseShDashboard).mockRejectedValue(new Error("provider down"));

    const payload = await getDashboardSignals();
    expect(payload.source).toBe("fallback");
    expect(payload.fallbackUsed).toBe(true);
  });
});
