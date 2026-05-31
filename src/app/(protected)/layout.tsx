import AppHeader from '@/components/app-header';
import { requiredAuth } from '@/helpers/required-auth';
import { PropsWithChildren } from 'react';

export const dynamic = 'force-dynamic';

const ProtectedRoutes = async ({ children }: PropsWithChildren) => {
    await requiredAuth();
    return (
        <div className="flex-1 bg-slate-100 flex flex-col">
            <AppHeader active="envio" />
            {children}
        </div>
    );
};

export default ProtectedRoutes;
