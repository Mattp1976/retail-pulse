export default function Badge({ label, tone }: { label: string; tone?: "strong" }) {
      return (
              <span className={`chip ${tone === "strong" ? "chip-strong" : ""}`}>
                  {label}
              </span>
            );
}
