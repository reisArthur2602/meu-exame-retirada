import Link from 'next/link';
import ExameForm from './exame-form';

export default function PatientRoute() {
    return (
        <div className="min-h-screen flex">
            {/* Left — form */}
            <div className="flex-1 flex flex-col bg-white">
                <div className="px-8 py-6 lg:px-12">
                    <Link href="/" className="inline-flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                />
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-slate-900">MeuExame</span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center px-8 lg:px-12 py-8">
                    <div className="w-full max-w-sm">
                        <ExameForm />
                    </div>
                </div>

                <div className="px-8 py-6 lg:px-12 text-center">
                    <p className="text-xs text-slate-400">
                        Problemas para acessar?{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Entre em contato com o laboratório
                        </a>
                    </p>
                </div>
            </div>

            {/* Right — showcase */}
            <div className="hidden lg:flex lg:w-[52%] bg-linear-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/25" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-900/40" />

                <div className="relative z-10 flex flex-col p-12 xl:p-16 h-full w-full">
                    <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full text-sm font-medium text-white w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Área do paciente
                    </div>

                    <div className="mt-auto mb-auto pt-16">
                        <h2 className="text-3xl xl:text-[2.6rem] font-extrabold text-white leading-tight mb-4">
                            Seu exame está pronto. Acesse agora.
                        </h2>
                        <p className="text-blue-200 text-base leading-relaxed mb-10">
                            Informe seu CPF e o protocolo recebido do laboratório para visualizar e
                            baixar seu laudo com segurança.
                        </p>

                        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/40 border border-blue-400/30 flex items-center justify-center shrink-0">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">
                                            Hemograma Completo
                                        </p>
                                        <p className="text-xs text-blue-300 mt-0.5">
                                            Laboratório São Lucas
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    DISPONÍVEL
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-xs text-blue-300 mb-0.5">Coleta</p>
                                    <p className="text-sm font-medium text-white">27/05/2026</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-300 mb-0.5">Disponível desde</p>
                                    <p className="text-sm font-medium text-white">28/05/2026</p>
                                </div>
                            </div>

                            <button
                                disabled
                                className="w-full flex items-center justify-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-semibold py-2.5 rounded-xl cursor-default"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    />
                                </svg>
                                Baixar laudo em PDF
                            </button>
                        </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                        <p className="text-xs text-blue-400">© 2026 MeuExame</p>
                        <div className="flex items-center gap-1.5 text-xs text-blue-400">
                            <svg
                                className="w-3.5 h-3.5 text-emerald-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Conexão segura · SSL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
