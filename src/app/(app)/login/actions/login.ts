'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'meu_exame_session';

export async function login({ email, password, remember }: LoginRequest) {
    const user = await prisma.user.findUnique({
        where: { email, status: 'ativo' },
        select: {
            id: true,
            nome: true,
            email: true,
            role: true,
            passwordHash: true,
        },
    });

    if (!user) throw new Error('E-mail ou senha incorretos.');

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) throw new Error('E-mail ou senha incorretos.');

    const expiresIn = remember ? '30d' : '8h';

    const token = jwt.sign(
        {
            sub: user.id,
        },
        JWT_SECRET,
        { expiresIn }
    );

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8,
    });
}
