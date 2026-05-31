import { ArrowLeft, ChevronRight, FileText, ShieldCheck, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getExame } from './actions/get-exame';
import ExameCard from './exame-card';

interface PageProps {
    searchParams: Promise<{ cpf?: string; protocolo?: string }>;
}

export default async function ExameRoute({ searchParams }: PageProps) {
    const { cpf, protocolo } = await searchParams;

    if (!cpf || !protocolo) redirect('/app');

    const exame = await getExame(cpf, protocolo);
    const firstName = exame?.nome.trim().split(' ')[0];

    return (
        <div className="flex-1 bg-slate-100 flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-300">
                            <FileText className="size-4 text-white" />
                        </div>
                        <span className="font-bold text-lg text-slate-900 tracking-tight">
                            MeuExame
                        </span>
                    </Link>

                    <Link
                        href="/app"
                        className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 group"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="hidden sm:inline">Outro exame</span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-4 sm:px-6 py-10 sm:py-14">
                <div className="w-full max-w-lg mx-auto">
                    {exame ? (
                        <>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full mb-4 ring-1 ring-green-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Exame localizado
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                                    {firstName ? `Tudo certo, ${firstName} 👋` : 'Tudo certo 👋'}
                                </h1>
                                <p className="text-sm text-slate-500 mt-2">
                                    Aqui está o seu laudo. Baixe ou compartilhe quando precisar.
                                </p>
                            </div>

                            <ExameCard exame={exame} />

                            <p className="text-center text-xs text-slate-400 mt-6">
                                Dúvidas sobre o resultado?{' '}
                                <a href="#" className="text-blue-600 hover:underline font-medium">
                                    Entre em contato com o laboratório
                                </a>
                            </p>
                        </>
                    ) : (
                        <NotFound cpf={cpf} protocolo={protocolo} />
                    )}
                </div>
            </main>

            <footer className="px-4 py-6 text-center">
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-green-500" />
                    Conexão criptografada SSL 256-bit · LGPD
                </p>
            </footer>
        </div>
    );
}

function NotFound({ cpf, protocolo }: { cpf: string; protocolo: string }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 ring-1 ring-red-100 flex items-center justify-center mx-auto mb-5">
                <TriangleAlert className="size-7 text-red-500" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">Exame não encontrado</h2>
            <p className="text-sm text-slate-500 mb-6">
                Não localizamos nenhum exame com a combinação informada.
            </p>

            <dl className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-3 ring-1 ring-slate-100">
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs text-slate-500">CPF informado</dt>
                    <dd className="text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md ring-1 ring-slate-200">
                        {cpf}
                    </dd>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs text-slate-500">Protocolo informado</dt>
                    <dd className="text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md ring-1 ring-slate-200">
                        {protocolo}
                    </dd>
                </div>
            </dl>

            <ul className="text-xs text-slate-500 space-y-2 mb-8 text-left">
                {[
                    'Verifique se digitou o CPF e o protocolo corretamente.',
                    'O exame pode ainda estar em processamento — aguarde o aviso da clínica.',
                    'Se o problema persistir, fale com o laboratório onde realizou a coleta.',
                ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                        <ChevronRight className="size-3.5 text-slate-400 mt-0.5 shrink-0" />
                        {tip}
                    </li>
                ))}
            </ul>

            <Link
                href="/app"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-blue-200"
            >
                <ArrowLeft className="size-4" />
                Tentar novamente
            </Link>
        </div>
    );
}
