"use client";

import Link from "next/link";
import type { Route } from "next";
import { Badge, Button, Card, Group, Stack, Table, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconShieldCheck } from "@tabler/icons-react";
import type { DashboardResponse } from "@/features/signals/schema";

type SourceDiagnosticsProps = {
  payload: DashboardResponse;
};

export function SourceDiagnostics({ payload }: SourceDiagnosticsProps) {
  return (
    <Stack gap="lg">
      <Card withBorder radius="xl" bg="white" shadow="sm">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <div>
            <Text c="teal.7" tt="uppercase" fw={700} size="xs" style={{ letterSpacing: 2 }}>
              Source Diagnostics
            </Text>
            <Title order={2} mt={6} c="slate.9">Provider Reliability and Contract Health</Title>
            <Text mt={8} c="slate.7" maw={740}>
              This route audits provider latency, health, fallback engagement, and current contract-level metadata.
            </Text>
          </div>
          <Group gap="xs">
            <Badge color={payload.fallbackUsed ? "orange" : "teal"} variant="light">
              {payload.fallbackUsed ? "Fallback engaged" : "Primary live"}
            </Badge>
            <Badge variant="light" color="blue">{payload.freshnessHours}h freshness</Badge>
          </Group>
        </Group>
      </Card>

      <Card withBorder radius="lg" bg="white">
        <Title order={4} c="slate.9">Provider matrix</Title>
        <Table mt="md" striped withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Provider</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Latency</Table.Th>
              <Table.Th>Message</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payload.providerHealth.map((provider) => (
              <Table.Tr key={provider.name}>
                <Table.Td>{provider.name}</Table.Td>
                <Table.Td>
                  <Group gap={6}>
                    {provider.healthy ? (
                      <IconShieldCheck size={16} color="#0f766e" />
                    ) : (
                      <IconAlertTriangle size={16} color="#d97706" />
                    )}
                    <Text>{provider.healthy ? "healthy" : "degraded"}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>{provider.latencyMs}ms</Table.Td>
                <Table.Td>{provider.message}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Card withBorder radius="lg" bg="white">
        <Title order={4} c="slate.9">Contract metadata</Title>
        <Text mt={8} c="slate.7">Generated: {new Date(payload.generatedAt).toLocaleString()}</Text>
        <Text c="slate.7">Source: {payload.source}</Text>
        <Text c="slate.7">Partial data: {String(payload.partialData)}</Text>
      </Card>

      <Group>
        <Button component={Link} href={"/" as Route}>Back to command center</Button>
        <Button component={Link} href={"/trends" as Route} variant="light">Open trend workspace</Button>
      </Group>
    </Stack>
  );
}
