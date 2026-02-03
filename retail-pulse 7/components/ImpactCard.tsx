export default function ImpactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-3">
      <p className="text-[11px] uppercase tracking-wide text-slate">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
