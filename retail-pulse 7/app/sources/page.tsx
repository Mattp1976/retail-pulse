import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { WORLDVIEWS } from "../../lib/vocab";
import { createSource, deleteSource, updateSource } from "./actions";

export default async function SourcesPage({
  searchParams
}: {
  searchParams: { token?: string; success?: string; error?: string };
}) {
  const required = process.env.ADMIN_TOKEN;
  const token = searchParams.token;

  if (required && token !== required) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl">Sources admin</h1>
        <p className="mt-2 text-sm text-slate">
          This page is protected. Provide a valid token via the query string to continue.
        </p>
        <Link className="mt-4 inline-block text-sm" href="/">Back to feed</Link>
      </div>
    );
  }

  const sources = await prisma.source.findMany({
    orderBy: [{ worldview: "asc" }, { weight: "desc" }, { name: "asc" }]
  });

  const success = searchParams.success;
  const error = searchParams.error;

  const stats = WORLDVIEWS.map((w) => ({
    worldview: w,
    count: sources.filter((s) => s.worldview === w).length
  }));

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link href="/" className="text-sm text-slate">Back to feed</Link>
          <h1 className="mt-2 font-display text-3xl">Sources admin</h1>
          <p className="mt-2 text-sm text-slate">
            Add and tune RSS sources by worldview. Changes take effect on the next ingestion.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
        {(success || error) && (
          <div className={`mb-4 rounded-2xl px-4 py-3 text-sm ${success ? "bg-lemon/30" : "bg-warn/10"}`}>
            {success ? `Success: ${success}` : `Error: ${error}`}
          </div>
        )}

        <section className="surface p-4">
          <h2 className="text-lg font-semibold">Worldview coverage</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {stats.map((s) => (
              <div key={s.worldview} className="chip px-4 py-2">
                {s.worldview.replace("_", " ")}: {s.count}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 surface p-4">
          <h2 className="text-lg font-semibold">Add new source</h2>
          <form action={createSource} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_120px_140px_auto]">
            <input name="name" placeholder="Name" className="rounded-2xl border border-line bg-white/80 px-3 py-2" required />
            <input name="url" placeholder="RSS URL" className="rounded-2xl border border-line bg-white/80 px-3 py-2" required />
            <input name="weight" type="number" min="1" max="10" defaultValue={3} className="rounded-2xl border border-line bg-white/80 px-3 py-2" />
            <select name="worldview" defaultValue="uk" className="rounded-2xl border border-line bg-white/80 px-3 py-2">
              {WORLDVIEWS.map((w) => (
                <option key={w} value={w}>{w.replace("_", " ")}</option>
              ))}
            </select>
            <button className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">Add</button>
          </form>
        </section>

        <section className="mt-6 surface p-4">
          <h2 className="text-lg font-semibold">Existing sources</h2>
          <div className="mt-4 space-y-4">
            {sources.map((s) => (
              <div key={s.id} className="panel p-4">
                <form action={updateSource} className="grid gap-3 md:grid-cols-[1.2fr_1fr_120px_140px_auto]">
                  <input type="hidden" name="id" value={s.id} />
                  <input name="name" defaultValue={s.name} className="rounded-2xl border border-line bg-white/80 px-3 py-2" />
                  <input defaultValue={s.url} readOnly className="rounded-2xl border border-line bg-white/60 px-3 py-2 text-xs text-slate" />
                  <input name="weight" type="number" min="1" max="10" defaultValue={s.weight} className="rounded-2xl border border-line bg-white/80 px-3 py-2" />
                  <select name="worldview" defaultValue={s.worldview} className="rounded-2xl border border-line bg-white/80 px-3 py-2">
                    {WORLDVIEWS.map((w) => (
                      <option key={w} value={w}>{w.replace("_", " ")}</option>
                    ))}
                  </select>
                  <button className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">Update</button>
                </form>
                <form action={deleteSource} className="mt-2">
                  <input type="hidden" name="id" value={s.id} />
                  <button className="text-xs text-warn">Delete source</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
