"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FeedCard from "./FeedCard";

type FeedItem = {
      id: string;
      title: string;
      url: string;
      publishedAt: string;
      snippet: string | null;
      source: { name: string };
      enrichment: any;
};

export default function Feed() {
      const params = useSearchParams();
      const [items, setItems] = useState<FeedItem[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const worldview = params.get("worldview") ?? "uk";

  useEffect(() => {
          async function load() {
                    setLoading(true);
                    setError("");
                    const res = await fetch("/api/feed?" + params.toString());
                    if (!res.ok) {
                                setError("Could not load feed");
                                setLoading(false);
                                return;
                    }
                    const data = await res.json();
                    setItems(data.items);
                    setLoading(false);
          }
          load();
  }, [params]);

  if (loading) return <div>Loading feed...</div>;
      if (error) return <div>{error}</div>;
    
      const sinceHours = Number(params.get("sinceHours") ?? "24");
      const sinceLabel = sinceHours === 24 ? "Last 24h" : sinceHours === 168 ? "Last 7d" : "Last 30d";
      const sortLabel = (params.get("sort") ?? "impact") === "impact" ? "Most impactful" : "Newest";
    
      return (
              <div className="space-y-4">
                    <div className="panel flex flex-wrap items-center justify-between gap-3 px-3 py-2 text-[11px] text-slate">
                            <div className="flex flex-wrap items-center gap-2">
                                      <span className="chip">{worldview.replace("_", " ")}</span>
                                      <span className="chip">{sinceLabel}</span>
                                      <span className="chip">{sortLabel}</span>
                                      <span className="chip-strong">Stories: {items.length}</span>
                            </div>
                            <RefreshButton worldview={worldview} />
                    </div>
              
                  {items.length === 0 ? (
                          <p className="text-sm text-slate">No stories match these filters.</p>
                        ) : (
                          <div className="divide-y divide-line/80">
                              {items.map((item) => (
                                          <FeedCard key={item.id} item={item} />
                                        ))}
                          </div>
                    )}
              </div>
            );
}

function RefreshButton({ worldview }: { worldview: string }) {
      const [busy, setBusy] = useState(false);
      const [msg, setMsg] = useState("");
      const ingestToken = process.env.NEXT_PUBLIC_INGEST_TOKEN ?? "";
    
      if (!ingestToken) {
              return <span className="text-[11px] text-slate">Ingestion disabled</span>;
      }
    
      async function run() {
              setBusy(true);
              setMsg("");
              const res = await fetch("/api/ingest/run", {
                        method: "POST",
                        headers: {
                                    "content-type": "application/json",
                                    "authorization": `Bearer ${ingestToken}`
                        },
                        body: JSON.stringify({ worldview })
              });
              if (!res.ok) {
                        setMsg("Refresh failed");
                        setBusy(false);
                        return;
              }
              const data = await res.json();
              setMsg(`Refresh complete. New: ${data.created}, Enriched: ${data.enriched}`);
              setBusy(false);
      }
    
      return (
              <div className="flex items-center gap-3">
                    <button
                                onClick={run}
                                disabled={busy}
                                className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm disabled:opacity-50"
                              >
                        {busy ? "Refreshing..." : "Refresh ingestion"}
                    </button>
                  {msg ? <span className="text-xs text-slate">{msg}</span> : null}
              </div>
            );
}
