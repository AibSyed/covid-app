"use client";

import Link from "next/link";
import type { Route } from "next";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconArrowNarrowRight,
  IconDatabase,
  IconHeartbeat,
  IconShieldCheck,
  IconStatusChange,
} from "@tabler/icons-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { dashboardResponseSchema, type DashboardResponse, type RegionSnapshot } from "@/features/signals/schema";

const AreaChart = dynamic(() => import("@mantine/charts").then((mod) => mod.AreaChart), { ssr: false });

const columnHelper = createColumnHelper<RegionSnapshot>();
const columns = [
  columnHelper.accessor("country", { header: "Country" }),
  columnHelper.accessor("active", { header: "Active", cell: (ctx) => ctx.getValue().toLocaleString() }),
  columnHelper.accessor("deaths", { header: "Deaths", cell: (ctx) => ctx.getValue().toLocaleString() }),
  columnHelper.accessor("confidenceScore", {
    header: "Confidence",
    cell: (ctx) => `${Math.round(ctx.getValue() * 100)}%`,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated",
    cell: (ctx) => dayjs(ctx.getValue()).format("MMM D, YYYY HH:mm"),
  }),
];

async function fetchSignals() {
  const response = await fetch("/api/signals");
  if (!response.ok) {
    throw new Error("Signals unavailable");
  }
  const payload = (await response.json()) as DashboardResponse;
  return dashboardResponseSchema.parse(payload);
}

export function CommandCenter() {
  const [filter, setFilter] = useState("");
  const query = useQuery({ queryKey: ["dashboard-signals"], queryFn: fetchSignals });

  const tableData = useMemo(() => query.data?.regionSeries ?? [], [query.data]);

  // TanStack Table remains the table engine, while Mantine handles visual rendering.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _, value) => row.original.country.toLowerCase().includes(String(value).toLowerCase()),
  });

  return (
    <Stack gap="lg">
      <Card withBorder radius="xl" bg="white" shadow="sm">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <div>
            <Text c="teal.7" tt="uppercase" fw={700} size="xs" style={{ letterSpacing: 2 }}>
              Operational Command Layer
            </Text>
            <Title order={2} mt={6} c="slate.9">Global Health Signal Command Center</Title>
            <Text mt={8} c="slate.7" maw={760}>
              Rapid region-level scan experience with explicit freshness, confidence, provider-health telemetry,
              and controlled fallback behavior when primary providers degrade.
            </Text>
          </div>
          <Stack align="flex-end" gap="xs">
            <Badge color={query.data?.fallbackUsed ? "orange" : "teal"} variant="light" size="lg">
              {query.data?.fallbackUsed ? "Fallback Mode" : "Primary Live"}
            </Badge>
            <Group gap="xs">
              <Button component={Link} href="/trends" size="xs" variant="light" rightSection={<IconArrowNarrowRight size={14} />}>
                Trends
              </Button>
              <Button component={Link} href="/sources" size="xs" variant="light" rightSection={<IconArrowNarrowRight size={14} />}>
                Sources
              </Button>
            </Group>
          </Stack>
        </Group>
      </Card>

      {query.isPending && (
        <Paper withBorder p="xl" radius="md" bg="white">
          <Group>
            <Loader size="sm" />
            <Text c="slate.8">Collecting global signal layers...</Text>
          </Group>
        </Paper>
      )}

      {query.isError && (
        <Alert icon={<IconAlertTriangle size={16} />} color="red" variant="light" title="Signal fetch error">
          Unable to retrieve command-center feed.
        </Alert>
      )}

      {query.data && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
          <Stack gap="lg">
            <SimpleGrid cols={{ base: 1, md: 3 }}>
              {query.data.globalMetrics.map((metric) => (
                <Card key={metric.id} withBorder radius="lg" bg="white">
                  <Text size="xs" c="slate.6" tt="uppercase" fw={700} style={{ letterSpacing: 1.5 }}>
                    {metric.label}
                  </Text>
                  <Title order={3} mt={8} c="slate.9">{metric.value.toLocaleString()}</Title>
                  <Text size="sm" c="slate.7" mt={4}>{metric.unit}</Text>
                  <Group mt={10} gap="xs">
                    <Badge variant="light" color="teal">{metric.freshnessHours}h fresh</Badge>
                    <Badge variant="light" color="blue">{Math.round(metric.confidenceScore * 100)}% confidence</Badge>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>

            <Grid>
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Card withBorder radius="lg" bg="white">
                  <Group justify="space-between" mb="sm">
                    <Title order={4} c="slate.9">Global Trend Drift</Title>
                    <Badge leftSection={<IconStatusChange size={14} />} variant="light" color="indigo">
                      7-day horizon
                    </Badge>
                  </Group>
                  <AreaChart
                    h={320}
                    data={query.data.trendSeries}
                    dataKey="date"
                    series={[
                      { name: "cases", color: "teal.6" },
                      { name: "deaths", color: "red.6" },
                    ]}
                    curveType="natural"
                    tickLine="none"
                    withLegend
                  />
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Card withBorder radius="lg" bg="white" h="100%">
                  <Title order={4} c="slate.9">Provider Health</Title>
                  <Stack mt="md">
                    {query.data.providerHealth.map((source) => (
                      <Paper key={source.name} withBorder p="sm" radius="md" bg="gray.0">
                        <Group justify="space-between" align="center">
                          <Group gap="xs">
                            {source.healthy ? (
                              <IconShieldCheck size={16} color="#0f766e" />
                            ) : (
                              <IconAlertTriangle size={16} color="#f59e0b" />
                            )}
                            <Text fw={600} c="slate.9">{source.name}</Text>
                          </Group>
                          <Badge variant="light" color={source.healthy ? "teal" : "yellow"}>
                            {source.latencyMs}ms
                          </Badge>
                        </Group>
                        <Text size="sm" mt={6} c="slate.7">{source.message}</Text>
                      </Paper>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>

            <Card withBorder radius="lg" bg="white">
              <Group justify="space-between" mb="sm" align="flex-end" wrap="wrap" gap="sm">
                <Title order={4} c="slate.9">Regional Comparison Grid</Title>
                <TextInput
                  placeholder="Filter country"
                  value={filter}
                  onChange={(event) => setFilter(event.currentTarget.value)}
                  leftSection={<IconHeartbeat size={15} />}
                  w={260}
                />
              </Group>

              <Table striped highlightOnHover verticalSpacing="sm" horizontalSpacing="md" withColumnBorders>
                <Table.Thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Table.Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Table.Th>
                      ))}
                    </Table.Tr>
                  ))}
                </Table.Thead>
                <Table.Tbody>
                  {table.getRowModel().rows.map((row) => (
                    <Table.Tr key={row.id}>
                      {row.getVisibleCells().map((cell, index) => (
                        <Table.Td key={cell.id}>
                          {index === 0 ? (
                            <Button
                              component={Link}
                              href={`/regions/${row.original.code.toLowerCase()}` as Route}
                              variant="subtle"
                              size="xs"
                            >
                              {row.original.country}
                            </Button>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </Table.Td>
                      ))}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>

            <Paper withBorder radius="lg" p="md" bg="white">
              <Group gap="xs"><IconDatabase size={16} /><Text fw={700}>Contract state</Text></Group>
              <Text mt={6} size="sm" c="slate.7">
                Source: {query.data.source} · Freshness: {query.data.freshnessHours}h · Partial:
                {` ${String(query.data.partialData)} `}· Generated: {dayjs(query.data.generatedAt).format("MMM D, YYYY HH:mm")}
              </Text>
            </Paper>
          </Stack>
        </motion.div>
      )}
    </Stack>
  );
}
