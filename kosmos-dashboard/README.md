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
src/
  app/           # App Router (layout, page, globals)
  components/    # Sidebar, Header, KillSwitch, SummaryCard, ApprovalKanban
  data/mock.ts   # Dados estáticos (cards + kanban)
```

## UI

- Sidebar com título **K.O.S.M.O.S.**
- Header com botão vermelho **Kill Switch** (toggle/alert UI-only)
- Cards: Canais Dark, Tráfego Pago, Day Trade
- Kanban: Para Revisão · Em Processamento · Concluído
