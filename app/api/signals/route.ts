import { getDashboardSignals } from "@/lib/domain/signals";

export async function GET() {
  const result = await getDashboardSignals();
  return Response.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=180, stale-while-revalidate=600",
    },
  });
}
