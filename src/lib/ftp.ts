import { Client } from 'basic-ftp';
import { Readable } from 'node:stream';

interface UploadToFtpParams {
    /** Conteúdo binário do arquivo. */
    buffer: Buffer;
    /** Nome do arquivo no destino, ex: "EX2026001234.pdf". */
    fileName: string;
}

function getConfig() {
    const host = process.env.FTP_HOST;
    const user = process.env.FTP_USER;
    const password = process.env.FTP_PASSWORD;

    if (!host || !user || !password) {
        throw new Error('Configuração de FTP ausente. Verifique as variáveis FTP_*.');
    }

    return {
        host,
        user,
        password,
        port: Number(process.env.FTP_PORT ?? 21),
        secure: process.env.FTP_SECURE === 'true',
        baseDir: process.env.FTP_BASE_DIR ?? '/',
        publicUrl: (process.env.FTP_PUBLIC_URL ?? '').replace(/\/$/, ''),
    };
}

/**
 * Envia um arquivo para o servidor FTP e retorna a URL pública de acesso.
 */
export async function uploadToFtp({ buffer, fileName }: UploadToFtpParams): Promise<string> {
    const config = getConfig();
    const client = new Client();
    // Sem logs verbosos em produção
    client.ftp.verbose = process.env.NODE_ENV !== 'production';

    try {
        await client.access({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            secure: config.secure,
        });

        // Garante (e entra) no diretório de destino, criando se necessário
        await client.ensureDir(config.baseDir);

        await client.uploadFrom(Readable.from(buffer), fileName);

        return `${config.publicUrl}/${fileName}`;
    } finally {
        client.close();
    }
}
