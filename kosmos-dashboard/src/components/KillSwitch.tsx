"use client";

import { useState } from "react";

export function KillSwitch() {
  const [active, setActive] = useState(false);

  function handleToggle() {
    if (active) {
      setActive(false);
      return;
    }

    const confirmed = window.confirm(
      "Ativar Kill Switch?\n\nIsto é apenas uma simulação de UI. Nenhum corte real será executado.",
    );

    if (confirmed) {
      setActive(true);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={active}
      className={`rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all ${
        active
          ? "bg-danger ring-2 ring-danger/40 ring-offset-2 ring-offset-background animate-pulse"
          : "bg-danger hover:bg-red-600"
      }`}
    >
      {active ? "Kill Switch ATIVO" : "Kill Switch"}
    </button>
  );
}
