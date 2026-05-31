'use server';

import prisma from '@/lib/prisma';

export async function getExame(cpf: string, protocolo: string) {
    const digits = cpf.replace(/\D/g, '');
    const normalized = protocolo.trim().toUpperCase();
    return prisma.exame.findFirst({
        where: { cpf: digits, protocolo: normalized },
    });
}
