import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
      <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Retail Pulse</h1>
                  <Suspense fallback={<div>Loading...</div>}>
                          <p>Welcome to Retail Pulse - AI-powered retail news aggregator</p>
                                </Suspense>
                                    </div>
                                      );
                                      }