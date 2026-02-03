export default function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] uppercase tracking-wide text-slate">{label}:</span>
      {items.map((x) => (
        <span key={x} className="chip">{x.replace(/_/g, " ")}</span>
      ))}
    </div>
  );
}
