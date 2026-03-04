"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Badge, Button, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArrowNarrowRight, IconCalendarStats } from "@tabler/icons-react";
import type { TrendPoint } from "@/features/signals/schema";

const AreaChart = dynamic(() => import("@mantine/charts").then((mod) => mod.AreaChart), { ssr: false });

type TrendsWorkspaceProps = {
  trendSeries: TrendPoint[];
  freshnessHours: number;
  confidenceScore: number;
};

export function TrendsWorkspace({ trendSeries, freshnessHours, confidenceScore }: TrendsWorkspaceProps) {
  const deltas = useMemo(() => {
    return trendSeries.slice(1).map((entry, index) => {
      const prev = trendSeries[index];
      return {
        date: entry.date,
        casesDelta: entry.cases - prev.cases,
        deathsDelta: entry.deaths - prev.deaths,
      };
    });
  }, [trendSeries]);

  return (
    <Stack gap="lg">
      <Card withBorder radius="xl" bg="white" shadow="sm">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <div>
            <Text c="teal.7" tt="uppercase" fw={700} size="xs" style={{ letterSpacing: 2 }}>
              Trend Workspace
            </Text>
            <Title order={2} mt={6} c="slate.9">Timeline Drift and Recency Intelligence</Title>
            <Text mt={8} c="slate.7" maw={720}>
              Review daily movement to detect acceleration patterns. This view favors fast scanability for
              operator briefings.
            </Text>
          </div>
          <Group gap="xs">
            <Badge variant="light" color="teal">{freshnessHours}h fresh</Badge>
            <Badge variant="light" color="blue">{Math.round(confidenceScore * 100)}% confidence</Badge>
          </Group>
        </Group>
      </Card>

      <Card withBorder radius="lg" bg="white">
        <Group justify="space-between" mb="sm">
          <Title order={4} c="slate.9">Cases vs Deaths (7-day)</Title>
          <IconCalendarStats size={18} color="#0f766e" />
        </Group>
        <AreaChart
          h={340}
          data={trendSeries}
          dataKey="date"
          series={[
            { name: "cases", color: "teal.6" },
            { name: "deaths", color: "red.6" },
          ]}
          curveType="linear"
          withLegend
          tickLine="none"
        />
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {deltas.map((entry) => (
          <Card key={entry.date} withBorder radius="md" bg="gray.0">
            <Text fw={700} c="slate.9">{entry.date}</Text>
            <Text mt={4} c="slate.7">Cases delta: {entry.casesDelta.toLocaleString()}</Text>
            <Text c="slate.7">Deaths delta: {entry.deathsDelta.toLocaleString()}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <Group>
        <Button component={Link} href="/" rightSection={<IconArrowNarrowRight size={14} />}>
          Back to command center
        </Button>
        <Button component={Link} href="/sources" variant="light" rightSection={<IconArrowNarrowRight size={14} />}>
          Open source diagnostics
        </Button>
      </Group>
    </Stack>
  );
}
