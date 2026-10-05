import { KillSwitch } from "./KillSwitch";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Painel de Controle
        </h2>
        <p className="text-sm text-muted">Visão geral operacional</p>
      </div>
      <KillSwitch />
    </header>
  );
}
