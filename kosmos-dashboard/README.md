# K.O.S.M.O.S. Dashboard

MVP do command center (Next.js + TailwindCSS + Supabase + FastAPI).

## Frontend

```bash
cd kosmos-dashboard
# .env.local com NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Backend (FastAPI)

```bash
cd kosmos-dashboard/backend
cp .env.example .env   # preencher SUPABASE_URL e SUPABASE_KEY
pip install -r requirements.txt
uvicorn main:app --reload
```

API em [http://127.0.0.1:8000](http://127.0.0.1:8000) · docs em `/docs`.

Endpoints:
- `POST /webhook/agentes` — body `{ "agente_id", "descricao_tarefa", "dados_anexo" }` → `fila_aprovacoes` (`estado_aprovacao=pendente`)
- `POST /sistema/kill-switch` — define `limites_seguranca.kill_switch_ativado = true`

## Docker Compose (backend + n8n)

```bash
cd kosmos-dashboard
cp backend/.env.example backend/.env   # SUPABASE_URL + SUPABASE_KEY
docker compose up -d
```

| Serviço  | URL |
|----------|-----|
| Backend  | http://localhost:8000 (`/docs`, `/health`) |
| n8n      | http://localhost:5678 |

Dados do n8n persistem no volume Docker `n8n_data`. Parar: `docker compose down`.

## Estrutura

```
docker-compose.yml         # backend :8000 + n8n :5678
schema.sql                 # Tabelas + RLS (SQL Editor do Supabase)
.env.local                 # Frontend Supabase (não commitado)
backend/
  main.py                  # FastAPI MVP
  Dockerfile
  requirements.txt
  .env.example             # SUPABASE_URL + SUPABASE_KEY
src/
  app/                     # App Router
  components/              # UI
  data/mock.ts             # Cards + colunas mock do Kanban
  lib/supabase/client.ts   # Cliente Supabase (frontend)
  lib/approvals.ts         # Fetch fila_aprovacoes (Para Revisão)
```

## Schema Supabase

1. Abra o projeto no Supabase → **SQL Editor** → New query
2. Cole o conteúdo de `schema.sql` e execute
3. Reinicie `npm run dev` / `uvicorn` se já estiverem rodando

## UI

- Sidebar com título **K.O.S.M.O.S.**
- Header com botão vermelho **Kill Switch** (UI-only no frontend por enquanto)
- Cards: Canais Dark, Tráfego Pago, Day Trade
- Kanban: Para Revisão (Supabase) · Em Processamento / Concluído (mock)
