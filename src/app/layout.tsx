import { ReactQuery } from '@/integrations/react-query';
import type { Metadata } from 'next';
import { Geist_Mono, Manrope } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const manrope = Manrope({
    variable: '--font-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'MeuExame — Retire seus exames online com facilidade',
    description:
        'Plataforma rápida e segura para retirada de resultados de exames laboratoriais e de imagem. Acesse seus laudos a qualquer hora, de qualquer lugar.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactQuery>
            <Toaster expand richColors />
            <html lang="pt-BR">
                <body
                    className={`${manrope.variable} ${geistMono.variable} min-h-dvh flex flex-col`}
                >
                    {children}
                </body>
            </html>
        </ReactQuery>
    );
}
