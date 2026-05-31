import { Suspense } from 'react';
import ExameData from './exame-data';
import UploadForm from './upload-form';

interface Props {
    searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function UploadRoute({ searchParams }: Props) {
    const params = await searchParams;
    const page = Math.max(1, Number(params.page ?? '1'));
    const search = params.search ?? '';

    return (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900">Enviar novo exame</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Preencha os dados do paciente e faça o upload do laudo em PDF.
                </p>
            </div>
            <UploadForm />
            <Suspense fallback={<TableSkeleton />}>
                <ExameData page={page} search={search} />
            </Suspense>
        </main>
    );
}

function TableSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="h-4 w-32 bg-slate-200 rounded-lg" />
                <div className="h-9 w-64 bg-slate-200 rounded-xl" />
            </div>
            <div className="divide-y divide-slate-50">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="px-5 py-4 flex items-center gap-4">
                        <div className="h-3 w-28 bg-slate-200 rounded" />
                        <div className="flex-1 space-y-1.5">
                            <div className="h-3 w-40 bg-slate-200 rounded" />
                            <div className="h-2.5 w-28 bg-slate-100 rounded" />
                        </div>
                        <div className="h-5 w-20 bg-slate-200 rounded-full" />
                        <div className="flex gap-1">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <div key={j} className="h-7 w-7 bg-slate-100 rounded-lg" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
