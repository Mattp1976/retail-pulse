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
                </Suspense>Suspense>
          
                <main className="container-wide py-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                                  <aside className="w-full lg:w-80 flex-shrink-0">
                                              <div className="panel p-6 lg:sticky lg:top-24">
                                                            <Suspense fallback={<div className="space-y-4"><div className="skeleton h-8 w-24" /><div className="skeleton h-10 w-full" /></div>div>}>
                                                                            <FilterSidebar />
                                                            </Suspense>Suspense>
                                              </div>div>
                                  </aside>aside>
                        
                                  <section className="flex-1 min-w-0">
                                              <Suspense fallback={<div className="space-y-4"><div className="panel p-4"><div className="skeleton h-8 w-48" /></div>div></div>div>}>
                                                            <Feed />
                                              </Suspense>Suspense>
                                  </section>section>
                        </div>div>
                </main>main>
          
                <footer className="border-t border-apple-border bg-apple-bg py-8 mt-12">
                        <div className="container-wide">
                                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                              <div className="flex items-center gap-2">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-apple-accent">
                                                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                                            </svg>svg>
                                                            </div>div>
                                                            <span className="text-body font-medium text-apple-text">Retail Pulse</span>span>
                                              </div>div>
                                              <p className="text-caption text-apple-text-secondary">AI-powered retail intelligence platform</p>p>
                                  </div>div>
                        </div>div>
                </footer>footer>
          </div>div>
        );
}</div>
