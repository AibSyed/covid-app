import { Container } from "@mantine/core";
import { SourceDiagnostics } from "@/components/dashboard/source-diagnostics";
import { getDashboardSignals } from "@/lib/domain/signals";

export default async function SourcesPage() {
  const payload = await getDashboardSignals();

  return (
    <main id="main-content">
      <Container size="xl" py={{ base: 52, md: 64 }}>
        <SourceDiagnostics payload={payload} />
      </Container>
    </main>
  );
}
