import { Suspense } from "react";
import TopBar from "../components/TopBar";
import FilterSidebar from "../components/FilterSidebar";
import Feed from "../components/Feed";

export const dynamic = "force-dynamic";

export default function HomePage() {
      return (
              <div className="min-h-screen bg-apple-bg-secondary">
                    <Suspense fallback={<div className="glass sticky top-0 z-50 h-16" />}>
                            <TopBar />
                    </Suspense>
                    <main className="container-wide py-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                      <aside className="w-full lg:w-80 flex-shrink-0">
                                                  <div className="panel p-6 lg:sticky lg:top-24">
                                                                <Suspense fallback={<div className="skeleton h-8 w-24" />}>
                                                                                <FilterSidebar />
                                                                </Suspense>
                                                  </div>
                                      </aside>
                                      <section className="flex-1 min-w-0">
                                                  <Suspense fallback={<div className="skeleton h-8 w-48" />}>
                                                                <Feed />
                                                  </Suspense>
                                      </section>
                            </div>
                    </main>
                    <footer className="border-t border-apple-border bg-apple-bg py-8 mt-12">
                            <div className="container-wide">
                                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                                  <span className="text-body font-medium text-apple-text">Retail Pulse</span>
                                                  <p className="text-caption text-apple-text-secondary">AI-powered retail intelligence</p>
                                      </div>
                            </div>
                    </footer>
              </div>
            );
}
