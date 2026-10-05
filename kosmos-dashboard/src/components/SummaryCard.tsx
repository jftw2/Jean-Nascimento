import type { FinancialSummary } from "@/data/mock";

const statusStyles = {
  profit: {
    value: "text-success",
    badge: "bg-success/15 text-success",
    label: "Lucro",
  },
  pending: {
    value: "text-warning",
    badge: "bg-warning/15 text-warning",
    label: "Pendente",
  },
  loss: {
    value: "text-danger",
    badge: "bg-danger/15 text-danger",
    label: "Perda",
  },
} as const;

interface SummaryCardProps {
  summary: FinancialSummary;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const style = statusStyles[summary.status];

  return (
    <article className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-muted">{summary.title}</h3>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${style.badge}`}
        >
          {style.label}
        </span>
      </div>
      <p className={`mt-3 text-2xl font-semibold tracking-tight ${style.value}`}>
        {summary.value}
      </p>
      <p className="mt-2 text-sm text-muted">{summary.change}</p>
    </article>
  );
}
