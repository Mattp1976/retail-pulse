import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

type FeedParams = {
    worldview: string;
    search: string;
    sinceHours: number;
    sort: string;
    minImpact: number;
    segments: string[];
    operator_functions: string[];
    operational_themes: string[];
    impact_areas: string[];
    geography: string[];
};

export async function getFeed(params: FeedParams) {
    const since = new Date(Date.now() - params.sinceHours * 60 * 60 * 1000);
    const geographyFilter = params.geography.length ? params.geography : defaultGeography(params.worldview);

  const rows = await prisma.article.findMany({
        where: {
                publishedAt: { gte: since },
                source: { worldview: params.worldview },
                // enrichment: { not: Prisma.DbNull } // Commented out to show non-enriched articles
        },
        include: { source: true },
        orderBy: { publishedAt: "desc" },
        take: 500
  });

  const filtered = rows.filter((a) => {
        const e: any = a.enrichment;
        if (!e) return false;

                                   const searchText = (a.title + " " + (a.snippet ?? "")).toLowerCase();
        if (params.search && !searchText.includes(params.search.toLowerCase())) return false;

                                   if (params.minImpact && e.impact_score < params.minImpact) return false;

                                   if (params.segments.length && !overlap(e.segments, params.segments)) return false;
        if (params.operator_functions.length && !overlap(e.operator_functions, params.operator_functions)) return false;
        if (params.operational_themes.length && !overlap(e.operational_themes, params.operational_themes)) return false;
        if (params.impact_areas.length && !overlap(e.impact_areas, params.impact_areas)) return false;
        if (geographyFilter.length && !overlap(e.geography, geographyFilter)) return false;

                                   return true;
  });

  const sorted =
        params.sort === "newest"
        ? filtered
          : filtered.sort((a: any, b: any) => {
                      const ai = a.enrichment?.impact_score ?? 0;
                      const bi = b.enrichment?.impact_score ?? 0;
                      if (ai !== bi) return bi - ai;
                      const aw = a.source?.weight ?? 0;
                      const bw = b.source?.weight ?? 0;
                      if (aw !== bw) return bw - aw;
                      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          });

  return { items: sorted };
}

function overlap(a: string[], b: string[]) {
    return a.some((x) => b.includes(x));
}

function defaultGeography(worldview: string) {
    if (worldview === "global") return [];
    return [worldview];
}
