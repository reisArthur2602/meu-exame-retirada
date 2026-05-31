import { Suspense } from 'react';
import UsuariosData from './usuarios-data';

interface Props {
    searchParams: Promise<{ page?: string; search?: string; role?: string }>;
}

export default async function UsuariosRoute({ searchParams }: Props) {
    const params = await searchParams;
    const page = Math.max(1, Number(params.page ?? '1'));
    const search = params.search ?? '';
    const role = (params.role ?? 'all') as 'all' | 'ADMIN' | 'MEMBER';

    return (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900">Gerenciamento de usuários</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Crie, edite, ative ou desative os acessos ao painel da clínica.
                </p>
            </div>
            <Suspense fallback={<TableSkeleton />}>
                <UsuariosData page={page} search={search} role={role} />
            </Suspense>
        </main>
    );
}

function TableSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0" />
                        <div className="space-y-2">
                            <div className="h-5 w-10 bg-slate-200 rounded" />
                            <div className="h-3 w-24 bg-slate-100 rounded" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="h-4 w-36 bg-slate-200 rounded-lg" />
                    <div className="flex gap-2">
                        <div className="h-9 w-56 bg-slate-200 rounded-xl" />
                        <div className="h-9 w-32 bg-slate-200 rounded-xl" />
                        <div className="h-9 w-28 bg-slate-200 rounded-xl" />
                    </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="px-5 py-4 flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-3 w-36 bg-slate-200 rounded" />
                                <div className="h-2.5 w-48 bg-slate-100 rounded" />
                            </div>
                            <div className="h-5 w-16 bg-slate-200 rounded-full" />
                            <div className="h-5 w-14 bg-slate-200 rounded-full" />
                            <div className="h-3 w-20 bg-slate-100 rounded" />
                            <div className="flex gap-1">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div key={j} className="h-7 w-7 bg-slate-100 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
