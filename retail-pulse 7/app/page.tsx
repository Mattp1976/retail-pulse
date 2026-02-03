import { Suspense } from "react";
import FilterSidebar from "../components/FilterSidebar";
import Feed from "../components/Feed";
import TopBar from "../components/TopBar";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
          <aside className="surface p-4">
            <FilterSidebar />
          </aside>
          <section className="surface p-4">
            <Suspense fallback={<div>Loading feed…</div>}>
              <Feed />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}
