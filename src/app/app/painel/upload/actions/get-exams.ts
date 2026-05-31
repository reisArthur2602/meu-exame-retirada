'use server';

import { requiredAuth } from '@/helpers/required-auth';
import prisma from '@/lib/prisma';

export interface ExameRow {
    id: string;
    protocolo: string;
    paciente: string;
    cpf: string;
    telefone: string | null;
    arquivoUrl: string | null;
    createdAt: Date;
}

export interface GetExamsParams {
    page: number;
    perPage: number;
    search?: string;
}

export async function getExams({ page, perPage, search }: GetExamsParams) {
    await requiredAuth();

    const safePage = Math.max(1, page);
    const safePerPage = Math.max(1, Math.min(100, perPage));
    const q = search?.trim();
    const cpfDigits = q?.replace(/\D/g, '') ?? '';

    const where = {
        ...(q
            ? {
                  OR: [
                      { nome: { contains: q, mode: 'insensitive' as const } },
                      { protocolo: { contains: q, mode: 'insensitive' as const } },
                      ...(cpfDigits.length > 0 ? [{ cpf: { contains: cpfDigits } }] : []),
                  ],
              }
            : {}),
    };

    const [total, rows] = await Promise.all([
        prisma.exame.count({ where }),
        prisma.exame.findMany({
            where,
            select: {
                id: true,
                protocolo: true,
                nome: true,
                cpf: true,
                telefone: true,
                arquivoUrl: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            skip: (safePage - 1) * safePerPage,
            take: safePerPage,
        }),
    ]);

    return {
        data: rows.map((r) => ({
            id: r.id,
            protocolo: r.protocolo,
            paciente: r.nome,
            cpf: r.cpf,
            telefone: r.telefone,
            arquivoUrl: r.arquivoUrl,
            createdAt: r.createdAt,
        })),
        meta: {
            page: safePage,
            perPage: safePerPage,
            total,
            totalPages: Math.max(1, Math.ceil(total / safePerPage)),
        },
    };
}
