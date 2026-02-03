import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4">
      <h1 className="font-display text-3xl">Story not found</h1>
      <p className="mt-2 text-sm text-slate">
        This story may not be enriched yet or the link is incorrect.
      </p>
      <Link href="/" className="mt-4 text-sm">Back to feed</Link>
    </div>
  );
}
