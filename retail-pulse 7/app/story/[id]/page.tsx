import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById } from "../../../lib/db";
import { formatDate } from "../../../lib/format";
import TagList from "../../../components/TagList";
import ImpactCard from "../../../components/ImpactCard";

export default async function StoryDetail({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);
  if (!article || !article.enrichment) {
    notFound();
  }

  const e = article.enrichment as any;

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <Link href="/" className="text-sm text-slate">Back to feed</Link>
          <h1 className="mt-2 font-display text-2xl">{article.title}</h1>
          <p className="mt-2 text-[11px] text-slate uppercase tracking-wide">
            {article.source?.name} · {formatDate(article.publishedAt)}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <section className="surface p-5">
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-slate">Operator summary</h2>
            <div className="mt-4 space-y-4 text-[13px] text-slate">
              <p><strong>What happened:</strong> {e.what_happened}</p>
              <p><strong>Why it matters:</strong> {e.why_it_matters_operator}</p>
              <div>
                <strong>Actions to consider:</strong>
                <ul className="mt-2 list-disc pl-5">
                  {e.actions_to_consider.map((a: string, i: number) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate">Tags</h3>
              <div className="mt-2 space-y-2">
                <TagList label="Impact areas" items={e.impact_areas} />
                <TagList label="Segments" items={e.segments} />
                <TagList label="Operator functions" items={e.operator_functions} />
                <TagList label="Operational themes" items={e.operational_themes} />
                <TagList label="Geography" items={e.geography} />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate">Entities</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {e.entities.map((x: string) => (
                  <span key={x} className="chip">{x}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link href={article.url} target="_blank">Read original source</Link>
            </div>
          </section>

          <aside className="space-y-4">
            <ImpactCard label="Impact score" value={String(e.impact_score)} />
            <ImpactCard label="Time horizon" value={e.time_horizon} />
            <ImpactCard label="Confidence" value={e.confidence} />
            <ImpactCard label="Sentiment" value={e.sentiment} />
          </aside>
        </div>
      </main>
    </div>
  );
}
