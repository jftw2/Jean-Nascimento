import { ApprovalKanban } from "@/components/ApprovalKanban";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SummaryCard } from "@/components/SummaryCard";
import { approvalItems, financialSummaries } from "@/data/mock";
import { fetchPendingApprovals } from "@/lib/approvals";

export const dynamic = "force-dynamic";

export default async function Home() {
  const pendingApprovals = await fetchPendingApprovals();
  const mockOtherColumns = approvalItems.filter(
    (item) => item.status !== "review",
  );
  const kanbanItems = [...pendingApprovals, ...mockOtherColumns];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 space-y-8 overflow-auto p-6">
          <section>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground">
                Resumo Financeiro
              </h3>
              <p className="text-sm text-muted">
                Indicadores do dia por vertical
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {financialSummaries.map((summary) => (
                <SummaryCard key={summary.id} summary={summary} />
              ))}
            </div>
          </section>

          <ApprovalKanban items={kanbanItems} />
        </main>
      </div>
    </div>
  );
}
