'use server';

import { generateProtocolo } from '@/helpers/generate-protocolo';
import { requiredAuth } from '@/helpers/required-auth';
import { uploadToFtp } from '@/lib/ftp';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const MAX_FILE_BYTES = 20 * 1024 * 1024;

export interface UploadExameInput {
    nome: string;
    cpf: string; // apenas dígitos
    telefone?: string;
    file: File;
}

export async function uploadExame(input: UploadExameInput): Promise<void> {
    await requiredAuth();

    // Validação defensiva no servidor
    if (input.file.type !== 'application/pdf') {
        throw new Error('Apenas arquivos PDF são aceitos.');
    }
    if (input.file.size > MAX_FILE_BYTES) {
        throw new Error('O arquivo deve ter no máximo 20 MB.');
    }

    const protocolo = generateProtocolo();

    // Envia o PDF para o FTP usando o protocolo como nome do arquivo
    const buffer = Buffer.from(await input.file.arrayBuffer());
    const arquivoUrl = await uploadToFtp({ buffer, fileName: `${protocolo}.pdf` });

    await prisma.exame.create({
        data: {
            protocolo,
            nome: input.nome,
            cpf: input.cpf,
            telefone: input.telefone ?? null,
            arquivoUrl,
        },
    });

    revalidatePath('/app/painel/upload');
}
