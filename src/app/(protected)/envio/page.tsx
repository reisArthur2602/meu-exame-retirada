import { Suspense } from 'react';
import { ExamsTableSkeleton } from './exam-table-skeleton';
import ExameData from './exams-data';
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
            <Suspense fallback={<ExamsTableSkeleton />}>
                <ExameData page={page} search={search} />
            </Suspense>
        </main>
    );
}
