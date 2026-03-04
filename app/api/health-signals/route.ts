import { getHealthSignals } from "@/lib/api/health-providers";

export async function GET() {
  const payload = await getHealthSignals();
  return Response.json(payload, { status: 200 });
}
