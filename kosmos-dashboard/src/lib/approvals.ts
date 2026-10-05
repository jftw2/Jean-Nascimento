import type { ApprovalItem } from "@/data/mock";
import { createSupabaseClient } from "@/lib/supabase/client";

/** Values treated as "Para Revisão" in the Kanban. */
const PENDING_STATES = ["pendente", "para_revisao", "para revisão", "Para Revisão"];

type FilaRow = {
  id: string;
  descricao_tarefa: string;
  dados_anexo: unknown;
  estado_aprovacao: string;
  agentes_ia:
    | { nome_agente: string; tipo_frente: string }
    | { nome_agente: string; tipo_frente: string }[]
    | null;
};

function formatAnexo(dados: unknown): string {
  if (dados == null) return "—";
  if (typeof dados === "string") return dados;
  if (typeof dados === "object" && dados !== null) {
    const record = dados as Record<string, unknown>;
    if (typeof record.valor === "string" || typeof record.valor === "number") {
      return String(record.valor);
    }
    if (typeof record.amount === "string" || typeof record.amount === "number") {
      return String(record.amount);
    }
    return JSON.stringify(dados);
  }
  return String(dados);
}

function agentLabel(
  agent: FilaRow["agentes_ia"],
): string {
  const row = Array.isArray(agent) ? agent[0] : agent;
  if (!row) return "Agente";
  return row.tipo_frente || row.nome_agente || "Agente";
}

/**
 * Fetches pending approval queue items for the "Para Revisão" column.
 * Returns [] on error / missing config so the UI can show the empty state.
 */
export async function fetchPendingApprovals(): Promise<ApprovalItem[]> {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from("fila_aprovacoes")
      .select(
        "id, descricao_tarefa, dados_anexo, estado_aprovacao, agentes_ia(nome_agente, tipo_frente)",
      )
      .in("estado_aprovacao", PENDING_STATES)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("fila_aprovacoes fetch failed:", error?.message);
      return [];
    }

    return (data as FilaRow[]).map((row) => ({
      id: row.id,
      title: row.descricao_tarefa,
      channel: agentLabel(row.agentes_ia),
      amount: formatAnexo(row.dados_anexo),
      status: "review" as const,
    }));
  } catch (err) {
    console.error("fila_aprovacoes fetch error:", err);
    return [];
  }
}
