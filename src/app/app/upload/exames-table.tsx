"use client";

import { useMemo, useRef, useState } from "react";
import { maskCPF } from "@/lib/cpf";
import { buildWhatsAppMessage, openWhatsApp, printReceipt } from "@/lib/notificacao";

type Status = "disponivel" | "processando" | "cancelado";

interface ExameRow {
  id: string;
  protocolo: string;
  paciente: string;
  cpf: string;
  tipo: string;
  dataEnvio: string;
  status: Status;
  telefone?: string;
}

const MOCK_DATA: ExameRow[] = [
  { id: "1",  protocolo: "EX2026001234", paciente: "Maria Aparecida Silva",    cpf: "123.456.789-09", tipo: "Hemograma Completo",     dataEnvio: "2026-05-28", status: "disponivel",  telefone: "(11) 99999-1234" },
  { id: "2",  protocolo: "EX2026005678", paciente: "João Paulo Ferreira",      cpf: "987.654.321-00", tipo: "Glicemia em Jejum",       dataEnvio: "2026-05-27", status: "disponivel",  telefone: "(21) 98888-5678" },
  { id: "3",  protocolo: "EX2026009101", paciente: "Ana Beatriz Costa",        cpf: "321.654.987-11", tipo: "Colesterol Total",        dataEnvio: "2026-05-27", status: "processando"                              },
  { id: "4",  protocolo: "EX2026001122", paciente: "Carlos Eduardo Lima",      cpf: "111.222.333-44", tipo: "Raio-X Tórax",            dataEnvio: "2026-05-26", status: "disponivel",  telefone: "(31) 97777-1122" },
  { id: "5",  protocolo: "EX2026003344", paciente: "Fernanda Rocha Santos",    cpf: "555.666.777-88", tipo: "TSH Ultrassensível",      dataEnvio: "2026-05-26", status: "processando", telefone: "(41) 96666-3344" },
  { id: "6",  protocolo: "EX2026005566", paciente: "Roberto Alves Pereira",    cpf: "999.888.777-66", tipo: "Urina Tipo I",            dataEnvio: "2026-05-25", status: "disponivel"                               },
  { id: "7",  protocolo: "EX2026007788", paciente: "Luciana Mendes Carvalho",  cpf: "222.333.444-55", tipo: "Ultrassonografia Abdom.", dataEnvio: "2026-05-25", status: "cancelado",   telefone: "(51) 95555-7788" },
  { id: "8",  protocolo: "EX2026009900", paciente: "Marcelo Teixeira Gomes",   cpf: "444.555.666-77", tipo: "Eletrocardiograma",       dataEnvio: "2026-05-24", status: "disponivel",  telefone: "(61) 94444-9900" },
  { id: "9",  protocolo: "EX2026001010", paciente: "Patricia Lima Souza",      cpf: "777.888.999-00", tipo: "Hemograma Completo",      dataEnvio: "2026-05-24", status: "disponivel"                               },
  { id: "10", protocolo: "EX2026001212", paciente: "Ricardo Nascimento Cruz",  cpf: "333.444.555-66", tipo: "Creatinina",              dataEnvio: "2026-05-23", status: "processando", telefone: "(71) 93333-1212" },
  { id: "11", protocolo: "EX2026001414", paciente: "Camila Borges Martins",    cpf: "666.777.888-99", tipo: "Vitamina D",              dataEnvio: "2026-05-23", status: "disponivel",  telefone: "(81) 92222-1414" },
  { id: "12", protocolo: "EX2026001616", paciente: "Thiago Andrade Vieira",    cpf: "888.999.000-11", tipo: "Ácido Úrico",             dataEnvio: "2026-05-22", status: "cancelado"                                },
];

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  disponivel:  { label: "Disponível",  className: "bg-green-100 text-green-700" },
  processando: { label: "Processando", className: "bg-amber-100 text-amber-700" },
  cancelado:   { label: "Cancelado",   className: "bg-red-100   text-red-700"   },
};

const PER_PAGE = 5;

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function ExamesTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [page, setPage] = useState(1);
  // id of the row showing the phone popover
  const [phonePopoverId, setPhonePopoverId] = useState<string | null>(null);
  const [phoneInput, setPhoneInput] = useState("");
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return MOCK_DATA.filter((row) => {
      const matchStatus = statusFilter === "all" || row.status === statusFilter;
      const matchSearch =
        !q ||
        row.paciente.toLowerCase().includes(q) ||
        row.protocolo.toLowerCase().includes(q) ||
        row.cpf.replace(/\D/g, "").includes(q.replace(/\D/g, ""));
      return matchStatus && matchSearch;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function handleSearch(value: string) { setSearch(value); setPage(1); }
  function handleFilter(value: Status | "all") { setStatusFilter(value); setPage(1); }

  function handleWhatsApp(row: ExameRow) {
    if (row.telefone) {
      const firstName = row.paciente.trim().split(" ")[0];
      openWhatsApp(row.telefone, buildWhatsAppMessage(firstName, row.protocolo));
    } else {
      setPhoneInput("");
      setPhonePopoverId(row.id);
      setTimeout(() => phoneInputRef.current?.focus(), 50);
    }
  }

  function handlePhoneSubmit(row: ExameRow) {
    const digits = phoneInput.replace(/\D/g, "");
    if (digits.length < 10) return;
    const firstName = row.paciente.trim().split(" ")[0];
    openWhatsApp(phoneInput, buildWhatsAppMessage(firstName, row.protocolo));
    setPhonePopoverId(null);
    setPhoneInput("");
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          Exames enviados
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {filtered.length}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar paciente, CPF ou protocolo..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-colors w-full sm:w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleFilter(e.target.value as Status | "all")}
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors text-slate-700"
          >
            <option value="all">Todos os status</option>
            <option value="disponivel">Disponível</option>
            <option value="processando">Processando</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-205">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {["Protocolo", "Paciente", "Tipo de Exame", "Data de Envio", "Status", "Ações"].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${h === "Ações" ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginated.length > 0 ? (
              paginated.map((row) => (
                <>
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono font-semibold text-slate-700">{row.protocolo}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{row.paciente}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{maskCPF(row.cpf)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-700">{row.tipo}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-600">{formatDate(row.dataEnvio)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_CONFIG[row.status].className}`}>
                        {STATUS_CONFIG[row.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 justify-end">
                        <ActionButton title="Ver exame" onClick={() => {}}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </ActionButton>

                        <ActionButton title="Baixar PDF" onClick={() => {}}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </ActionButton>

                        <ActionButton
                          title={row.telefone ? `Enviar WhatsApp para ${row.telefone}` : "Informar telefone para enviar WhatsApp"}
                          onClick={() => handleWhatsApp(row)}
                          color="green"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </ActionButton>

                        <ActionButton
                          title="Imprimir comprovante"
                          onClick={() => printReceipt(row.paciente, row.cpf, row.protocolo)}
                          color="slate"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                          </svg>
                        </ActionButton>
                      </div>
                    </td>
                  </tr>

                  {phonePopoverId === row.id && (
                    <tr key={`${row.id}-popover`} className="bg-green-50">
                      <td colSpan={6} className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <span className="text-sm font-semibold text-green-800 shrink-0">
                            Telefone não cadastrado — informe para enviar:
                          </span>
                          <input
                            ref={phoneInputRef}
                            type="text"
                            inputMode="tel"
                            placeholder="(00) 00000-0000"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(formatPhone(e.target.value))}
                            onKeyDown={(e) => { if (e.key === "Enter") handlePhoneSubmit(row); if (e.key === "Escape") setPhonePopoverId(null); }}
                            className="px-3 py-1.5 text-sm rounded-lg border border-green-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none w-44"
                          />
                          <button
                            onClick={() => handlePhoneSubmit(row)}
                            disabled={phoneInput.replace(/\D/g, "").length < 10}
                            className="px-3 py-1.5 text-xs font-semibold bg-[#25D366] hover:bg-[#1ebe5a] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                          >
                            Enviar
                          </button>
                          <button
                            onClick={() => setPhonePopoverId(null)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            aria-label="Cancelar"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p className="text-sm font-medium">Nenhum exame encontrado</p>
                    <p className="text-xs">Tente ajustar a busca ou o filtro de status.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > PER_PAGE && (
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Mostrando{" "}
            <span className="font-semibold text-slate-700">
              {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
            exames
          </p>
          <div className="flex items-center gap-1">
            <PaginationButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Página anterior">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <PaginationButton key={n} onClick={() => setPage(n)} active={n === safePage}>{n}</PaginationButton>
            ))}
            <PaginationButton onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Próxima página">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </PaginationButton>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  children, title, onClick, color = "default",
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  color?: "default" | "green" | "slate";
}) {
  const colorClass = {
    default: "text-slate-400 hover:text-blue-600 hover:bg-blue-50",
    green:   "text-slate-400 hover:text-[#25D366] hover:bg-green-50",
    slate:   "text-slate-400 hover:text-slate-700 hover:bg-slate-100",
  }[color];

  return (
    <button onClick={onClick} title={title} className={`p-1.5 rounded-lg transition-colors ${colorClass}`}>
      {children}
    </button>
  );
}

function PaginationButton({
  children, onClick, disabled, active, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors
        ${active
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
      {...rest}
    >
      {children}
    </button>
  );
}
