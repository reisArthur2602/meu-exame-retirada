import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'meu_exame_session';
const LOGIN_PATH = '/login';

export async function proxy(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) return redirectToLogin(request);

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch {
        const response = redirectToLogin(request);
        response.cookies.delete(COOKIE_NAME);
        return response;
    }
}

function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL(LOGIN_PATH, request.url);

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/envio', '/equipe'],
};
