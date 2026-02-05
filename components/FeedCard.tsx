import Link from "next/link";
import { formatDate } from "../lib/format";
import clsx from "clsx";

export default function FeedCard({ item }: { item: any }) {
      const e = item.enrichment;
      const impactScore = e?.impact_score ?? 0;
      const isHighImpact = impactScore >= 4;

  return (
          <article className="card animate-in group mb-4">
                <Link
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-5 transition-all duration-250"
                          >
                        <div className="flex gap-4">
                                  <div className="flex-shrink-0">
                                              <div className={clsx("impact-score", isHighImpact && "impact-score-high")}>
                                                  {impactScore || "—"}
                                              </div>
                                      {e && (
                                            <div className="mt-3 space-y-1 text-center">
                                                            <p className="text-small text-apple-text-secondary">{e.time_horizon || "—"}</p>
                                                            <p className="text-small text-apple-text-secondary opacity-70">{e.confidence || "—"}</p>
                                            </div>
                                              )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                              <div className="flex items-center gap-2 text-small text-apple-text-secondary">
                                                            <span className="font-medium">{item.source?.name}</span>
                                                            <span className="opacity-50">•</span>
                                                            <time>{formatDate(item.publishedAt)}</time>
                                              </div>
                                              <h3 className="mt-2 text-headline text-apple-text group-hover:text-apple-accent transition-colors line-clamp-2">
                                                  {item.title}
                                              </h3>
                                      {e?.what_happened && (
                                            <p className="mt-2 text-body text-apple-text-secondary line-clamp-2">{e.what_happened}</p>
                                              )}
                                              <div className="mt-3 flex flex-wrap gap-1.5">
                                                  {e?.impact_areas?.slice(0, 4).map((area: string) => (
                                              <span key={area} className="badge badge-default">{area.replace(/_/g, " ")}</span>
                                            ))}
                                                  {e?.segments?.slice(0, 2).map((segment: string) => (
                                              <span key={segment} className="badge badge-accent">{segment.replace(/_/g, " ")}</span>
                                            ))}
                                              </div>
                                  </div>
                                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                              <svg className="h-5 w-5 text-apple-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                              </svg>
                                  </div>
                        </div>
                </Link>
          </article>
        );
}
    }
