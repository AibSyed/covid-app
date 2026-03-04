import type { Metadata } from "next";
import { IBM_Plex_Sans, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/app/globals.css";

const heading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const body = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Health Signal Dashboard",
  description: "Global health signal intelligence with provider-aware resilience and confidence indicators.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
