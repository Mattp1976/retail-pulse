import { NextRequest, NextResponse } from "next/server";
import { getFeed } from "../../../lib/feed";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

  const sinceRaw = Number(searchParams.get("sinceHours") ?? "24");
    const minImpactRaw = Number(searchParams.get("minImpact") ?? "0");

  const params = {
        worldview: searchParams.get("worldview") ?? "uk",
        search: searchParams.get("search") ?? "",
        sinceHours: Number.isFinite(sinceRaw) && sinceRaw > 0 ? sinceRaw : 24,
        sort: searchParams.get("sort") ?? "impact",
        minImpact: Number.isFinite(minImpactRaw) ? minImpactRaw : 0,
        segments: searchParams.getAll("segments"),
        operator_functions: searchParams.getAll("operator_functions"),
        operational_themes: searchParams.getAll("operational_themes"),
        impact_areas: searchParams.getAll("impact_areas"),
        geography: searchParams.getAll("geography")
  };

  const data = await getFeed(params);
    return NextResponse.json(data);
}
