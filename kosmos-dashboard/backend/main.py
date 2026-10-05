"""
K.O.S.M.O.S. backend MVP — FastAPI + Supabase

Start:
  cd backend
  cp .env.example .env   # fill SUPABASE_URL and SUPABASE_KEY
  pip install -r requirements.txt
  uvicorn main:app --reload
"""

from __future__ import annotations

import os
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from supabase import Client, create_client

load_dotenv()

# Matches Kanban "Para Revisão" filter in src/lib/approvals.ts
PENDING_APPROVAL_STATE = "pendente"

app = FastAPI(title="K.O.S.M.O.S. Backend", version="0.1.0")


# ---------------------------------------------------------------------------
# Supabase
# ---------------------------------------------------------------------------

def get_supabase() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise HTTPException(
            status_code=500,
            detail="Missing SUPABASE_URL or SUPABASE_KEY in environment",
        )
    try:
        return create_client(url, key)
    except Exception as exc:  # noqa: BLE001 — surface config errors clearly
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create Supabase client: {exc}",
        ) from exc


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class AgenteWebhookBody(BaseModel):
    agente_id: str = Field(..., min_length=1, description="UUID do agente em agentes_ia")
    descricao_tarefa: str = Field(..., min_length=1)
    dados_anexo: Any = None


# ---------------------------------------------------------------------------
# Error handlers — bad JSON / invalid body must not crash the process
# ---------------------------------------------------------------------------

@app.exception_handler(RequestValidationError)
async def validation_error_handler(
    _request: object,
    exc: RequestValidationError,
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Corpo da requisição inválido",
            "errors": exc.errors(),
        },
    )


@app.exception_handler(Exception)
async def unhandled_error_handler(
    _request: object,
    exc: Exception,
) -> JSONResponse:
    # HTTPException has its own FastAPI handler — do not swallow it.
    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )
    return JSONResponse(
        status_code=500,
        content={"detail": "Erro interno", "message": str(exc)},
    )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/webhook/agentes", status_code=201)
def webhook_agentes(body: AgenteWebhookBody) -> dict[str, Any]:
    """Recebe tarefa de agente e enfileira em fila_aprovacoes (Para Revisão)."""
    supabase = get_supabase()

    row = {
        "agente_id": body.agente_id,
        "descricao_tarefa": body.descricao_tarefa,
        "dados_anexo": body.dados_anexo,
        "estado_aprovacao": PENDING_APPROVAL_STATE,
    }

    try:
        result = supabase.table("fila_aprovacoes").insert(row).execute()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=502,
            detail=f"Falha ao inserir em fila_aprovacoes: {exc}",
        ) from exc

    data = result.data or []
    if not data:
        raise HTTPException(
            status_code=502,
            detail="Insert em fila_aprovacoes não retornou dados",
        )

    return {"ok": True, "item": data[0]}


@app.post("/sistema/kill-switch")
def activate_kill_switch() -> dict[str, Any]:
    """Ativa kill_switch_ativado em limites_seguranca (update ou insert)."""
    supabase = get_supabase()

    try:
        existing = (
            supabase.table("limites_seguranca")
            .select("id")
            .limit(1)
            .execute()
        )
        rows = existing.data or []

        if rows:
            row_id = rows[0]["id"]
            result = (
                supabase.table("limites_seguranca")
                .update({"kill_switch_ativado": True})
                .eq("id", row_id)
                .execute()
            )
        else:
            result = (
                supabase.table("limites_seguranca")
                .insert(
                    {
                        "stop_loss_global": 0,
                        "kill_switch_ativado": True,
                    }
                )
                .execute()
            )
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=502,
            detail=f"Falha ao atualizar limites_seguranca: {exc}",
        ) from exc

    data = result.data or []
    return {
        "ok": True,
        "kill_switch_ativado": True,
        "limites": data[0] if data else None,
    }
