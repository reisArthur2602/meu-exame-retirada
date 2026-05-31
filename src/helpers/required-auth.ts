'use server';

import { redirect } from 'next/navigation';
import { getSession } from './get-session';

export async function requiredAuth() {
    const session = await getSession();
    if (!session) redirect('/app/login');
}
