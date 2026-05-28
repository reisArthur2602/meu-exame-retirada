"use client";

import { useMemo, useState } from "react";
import {
  type LogAction,
  type DateFilter,
  MOCK_LOGS,
  ACTION_CONFIG,
  LEVEL_CONFIG,
  filterByDate,
  formatTimestamp,
} from "@/lib/logs";
import { getInitials, getAvatarColor } from "@/lib/usuarios";

const PER_PAGE = 10;

const DATE_FILTER_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: "today", label: "Hoje"           },
  { value: "7d",    label: "Últimos 7 dias" },
  { value: "30d",   label: "Últimos 30 dias"},
  { value: "all",   label: "Todo o período" },
];

const ACTION_ICONS: Record<LogAction, React.ReactNode> = {
  LOGIN: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  ),
  LOGOUT: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  ),
  UPLOAD: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  ),
  DOWNLOAD: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  EXAM_VIEWED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  USER_CREATED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
  ),
  USER_UPDATED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
    </svg>
  ),
  USER_DELETED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
  ),
  STATUS_CHANGED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
};

export default function LogsTable() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<LogAction | "all">("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("30d");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const byDate = filterByDate(MOCK_LOGS, dateFilter);
    return byDate
      .filter((e) => actionFilter === "all" || e.action === actionFilter)
      .filter(
        (e) =>
          !q ||
          e.usuario.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.detalhes.toLowerCase().includes(q) ||
          e.ip.includes(q),
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [search, actionFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function handleSearch(v: string) { setSearch(v); setPage(1); }
  function handleAction(v: LogAction | "all") { setActionFilter(v); setPage(1); }
  function handleDate(v: DateFilter) { setDateFilter(v); setPage(1); }

  const byDate30 = filterByDate(MOCK_LOGS, "30d");
  const todayCount   = filterByDate(MOCK_LOGS, "today").length;
  const warningCount = byDate30.filter((e) => e.level === "warning").length;
  const errorCount   = byDate30.filter((e) => e.level === "error").length;
  const uniqueUsers  = new Set(byDate30.map((e) => e.email)).size;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Eventos hoje"    value={String(todayCount)}   color="blue"   icon="clock"  />
        <StatCard label="Avisos (30d)"    value={String(warningCount)} color="amber"  icon="warn"   />
        <StatCard label="Erros (30d)"     value={String(errorCount)}   color="red"    icon="error"  />
        <StatCard label="Usuários ativos" value={String(uniqueUsers)}  color="slate"  icon="users"  />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center gap-3">
          <h2 className="text-base font-bold text-slate-900 shrink-0 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            Registro de eventos
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {filtered.length}
            </span>
          </h2>

          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar usuário, IP ou detalhe..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-colors w-full sm:w-56"
              />
            </div>

            <select
              value={actionFilter}
              onChange={(e) => handleAction(e.target.value as LogAction | "all")}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors text-slate-700"
            >
              <option value="all">Todas as ações</option>
              {(Object.keys(ACTION_CONFIG) as LogAction[]).map((a) => (
                <option key={a} value={a}>{ACTION_CONFIG[a].label}</option>
              ))}
            </select>

            <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-slate-50 text-sm">
              {DATE_FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleDate(opt.value)}
                  className={`px-3 py-2 font-medium transition-colors ${
                    dateFilter === opt.value
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Ação", "Usuário", "Detalhes", "IP", "Data / Hora", "Nível"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length > 0 ? (
                paginated.map((entry) => {
                  const cfg = ACTION_CONFIG[entry.action];
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.className}`}>
                          {ACTION_ICONS[entry.action]}
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${getAvatarColor(entry.email)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {getInitials(entry.usuario)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">{entry.usuario}</p>
                            <p className="text-xs text-slate-400">{entry.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 max-w-xs">
                        <p className="text-xs text-slate-600 leading-relaxed">{entry.detalhes}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                          {entry.ip}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="text-xs text-slate-500">{formatTimestamp(entry.timestamp)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_CONFIG[entry.level].className}`}>
                          {LEVEL_CONFIG[entry.level].label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <p className="text-sm font-medium">Nenhum evento encontrado</p>
                      <p className="text-xs">Tente ajustar os filtros ou o período selecionado.</p>
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
              <span className="font-semibold text-slate-700">{filtered.length}</span> eventos
            </p>
            <div className="flex items-center gap-1">
              <PageButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Anterior">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PageButton key={n} onClick={() => setPage(n)} active={n === safePage}>{n}</PageButton>
              ))}
              <PageButton onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Próxima">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </PageButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  const colorMap: Record<string, string> = {
    blue:  "bg-blue-100  text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    red:   "bg-red-100   text-red-600",
    slate: "bg-slate-100 text-slate-500",
  };
  const icons: Record<string, React.ReactNode> = {
    clock: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    warn:  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
    error: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
    users: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        {icons[icon]}
      </div>
      <div>
        <p className="text-xl font-extrabold text-slate-900 leading-tight">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function PageButton({
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
