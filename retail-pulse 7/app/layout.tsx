import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Retail Pulse",
  description: "Operator-facing retail news and signals"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <div className="min-h-screen bg-mist">{children}</div>
      </body>
    </html>
  );
}
