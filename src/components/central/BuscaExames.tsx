"use client";

import { useState } from "react";
import {
  type AtendimentoRow,
  STATUS_CONFIG,
  maskCPFCentral,
  getAtendimentosComTelefone,
} from "@/lib/central";
import { buildMensagemAtendimento, openWhatsApp } from "@/lib/notificacao";

const EXAMES = getAtendimentosComTelefone();

export default function BuscaExames() {
  const [entregues, setEntregues] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visiveis = EXAMES.filter((e) => !entregues.has(e.id));

  function marcarEntregue(id: string) {
    setEntregues((prev) => new Set(prev).add(id));
  }

  function handleWhatsApp(exame: AtendimentoRow) {
    const msg = buildMensagemAtendimento(exame.paciente.trim().split(" ")[0], exame.protocolo);
    openWhatsApp(exame.telefone!, msg);
    marcarEntregue(exame.id);
  }

  async function handleCopy(exame: AtendimentoRow) {
    const msg = buildMensagemAtendimento(exame.paciente.trim().split(" ")[0], exame.protocolo);
    await navigator.clipboard.writeText(msg);
    setCopiedId(exame.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (visiveis.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-100">
        <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-slate-800">Todos os exames foram entregues</p>
        <p className="text-xs text-slate-400 mt-1">Não há pendências no momento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">
        <span className="font-semibold text-slate-700">{visiveis.length}</span> exame{visiveis.length !== 1 ? "s" : ""} aguardando entrega
      </p>

      {visiveis.map((exame) => (
        <ExameCard
          key={exame.id}
          exame={exame}
          isCopied={copiedId === exame.id}
          onWhatsApp={() => handleWhatsApp(exame)}
          onCopy={() => handleCopy(exame)}
          onMarcarEntregue={() => marcarEntregue(exame.id)}
        />
      ))}
    </div>
  );
}

interface ExameCardProps {
  exame: AtendimentoRow;
  isCopied: boolean;
  onWhatsApp: () => void;
  onCopy: () => void;
  onMarcarEntregue: () => void;
}

function ExameCard({ exame, isCopied, onWhatsApp, onCopy, onMarcarEntregue }: ExameCardProps) {
  const statusCfg = STATUS_CONFIG[exame.status];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold shrink-0">
            {exame.paciente.trim().split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{exame.paciente}</p>
            <p className="text-xs text-slate-400 font-mono">{maskCPFCentral(exame.cpf)}</p>
          </div>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${statusCfg.className}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
          {statusCfg.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4 text-xs">
        <div>
          <p className="text-slate-400">Protocolo</p>
          <p className="font-mono font-semibold text-slate-700">{exame.protocolo}</p>
        </div>
        <div>
          <p className="text-slate-400">WhatsApp</p>
          <p className="font-semibold text-slate-700">{exame.telefone}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onWhatsApp}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#25D366]/10 text-[#1ebe5a] border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar WhatsApp
        </button>

        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
        >
          {isCopied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copiado!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
              Copiar mensagem
            </>
          )}
        </button>

        <button
          onClick={onMarcarEntregue}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Marcar como entregue
        </button>
      </div>
    </div>
  );
}
