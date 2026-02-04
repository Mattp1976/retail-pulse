import Link from "next/link";
import { formatDate } from "../lib/format";
import Badge from "./Badge";

export default function FeedCard({ item }: { item: any }) {
    const e = item.enrichment;
    return (
          <Link href={`/story/${item.id}`} className="block px-2 py-4 transition hover:bg-white/50">
                <div className="flex items-start gap-3">
                        <div className="min-w-[72px] text-center">
                                  <div className="rounded-xl border border-line bg-white/90 px-2 py-2">
                                              <p className="text-[10px] uppercase tracking-wide text-slate">Impact</p>p>
                                              <p className="mt-1 text-xl font-semibold text-ink">{e?.impact_score ?? "-"}</p>p>
                                  </div>div>
                                  <div className="mt-2 text-[11px] text-slate">
                                              <p>Horizon: {e?.time_horizon ?? "-"}</p>p>
                                              <p>Confidence: {e?.confidence ?? "-"}</p>p>
                                  </div>div>
                        </div>div>
                        <div className="flex-1">
                                  <div className="flex items-center justify-between text-[11px] text-slate">
                                              <span>{item.source?.name}</span>span>
                                              <span>{formatDate(item.publishedAt)}</span>span>
                                  </div>div>
                                  <h3 className="mt-1 text-[17px] font-semibold text-ink">{item.title}</h3>h3>
                                  <p className="mt-1 text-[13px] text-slate">{e?.what_happened}</p>p>
                                  <p className="mt-1 text-[13px] text-slate">{e?.why_it_matters_operator}</p>p>
                        
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                              <Badge label={`Impact ${e?.impact_score ?? "-"}`} tone="strong" />
                                    {e?.impact_areas?.slice(0, 3).map((a: string) => (
                          <Badge key={a} label={a.replace(/_/g, " ")} />
                        ))}
                                  </div>div>
                        </div>div>
                </div>div>
          </Link>Link>
        );
}</Link>
