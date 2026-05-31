'use server';

import { requiredAuth } from '@/helpers/required-auth';
import prisma from '@/lib/prisma';

export type RoleFilter = 'all' | 'ADMIN' | 'MEMBER';

export interface UsuarioRow {
    id: string;
    nome: string;
    email: string;
    role: 'ADMIN' | 'MEMBER';
    status: 'ativo' | 'inativo';
    createdAt: Date;
}

export interface getTeamParams {
    page: number;
    perPage: number;
    search?: string;
    role?: RoleFilter;
}

export interface getTeamMeta {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    totalAtivos: number;
    totalAdmins: number;
    totalInativos: number;
}

export async function getTeam({ page, perPage, search, role }: getTeamParams) {
    await requiredAuth();

    const safePage = Math.max(1, page);
    const safePerPage = Math.max(1, Math.min(100, perPage));
    const q = search?.trim();

    const where = {
        ...(role && role !== 'all' ? { role } : {}),
        ...(q
            ? {
                  OR: [
                      { nome: { contains: q, mode: 'insensitive' as const } },
                      { email: { contains: q, mode: 'insensitive' as const } },
                  ],
              }
            : {}),
    };

    const [total, rows, totalAtivos, totalAdmins] = await Promise.all([
        prisma.user.count({ where }),
        prisma.user.findMany({
            where,
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            skip: (safePage - 1) * safePerPage,
            take: safePerPage,
        }),
        prisma.user.count({ where: { status: 'ativo' } }),
        prisma.user.count({ where: { role: 'ADMIN', status: 'ativo' } }),
    ]);

    return {
        data: rows.map((r) => ({
            id: r.id,
            nome: r.nome,
            email: r.email,
            role: r.role as 'ADMIN' | 'MEMBER',
            status: r.status as 'ativo' | 'inativo',
            createdAt: r.createdAt,
        })),
        meta: {
            page: safePage,
            perPage: safePerPage,
            total,
            totalPages: Math.max(1, Math.ceil(total / safePerPage)),
            totalAtivos,
            totalAdmins,
            totalInativos: total - totalAtivos,
        },
    };
}
