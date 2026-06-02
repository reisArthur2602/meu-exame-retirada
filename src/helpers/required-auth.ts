import { redirect } from 'next/navigation';
import { cache } from 'react';
import { getSession } from './get-session';

export const requiredAuth = cache(async () => {
    const session = await getSession();
    if (!session) redirect('/login');
});
