import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Providers } from "@/components/providers";
import "@/app/globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Global Health Signal Command",
  description: "Operational dashboard for regional health telemetry with confidence and freshness controls.",
  metadataBase: new URL("https://covid-app-woad.vercel.app"),
  icons: { icon: "/icon", apple: "/apple-icon" },
  openGraph: {
    title: "Global Health Signal Command",
    description: "Operational dashboard for regional health telemetry.",
    images: "/opengraph-image",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Health Signal Command",
    description: "Operational dashboard for regional health telemetry.",
    images: "/twitter-image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps} className={`${display.variable} ${body.variable}`}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
