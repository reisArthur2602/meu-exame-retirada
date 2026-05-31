'use server';

import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { cache } from 'react';

const COOKIE_NAME = 'meu_exame_session';

type Payload = {
    sub: string;
};

export const getSession = cache(async () => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET não configurado');
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    try {
        const { sub: userId } = jwt.verify(token, secret) as Payload;

        if (!userId) return null;

        const user = await prisma.user.findUnique({
            where: { id: userId, status: 'ativo' },
            select: {
                id: true,
                email: true,
                nome: true,
                role: true,
            },
        });

        if (!user) return null;

        return {
            user,
        };
    } catch {
        return null;
    }
});
