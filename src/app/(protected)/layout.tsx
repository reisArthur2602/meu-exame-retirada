import AppHeader from '@/components/app-header';
import { requiredAuth } from '@/helpers/required-auth';
import { PropsWithChildren } from 'react';

export const dynamic = 'force-dynamic';

const ProtectedRoutes = async ({ children }: PropsWithChildren) => {
    await requiredAuth();
    return (
        <div className="min-h-screen flex flex-col">
            {/* Ambient background — fixed so it persists on scroll */}
            <div className="fixed inset-0 bg-linear-to-b from-slate-50 to-white -z-10 pointer-events-none" />
            <div className="fixed -top-32 -left-32 size-150 rounded-full bg-blue-100/40 blur-3xl -z-10 pointer-events-none" />
            <div className="fixed top-1/2 -right-32 size-125 rounded-full bg-indigo-100/30 blur-3xl -z-10 pointer-events-none" />
            <AppHeader active="envio" />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

export default ProtectedRoutes;
