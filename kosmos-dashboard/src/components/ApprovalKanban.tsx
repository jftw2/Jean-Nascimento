import type { ApprovalItem, ApprovalStatus } from "@/data/mock";

const columns: { status: ApprovalStatus; title: string }[] = [
  { status: "review", title: "Para Revisão" },
  { status: "processing", title: "Em Processamento" },
  { status: "done", title: "Concluído" },
];

const statusDot: Record<ApprovalStatus, string> = {
  review: "bg-warning",
  processing: "bg-warning",
  done: "bg-success",
};

interface ApprovalKanbanProps {
  items: ApprovalItem[];
}

export function ApprovalKanban({ items }: ApprovalKanbanProps) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Centro de Aprovação
        </h3>
        <p className="text-sm text-muted">
          Fluxo de solicitações pendentes e concluídas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((column) => {
          const columnItems = items.filter(
            (item) => item.status === column.status,
          );

          return (
            <div
              key={column.status}
              className="rounded-lg border border-border bg-surface p-3"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <h4 className="text-sm font-medium text-foreground">
                  {column.title}
                </h4>
                <span className="rounded bg-surface-raised px-2 py-0.5 text-xs text-muted">
                  {columnItems.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {columnItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-md border border-border bg-surface-raised p-3"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${statusDot[item.status]}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-muted">{item.channel}</p>
                        <p className="mt-2 text-sm text-foreground">
                          {item.amount}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
