import { dashboardResponseSchema } from "@/features/signals/schema";
import { fallbackDashboard } from "@/features/signals/fallback";
import { fetchDiseaseShDashboard } from "@/lib/api/providers/disease-sh";

export async function getDashboardSignals() {
  try {
    return dashboardResponseSchema.parse(await fetchDiseaseShDashboard());
  } catch {
    return dashboardResponseSchema.parse({
      ...fallbackDashboard,
      generatedAt: new Date().toISOString(),
    });
  }
}
