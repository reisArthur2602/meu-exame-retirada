'use client';

import type { ExameRow } from './actions/get-exams';
import type { ExameMeta } from './exame-data';
import { PER_PAGE } from './exame-data';
import { PaginationButton } from '@/components/ui/pagination-button';
import SearchInput from '@/components/ui/search-input';
import { formatPhone } from '@/helpers/format-phone';
import { formatCPF } from '@/lib/cpf';
import { buildWhatsAppMessage, openWhatsApp, printReceipt } from '@/lib/notificacao';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { getColumns } from './exames-table-columns';

interface ExamesTableProps {
    data: ExameRow[];
    meta: ExameMeta;
}

export default function ExamesTable({ data, meta }: ExamesTableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsRef = useRef(searchParams);
    searchParamsRef.current = searchParams;

    // ─── URL state ──────────────────────────────────────────────────────────

    const page = meta.page;
    const search = searchParams.get('search') ?? '';

    // ─── Local search input (debounced → URL) ────────────────────────────────

    const [searchInput, setSearchInput] = useState(search);
    const didMountRef = useRef(false);

    useEffect(() => {
        if (!didMountRef.current) { didMountRef.current = true; return; }
        const id = setTimeout(() => {
            const params = new URLSearchParams(searchParamsRef.current.toString());
            if (searchInput) params.set('search', searchInput);
            else params.delete('search');
            params.set('page', '1');
            router.push(`?${params.toString()}`);
        }, 300);
        return () => clearTimeout(id);
    }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Phone popover state ─────────────────────────────────────────────────

    const [phonePopoverId, setPhonePopoverId] = useState<string | null>(null);
    const [phoneInput, setPhoneInput] = useState('');
    const phoneInputRef = useRef<HTMLInputElement>(null);

    // ─── URL helpers ─────────────────────────────────────────────────────────

    function updateParams(updates: Record<string, string | null>) {
        const params = new URLSearchParams(searchParamsRef.current.toString());
        for (const [key, value] of Object.entries(updates)) {
            if (value === null) params.delete(key);
            else params.set(key, value);
        }
        router.push(`?${params.toString()}`);
    }

    // ─── Action handlers ─────────────────────────────────────────────────────

    function handleView(row: ExameRow) {
        router.push(
            `/app/exame?cpf=${encodeURIComponent(row.cpf)}&protocolo=${encodeURIComponent(row.protocolo)}`,
        );
    }

    function handleDownload(row: ExameRow) {
        if (row.arquivoUrl) window.open(row.arquivoUrl, '_blank', 'noopener');
    }

    function handleWhatsApp(row: ExameRow) {
        if (row.telefone) {
            const firstName = row.paciente.trim().split(' ')[0];
            openWhatsApp(row.telefone, buildWhatsAppMessage(firstName, row.protocolo));
        } else {
            setPhoneInput('');
            setPhonePopoverId(row.id);
            setTimeout(() => phoneInputRef.current?.focus(), 50);
        }
    }

    function handlePhoneSubmit(row: ExameRow) {
        const digits = phoneInput.replace(/\D/g, '');
        if (digits.length < 10) return;
        const firstName = row.paciente.trim().split(' ')[0];
        openWhatsApp(phoneInput, buildWhatsAppMessage(firstName, row.protocolo));
        setPhonePopoverId(null);
        setPhoneInput('');
    }

    function handlePrint(row: ExameRow) {
        printReceipt(row.paciente, formatCPF(row.cpf), row.protocolo);
    }

    // ─── Table ───────────────────────────────────────────────────────────────

    const columns = useMemo(
        () =>
            getColumns({
                onView: handleView,
                onDownload: handleDownload,
                onWhatsApp: handleWhatsApp,
                onPrint: handlePrint,
            }),
        [], // handlers fecham sobre refs estáveis (setters, router, imports)
    );

    const table = useReactTable({
        data,
        columns,
        pageCount: meta.totalPages,
        state: {
            pagination: { pageIndex: page - 1, pageSize: PER_PAGE },
        },
        onPaginationChange: (updater) => {
            const next =
                typeof updater === 'function'
                    ? updater({ pageIndex: page - 1, pageSize: PER_PAGE })
                    : updater;
            updateParams({ page: String(next.pageIndex + 1) });
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    });

    // ─── Render ──────────────────────────────────────────────────────────────

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex sm:items-center gap-3 justify-between">
                <h2 className="text-base font-bold text-slate-900 shrink-0">Exames enviados</h2>
                <SearchInput
                    placeholder="Buscar paciente, CPF ou protocolo..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full sm:w-72"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-150">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/60">
                            {table.getHeaderGroups().map((hg) =>
                                hg.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${
                                            header.id === 'actions' ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                )),
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <Fragment key={row.original.id}>
                                    <tr className="hover:bg-slate-50/60 transition-colors">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-5 py-3.5">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>

                                    {phonePopoverId === row.original.id && (
                                        <tr className="bg-green-50">
                                            <td colSpan={columns.length} className="px-5 py-3">
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
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handlePhoneSubmit(row.original);
                                                            if (e.key === 'Escape') setPhonePopoverId(null);
                                                        }}
                                                        className="px-3 py-1.5 text-sm rounded-lg border border-green-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none w-44"
                                                    />
                                                    <button
                                                        onClick={() => handlePhoneSubmit(row.original)}
                                                        disabled={phoneInput.replace(/\D/g, '').length < 10}
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
                                </Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-5 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                        <p className="text-sm font-medium">Nenhum exame encontrado</p>
                                        <p className="text-xs">Tente ajustar a busca.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {meta.total > 0 && (
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        Mostrando{' '}
                        <span className="font-semibold text-slate-700">
                            {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, meta.total)}
                        </span>{' '}
                        de{' '}
                        <span className="font-semibold text-slate-700">{meta.total}</span>{' '}
                        exames
                    </p>

                    <div className="flex items-center gap-2">
                        <PaginationButton
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            aria-label="Página anterior"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </PaginationButton>

                        <span className="text-sm text-slate-600 tabular-nums">
                            Página <span className="font-semibold">{meta.page}</span> de{' '}
                            <span className="font-semibold">{meta.totalPages}</span>
                        </span>

                        <PaginationButton
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            aria-label="Próxima página"
                        >
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
