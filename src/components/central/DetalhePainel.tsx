"use client";

import { useState } from "react";
import {
  type AtendimentoRow,
  type ExameStatus,
  STATUS_CONFIG,
  HISTORICO_CONFIG,
  maskCPFCentral,
  formatTimestampCentral,
} from "@/lib/central";
import { buildMensagemAtendimento, printReceipt } from "@/lib/notificacao";

interface DetalhePainelProps {
  exame: AtendimentoRow;
  status: ExameStatus;
  onClose: () => void;
  onWhatsApp: () => void;
  onCopy: () => void;
  onMarcarEntregue: () => void;
}

const ACCESS_URL = "https://meuexame.com.br/paciente";

export default function DetalhePainel({ exame, status, onClose, onWhatsApp, onCopy, onMarcarEntregue }: DetalhePainelProps) {
  const [copied, setCopied] = useState(false);
  const mensagem = buildMensagemAtendimento(exame.paciente.trim().split(" ")[0], exame.protocolo);
  const statusCfg = STATUS_CONFIG[status];
  const canSend = status !== "pendente" && status !== "expirado";
  const isEntregue = status === "entregue" || status === "acessado";

  async function handleCopy() {
    await navigator.clipboard.writeText(mensagem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy();
  }

  function handlePrint() {
    printReceipt(exame.paciente, exame.cpf, exame.protocolo);
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">{exame.paciente}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{exame.protocolo}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Patient info */}
        <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Dados do paciente</h4>
          <div className="grid grid-cols-2 gap-3">
            <InfoField label="Nome" value={exame.paciente} wide />
            <InfoField label="CPF" value={maskCPFCentral(exame.cpf)} mono />
            <InfoField label="Telefone" value={exame.telefone ?? "Não informado"} />
            <InfoField label="Protocolo" value={exame.protocolo} mono />
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Status</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${statusCfg.className}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                {statusCfg.label}
              </span>
            </div>
            <InfoField label="Cadastrado em" value={formatTimestampCentral(exame.dataCadastro)} />
            {exame.ultimoEnvio && <InfoField label="Último envio" value={formatTimestampCentral(exame.ultimoEnvio)} />}
            {exame.ultimoAcesso && <InfoField label="Último acesso" value={formatTimestampCentral(exame.ultimoAcesso)} />}
          </div>
        </div>

        {/* Access link */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Link de acesso</h4>
          <p className="text-sm font-semibold text-blue-700 break-all">{ACCESS_URL}</p>
        </div>

        {/* Message preview */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Prévia da mensagem</h4>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative">
            <p className="text-sm text-slate-700 leading-relaxed">{mensagem}</p>
          </div>
        </div>

        {/* Actions */}
        {!canSend && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-100">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 font-medium">
              {status === "pendente"
                ? "Este exame ainda está em processamento e não pode ser enviado ao paciente."
                : "Este exame expirou. Oriente o paciente a entrar em contato com o laboratório."}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={onWhatsApp}
            disabled={!canSend}
            title={!canSend ? "Exame indisponível para envio" : undefined}
            className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar WhatsApp
            {exame.telefone && <span className="text-xs font-normal opacity-80">{exame.telefone}</span>}
          </button>

          <button
            onClick={handleCopy}
            disabled={!canSend}
            className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copiado!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                Copiar mensagem
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2.5 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Imprimir comprovante
          </button>

          {!isEntregue && canSend && (
            <button
              onClick={onMarcarEntregue}
              className="flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Marcar como entregue
            </button>
          )}
        </div>

        {/* History */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Histórico de atendimento
          </h4>
          {exame.historico.length === 0 ? (
            <div className="flex items-center gap-2 text-slate-400 py-4">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs">Nenhuma ação registrada ainda.</p>
            </div>
          ) : (
            <ol className="relative border-l border-slate-200 space-y-4 ml-2">
              {[...exame.historico].reverse().map((item) => {
                const cfg = HISTORICO_CONFIG[item.tipo];
                return (
                  <li key={item.id} className="ml-4">
                    <span className="absolute -left-1.5 mt-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
                    <p className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatTimestampCentral(item.timestamp)}
                      {item.usuario && <> — {item.usuario}</>}
                    </p>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, wide, mono }: { label: string; value: string; wide?: boolean; mono?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className={`text-sm font-semibold text-slate-800 ${mono ? "font-mono tracking-wide" : ""}`}>{value}</p>
    </div>
  );
}
