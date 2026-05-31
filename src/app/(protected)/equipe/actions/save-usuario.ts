'use server';

import { Role } from '@/generated/prisma/enums';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export interface CreateUsuarioInput {
    nome: string;
    email: string;
    role: Role;
    senha: string;
}

export interface UpdateUsuarioInput {
    id: string;
    nome: string;
    role: Role;
}

export async function createUsuario(input: CreateUsuarioInput): Promise<void> {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new Error('Já existe um usuário com este e-mail.');

    const passwordHash = await bcrypt.hash(input.senha, 12);

    await prisma.user.create({
        data: {
            nome: input.nome,
            email: input.email,
            role: input.role,
            passwordHash,
        },
    });
}

export async function updateUsuario(input: UpdateUsuarioInput): Promise<void> {
    await prisma.user.update({
        where: { id: input.id },
        data: {
            nome: input.nome,
            role: input.role,
        },
    });
}

export async function toggleUsuarioStatus(id: string): Promise<void> {
    const user = await prisma.user.findUniqueOrThrow({ where: { id }, select: { status: true } });

    await prisma.user.update({
        where: { id },
        data: { status: user.status === 'ativo' ? 'inativo' : 'ativo' },
    });
}

export async function deleteUsuario(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
}
