const navItems = [
  { label: "Dashboard", active: true },
  { label: "Aprovações", active: false },
  { label: "Relatórios", active: false },
  { label: "Configurações", active: false },
];

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-5 py-6">
        <p className="text-xs font-medium tracking-[0.2em] text-muted">
          COMMAND CENTER
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-wide text-foreground">
          K.O.S.M.O.S.
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
              item.active
                ? "bg-surface-raised text-foreground"
                : "text-muted hover:bg-surface-raised/60 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <p className="text-xs text-muted">MVP visual · dados mock</p>
      </div>
    </aside>
  );
}
