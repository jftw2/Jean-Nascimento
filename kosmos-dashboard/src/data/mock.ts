export type SummaryStatus = "profit" | "pending" | "loss";

export interface FinancialSummary {
  id: string;
  title: string;
  value: string;
  change: string;
  status: SummaryStatus;
}

export type ApprovalStatus = "review" | "processing" | "done";

export interface ApprovalItem {
  id: string;
  title: string;
  channel: string;
  amount: string;
  status: ApprovalStatus;
}

export const financialSummaries: FinancialSummary[] = [
  {
    id: "canais-dark",
    title: "Canais Dark",
    value: "R$ 12.480,00",
    change: "+8,2% hoje",
    status: "profit",
  },
  {
    id: "trafego-pago",
    title: "Tráfego Pago",
    value: "R$ 4.320,00",
    change: "Aguardando sync",
    status: "pending",
  },
  {
    id: "day-trade",
    title: "Day Trade",
    value: "-R$ 890,00",
    change: "-3,1% hoje",
    status: "loss",
  },
];

export const approvalItems: ApprovalItem[] = [
  {
    id: "apr-1",
    title: "Campanha Facebook — Upsell",
    channel: "Tráfego Pago",
    amount: "R$ 1.200,00",
    status: "review",
  },
  {
    id: "apr-2",
    title: "Novo criativo — Canal Dark A",
    channel: "Canais Dark",
    amount: "R$ 450,00",
    status: "review",
  },
  {
    id: "apr-3",
    title: "Ordem day trade — PETR4",
    channel: "Day Trade",
    amount: "R$ 2.000,00",
    status: "processing",
  },
  {
    id: "apr-4",
    title: "Budget Google Ads — Q1",
    channel: "Tráfego Pago",
    amount: "R$ 3.500,00",
    status: "processing",
  },
  {
    id: "apr-5",
    title: "Saque afiliado — Lote 12",
    channel: "Canais Dark",
    amount: "R$ 980,00",
    status: "done",
  },
  {
    id: "apr-6",
    title: "Fechamento diário — WIN$",
    channel: "Day Trade",
    amount: "R$ 640,00",
    status: "done",
  },
];
