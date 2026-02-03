import { NextRequest, NextResponse } from "next/server";
import { ingestForWorldview } from "../../../../lib/ingest";
import { WORLDVIEWS, Worldview } from "../../../../lib/vocab";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = auth?.replace("Bearer ", "").trim();
  if (!token || token !== process.env.INGEST_TOKEN) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const requested = String(body?.worldview || "uk");
  const worldview = (WORLDVIEWS as readonly string[]).includes(requested)
    ? (requested as Worldview)
    : "uk";

  try {
    const result = await ingestForWorldview(worldview);
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json({ ok: false, error: "Ingestion failed" }, { status: 500 });
  }
}
