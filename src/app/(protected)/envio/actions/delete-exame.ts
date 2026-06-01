'use server';

import { requiredAuth } from '@/helpers/required-auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteExame(id: string): Promise<void> {
    await requiredAuth();
    await prisma.exame.delete({ where: { id } });
    revalidatePath('/envio');
}
