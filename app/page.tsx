import { Container } from "@mantine/core";
import { CommandCenter } from "@/components/dashboard/command-center";

export default function HomePage() {
  return (
    <main id="main-content">
      <Container size="xl" py={{ base: 52, md: 64 }}>
        <CommandCenter />
      </Container>
    </main>
  );
}
