import { apiUrl } from "@/lib/api";

export async function POST(request: Request) {
  const target = apiUrl("/api/v1/analytics/events");
  if (!target) {
    return new Response(null, { status: 204 });
  }

  const body = await request.text();
  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });
    return new Response(null, { status: response.status });
  } catch {
    return new Response(null, { status: 502 });
  }
}
