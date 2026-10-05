-- K.O.S.M.O.S. MVP schema
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.administrador (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.agentes_ia (
  id uuid primary key default gen_random_uuid(),
  nome_agente text not null,
  tipo_frente text not null,
  estado text not null default 'ativo',
  orcamento_diario numeric(12, 2) not null default 0,
  prompt_sistema text
);

create table if not exists public.fila_aprovacoes (
  id uuid primary key default gen_random_uuid(),
  agente_id uuid not null references public.agentes_ia (id) on delete cascade,
  descricao_tarefa text not null,
  dados_anexo jsonb,
  estado_aprovacao text not null default 'pendente',
  created_at timestamptz not null default now()
);

create table if not exists public.registos_atividade (
  id uuid primary key default gen_random_uuid(),
  agente_id uuid not null references public.agentes_ia (id) on delete cascade,
  acao_executada text not null,
  resultado_financeiro numeric(12, 2),
  estado_execucao text not null default 'concluido',
  created_at timestamptz not null default now()
);

create table if not exists public.limites_seguranca (
  id uuid primary key default gen_random_uuid(),
  stop_loss_global numeric(12, 2) not null default 0,
  kill_switch_ativado boolean not null default false
);

create index if not exists idx_fila_aprovacoes_estado
  on public.fila_aprovacoes (estado_aprovacao);

create index if not exists idx_fila_aprovacoes_agente
  on public.fila_aprovacoes (agente_id);

-- ---------------------------------------------------------------------------
-- RLS (temporary MVP policies — authenticated read/write)
-- ---------------------------------------------------------------------------

alter table public.administrador enable row level security;
alter table public.agentes_ia enable row level security;
alter table public.fila_aprovacoes enable row level security;
alter table public.registos_atividade enable row level security;
alter table public.limites_seguranca enable row level security;

-- Drop if re-running this script
drop policy if exists "mvp_admin_all" on public.administrador;
drop policy if exists "mvp_agentes_all" on public.agentes_ia;
drop policy if exists "mvp_fila_all" on public.fila_aprovacoes;
drop policy if exists "mvp_atividade_all" on public.registos_atividade;
drop policy if exists "mvp_limites_all" on public.limites_seguranca;

create policy "mvp_admin_all"
  on public.administrador
  for all
  to authenticated
  using (true)
  with check (true);

create policy "mvp_agentes_all"
  on public.agentes_ia
  for all
  to authenticated
  using (true)
  with check (true);

create policy "mvp_fila_all"
  on public.fila_aprovacoes
  for all
  to authenticated
  using (true)
  with check (true);

create policy "mvp_atividade_all"
  on public.registos_atividade
  for all
  to authenticated
  using (true)
  with check (true);

create policy "mvp_limites_all"
  on public.limites_seguranca
  for all
  to authenticated
  using (true)
  with check (true);
