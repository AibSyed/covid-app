"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import { useState } from "react";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  primaryColor: "teal",
  fontFamily: "var(--font-body), sans-serif",
  headings: { fontFamily: "var(--font-display), sans-serif" },
  defaultRadius: "md",
  colors: {
    slate: [
      "#f8fafc",
      "#eef2f7",
      "#dfe7f1",
      "#c6d4e3",
      "#a6bacf",
      "#879fb9",
      "#6f89a7",
      "#5f7492",
      "#52647f",
      "#2e4055",
    ],
  },
});

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 3,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
}
