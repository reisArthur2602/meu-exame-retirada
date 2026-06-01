import { siteUrl } from '@/constants';
import { ReactQuery } from '@/integrations/react-query';
import type { Metadata } from 'next';
import { Geist_Mono, Inter, Manrope } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const manrope = Manrope({
    variable: '--font-sans',
    subsets: ['latin'],
    display: 'swap',
});

const geistMono = Geist_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'MeuExame — Retire seus exames online com facilidade',
        template: '%s | MeuExame',
    },

    description:
        'Plataforma rápida e segura para retirada de resultados de exames laboratoriais e de imagem. Acesse seus laudos a qualquer hora, de qualquer lugar.',

    metadataBase: new URL(siteUrl),

    alternates: {
        canonical: '/',
    },

    openGraph: {
        title: 'MeuExame — Retire seus exames online com facilidade',
        description:
            'Plataforma rápida e segura para retirada de resultados de exames laboratoriais e de imagem. Acesse seus laudos a qualquer hora, de qualquer lugar.',
        url: '/',
        siteName: 'MeuExame',
        locale: 'pt_BR',
        type: 'website',
    },

    icons: {
        icon: '/icon.png',
        shortcut: '/favicon.ico',
        apple: '/apple-icon.png',
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${manrope.variable} ${geistMono.variable} min-h-dvh flex flex-col`}>
                <ReactQuery>
                    <Toaster expand richColors />
                    {children}
                </ReactQuery>
            </body>
        </html>
    );
}
