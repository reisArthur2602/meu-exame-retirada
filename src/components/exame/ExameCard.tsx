import { type Exame, formatDate } from "@/lib/exames";
import { maskCPF } from "@/lib/cpf";
import DownloadButton from "./DownloadButton";

const STATUS_CONFIG = {
  disponivel: { label: "Disponível", className: "bg-green-100 text-green-700" },
  processando: { label: "Em processamento", className: "bg-amber-100 text-amber-700" },
  cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700" },
} as const;

interface ExameCardProps {
  exame: Exame;
}

export default function ExameCard({ exame }: ExameCardProps) {
  const status = STATUS_CONFIG[exame.status];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
      <div className="bg-linear-to-r from-blue-600 to-blue-500 px-8 py-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-1">
            Resultado do exame
          </p>
          <h1 className="text-white text-xl font-extrabold leading-tight">{exame.tipo}</h1>
          <p className="text-blue-100 text-sm mt-1">{exame.laboratorio}</p>
        </div>
        <span className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="px-8 py-6 space-y-6">
        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Dados do paciente
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Nome completo" value={exame.paciente.nome} wide />
            <InfoField label="CPF" value={maskCPF(exame.paciente.cpf)} />
          </div>
        </section>

        <div className="border-t border-slate-100" />

        <section>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Informações do exame
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Protocolo" value={exame.protocolo} mono />
            <InfoField label="Data de coleta" value={formatDate(exame.dataColeta)} />
            <InfoField label="Data do resultado" value={formatDate(exame.dataResultado)} />
            <InfoField label="Laboratório" value={exame.laboratorio} />
          </div>
        </section>

        <div className="border-t border-slate-100" />

        <DownloadButton url={exame.arquivoUrl} protocolo={exame.protocolo} />

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          Laudo com assinatura digital ICP-Brasil · Autenticidade verificável
        </div>
      </div>
    </div>
  );
}

function InfoField({
  label,
  value,
  wide,
  mono,
}: {
  label: string;
  value: string;
  wide?: boolean;
  mono?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className={`text-sm font-semibold text-slate-800 ${mono ? "font-mono tracking-wide" : ""}`}>
        {value}
      </p>
    </div>
  );
}
