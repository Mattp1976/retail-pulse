"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { WORLDVIEWS } from "../lib/vocab";

export default function TopBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const worldview = searchParams.get("worldview") ?? "uk";

  function setWorldview(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("worldview", next);
    router.push("/?" + params.toString());
  }

  return (
    <header className="glass sticky top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div>
          <h1 className="font-display text-xl tracking-tight">Retail Pulse</h1>
          <p className="text-[11px] text-slate">Operator-facing news and signals</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/sources"
            className="rounded-full border border-line bg-white/70 px-3 py-1 text-[11px] text-slate hover:text-ink"
          >
            Sources
          </Link>
          <div className="flex items-center gap-2">
            <label className="text-[11px] uppercase tracking-wide text-slate">Worldview</label>
            <select
              value={worldview}
              onChange={(e) => setWorldview(e.target.value)}
              className="rounded-full border border-line bg-white/70 px-3 py-1 text-[11px]"
            >
              {WORLDVIEWS.map((w) => (
                <option key={w} value={w}>{w.replace("_", " ")}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
