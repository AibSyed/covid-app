import { notFound } from "next/navigation";
import { Container } from "@mantine/core";
import { RegionBrief } from "@/components/dashboard/region-brief";
import { getDashboardSignals } from "@/lib/domain/signals";

export default async function RegionPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const payload = await getDashboardSignals();
  const region = payload.regionSeries.find((entry) => entry.code.toLowerCase() === code.toLowerCase());

  if (!region) {
    notFound();
  }

  return (
    <main id="main-content">
      <Container size="xl" py={{ base: 52, md: 64 }}>
        <RegionBrief region={region} freshnessHours={payload.freshnessHours} source={payload.source} />
      </Container>
    </main>
  );
}
