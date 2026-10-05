# K.O.S.M.O.S. Dashboard

MVP visual do command center (Next.js + TailwindCSS). Sem banco, sem auth real — apenas esqueleto estático com dados mock.

## Como rodar

```bash
cd kosmos-dashboard
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
schema.sql                 # Tabelas + RLS (rodar no Supabase SQL Editor)
.env.local                 # Supabase URL + anon key (não commitado)
src/
  app/                     # App Router
  components/              # UI
  data/mock.ts             # Cards + colunas mock do Kanban
  lib/supabase/client.ts   # Cliente Supabase
  lib/approvals.ts         # Fetch fila_aprovacoes (Para Revisão)
```

## Schema Supabase

1. Abra o projeto no Supabase → **SQL Editor** → New query
2. Cole o conteúdo de `schema.sql` e execute
3. Reinicie `npm run dev` se já estiver rodando

## UI

- Sidebar com título **K.O.S.M.O.S.**
- Header com botão vermelho **Kill Switch** (toggle/alert UI-only)
- Cards: Canais Dark, Tráfego Pago, Day Trade
- Kanban: Para Revisão · Em Processamento · Concluído
