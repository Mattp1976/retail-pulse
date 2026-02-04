"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import {
    SEGMENTS,
    OPERATOR_FUNCTIONS,
    OPERATIONAL_THEMES,
    IMPACT_AREAS,
    GEOGRAPHY
} from "../lib/vocab";

export default function FilterSidebar() {
    const router = useRouter();
    const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") ?? "");

  const selections = useMemo(() => {
        const getAll = (key: string) => params.getAll(key);
        return {
                segments: getAll("segments"),
                operator_functions: getAll("operator_functions"),
                operational_themes: getAll("operational_themes"),
                impact_areas: getAll("impact_areas"),
                geography: getAll("geography")
        };
  }, [params]);

  function toggle(key: string, value: string) {
        const next = new URLSearchParams(params.toString());
        const values = next.getAll(key);
        if (values.includes(value)) {
                next.delete(key);
                values.filter((v) => v !== value).forEach((v) => next.append(key, v));
        } else {
                next.append(key, value);
        }
        router.push("/?" + next.toString());
  }

  function setParam(key: string, value: string) {
        const next = new URLSearchParams(params.toString());
        next.set(key, value);
        router.push("/?" + next.toString());
  }

  function clearFilters() {
        const next = new URLSearchParams();
        const worldview = params.get("worldview");
        if (worldview) next.set("worldview", worldview);
        router.push("/?" + next.toString());
  }

  return (
        <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-ink">Filters</h2>
                      <button onClick={clearFilters} className="text-xs text-slate underline">Clear</button>
              </div>
              <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate">Search</label>
                      <input
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                  onBlur={() => setParam("search", search)}
                                  placeholder="Headline or snippet"
                                  className="mt-1 w-full rounded-xl border border-line bg-white/90 px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-accent/30"
                                />
              </div>
        
              <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate">Time range</label>
                      <Segmented
                                  value={params.get("sinceHours") ?? "24"}
                                  options={[
                                    { label: "24h", value: "24" },
                                    { label: "7d", value: "168" },
                                    { label: "30d", value: "720" }
                                              ]}
                                  onChange={(value) => setParam("sinceHours", value)}
                                />
              </div>
        
              <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate">Sort</label>
                      <Segmented
                                  value={params.get("sort") ?? "impact"}
                                  options={[
                                    { label: "Impact", value: "impact" },
                                    { label: "Newest", value: "newest" }
                                              ]}
                                  onChange={(value) => setParam("sort", value)}
                                />
              </div>
        
              <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate">Min impact</label>
                      <Segmented
                                  value={params.get("minImpact") ?? "0"}
                                  options={[
                                    { label: "Any", value: "0" },
                                    { label: "3+", value: "3" },
                                    { label: "4+", value: "4" },
                                    { label: "5", value: "5" }
                                              ]}
                                  onChange={(value) => setParam("minImpact", value)}
                                />
              </div>
        
              <div className="h-px bg-line/70" />
        
              <FilterGroup title="Segments" items={SEGMENTS as unknown as string[]} selected={selections.segments} onToggle={(v) => toggle("segments", v)} />
              <FilterGroup title="Operator functions" items={OPERATOR_FUNCTIONS as unknown as string[]} selected={selections.operator_functions} onToggle={(v) => toggle("operator_functions", v)} />
              <FilterGroup title="Operational themes" items={OPERATIONAL_THEMES as unknown as string[]} selected={selections.operational_themes} onToggle={(v) => toggle("operational_themes", v)} />
              <FilterGroup title="Impact areas" items={IMPACT_AREAS as unknown as string[]} selected={selections.impact_areas} onToggle={(v) => toggle("impact_areas", v)} />
              <FilterGroup title="Geography" items={GEOGRAPHY as unknown as string[]} selected={selections.geography} onToggle={(v) => toggle("geography", v)} />
              <p className="text-[11px] text-slate">If not set, geography defaults to the worldview.</p>
        </div>
      );
}

function Segmented({
    value,
    options,
    onChange
}: {
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
}) {
    return (
          <div className="segmented mt-2">
            {options.map((opt) => (
                    <button
                                key={opt.value}
                                type="button"
                                onClick={() => onChange(opt.value)}
                                className={clsx(value === opt.value && "active")}
                              >
                      {opt.label}
                    </button>
                  ))}
          </div>
        );
}

function FilterGroup({
    title,
    items,
    selected,
    onToggle
}: {
    title: string;
    items: string[];
    selected: string[];
    onToggle: (value: string) => void;
}) {
    return (
          <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate">{title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {items.map((x) => {
                      const active = selected.includes(x);
                      return (
                                    <button
                                                    key={x}
                                                    onClick={() => onToggle(x)}
                                                    className={clsx(
                                                                      "chip transition",
                                                                      active && "chip-strong"
                                                                    )}
                                                  >
                                      {x.replace(/_/g, " ")}
                                    </button>
                                  );
          })}
                </div>
          </div>
        );
}
