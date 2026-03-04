import { Container } from "@mantine/core";
import { TrendsWorkspace } from "@/components/dashboard/trends-workspace";
import { getDashboardSignals } from "@/lib/domain/signals";

export default async function TrendsPage() {
  const payload = await getDashboardSignals();

  return (
    <main id="main-content">
      <Container size="xl" py={{ base: 52, md: 64 }}>
        <TrendsWorkspace
          trendSeries={payload.trendSeries}
          freshnessHours={payload.freshnessHours}
          confidenceScore={payload.globalMetrics[0]?.confidenceScore ?? 0.6}
        />
      </Container>
    </main>
  );
}
