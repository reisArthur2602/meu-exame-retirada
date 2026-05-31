'use server';

import type { Role } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import { getSession } from './get-session';

export async function hasPermission(...allowedRoles: Role[]) {
    const session = await getSession();

    const user = await prisma.user.findUnique({
        where: { id: session?.user.id },
        select: { role: true },
    });

    if (!allowedRoles.includes(user?.role as Role)) return null;
}
