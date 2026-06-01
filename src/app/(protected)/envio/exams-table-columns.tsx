'use client';

import type { ExameRow } from '@/app/(protected)/envio/actions/get-exams';
import { formatCPF } from '@/helpers/cpf';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownTrigger,
} from '@/components/ui/dropdown';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Link2, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ColumnOptions {
    onView: (row: ExameRow) => void;
    onCopyLink: (row: ExameRow) => void;
    onWhatsApp: (row: ExameRow) => void;
    onDelete: (row: ExameRow) => void;
}

// ─── Columns factory ─────────────────────────────────────────────────────────

export function getColumns(options: ColumnOptions): ColumnDef<ExameRow>[] {
    return [
        {
            accessorKey: 'protocolo',
            header: 'Protocolo',
            cell: ({ row }) => (
                <span className="text-xs font-mono font-semibold text-slate-700">
                    {row.original.protocolo}
                </span>
            ),
        },
        {
            id: 'paciente',
            header: 'Paciente',
            cell: ({ row }) => (
                <span className="text-sm font-semibold text-slate-800 leading-tight">
                    {row.original.paciente}
                </span>
            ),
        },
        {
            id: 'cpf',
            header: 'CPF',
            cell: ({ row }) => (
                <span className="text-xs text-slate-400 font-mono mt-0.5">
                    {formatCPF(row.original.cpf)}
                </span>
            ),
        },
        {
            id: 'createdAt',
            header: 'Adicionado em',
            cell: ({ row }) => (
                <span className="text-xs text-slate-400 font-mono mt-0.5">
                    {new Date(row.original.createdAt).toLocaleDateString('pt-BR')}
                </span>
            ),
        },
        {
            id: 'actions',
            header: () => null,
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <Dropdown>
                        <DropdownTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                        </DropdownTrigger>

                        <DropdownContent align="right">
                            <DropdownItem
                                icon={<Eye className="w-4 h-4" />}
                                onClick={() => options.onView(row.original)}
                            >
                                Visualizar
                            </DropdownItem>
                            <DropdownItem
                                icon={<Link2 className="w-4 h-4" />}
                                onClick={() => options.onCopyLink(row.original)}
                            >
                                Copiar link
                            </DropdownItem>
                            <DropdownItem
                                icon={<MessageSquare className="w-4 h-4" />}
                                onClick={() => options.onWhatsApp(row.original)}
                            >
                                Reenviar mensagem
                            </DropdownItem>
                            <DropdownSeparator />
                            <DropdownItem
                                icon={<Trash2 className="w-4 h-4" />}
                                danger
                                onClick={() => options.onDelete(row.original)}
                            >
                                Remover
                            </DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                </div>
            ),
        },
    ];
}
