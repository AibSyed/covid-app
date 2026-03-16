"use client";

import Link from "next/link";
import type { Route } from "next";
import { Badge, Button, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { RegionSnapshot } from "@/features/signals/schema";

type RegionBriefProps = {
  region: RegionSnapshot;
  freshnessHours: number;
  source: string;
};

export function RegionBrief({ region, freshnessHours, source }: RegionBriefProps) {
  return (
    <Stack gap="lg">
      <Card withBorder radius="xl" bg="white" shadow="sm">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <div>
            <Text c="teal.7" tt="uppercase" fw={700} size="xs" style={{ letterSpacing: 2 }}>
              Region Command Brief
            </Text>
            <Title order={2} mt={6} c="slate.9">{region.country} Signal Profile</Title>
            <Text mt={8} c="slate.7" maw={720}>
              Region-level snapshot optimized for rapid triage: load, severity, confidence, and recency in one panel.
            </Text>
          </div>
          <Group gap="xs">
            <Badge variant="light" color="teal">{freshnessHours}h fresh</Badge>
            <Badge variant="light" color="blue">{Math.round(region.confidenceScore * 100)}% confidence</Badge>
            <Badge variant="light" color="gray">{source}</Badge>
          </Group>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 3 }}>
        <Card withBorder radius="lg" bg="white">
          <Text size="xs" tt="uppercase" c="slate.6" fw={700}>Total cases</Text>
          <Title mt={8} order={3} c="slate.9">{region.cases.toLocaleString()}</Title>
        </Card>
        <Card withBorder radius="lg" bg="white">
          <Text size="xs" tt="uppercase" c="slate.6" fw={700}>Active cases</Text>
          <Title mt={8} order={3} c="slate.9">{region.active.toLocaleString()}</Title>
        </Card>
        <Card withBorder radius="lg" bg="white">
          <Text size="xs" tt="uppercase" c="slate.6" fw={700}>Deaths</Text>
          <Title mt={8} order={3} c="slate.9">{region.deaths.toLocaleString()}</Title>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="lg" bg="white">
        <Title order={4} c="slate.9">Operational notes</Title>
        <Text mt={8} c="slate.7">
          Updated at {new Date(region.updatedAt).toLocaleString()}. For cross-region comparisons, return to the
          command center table and open additional region briefs.
        </Text>
      </Card>

      <Group>
        <Button component={Link} href={"/" as Route}>Back to command center</Button>
        <Button component={Link} href={"/trends" as Route} variant="light">Open trend workspace</Button>
      </Group>
    </Stack>
  );
}
