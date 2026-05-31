import Link from 'next/link';
import LoginForm from './login-form';

export default function LoginRoute() {
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
                        <span className="text-[11px] font-bold tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">
                            Equipe
                        </span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center px-8 lg:px-12 py-8">
                    <div className="w-full max-w-sm">
                        <LoginForm />
                    </div>
                </div>

                <div className="px-8 py-6 lg:px-12 text-center">
                    <p className="text-xs text-slate-400">
                        Problemas de acesso?{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Contate o administrador do sistema
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
                        Painel da equipe
                    </div>

                    <div className="mt-auto mb-auto pt-16">
                        <h2 className="text-3xl xl:text-[2.6rem] font-extrabold text-white leading-tight mb-4">
                            Gerencie exames e notificações em um só lugar.
                        </h2>
                        <p className="text-blue-200 text-base leading-relaxed mb-10">
                            Faça upload de laudos, gerencie pacientes e notifique via WhatsApp pela
                            Central de Atendimento.
                        </p>

                        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-blue-300 mb-0.5">
                                        Protocolo #EX2026001234
                                    </p>
                                    <p className="font-semibold text-white">
                                        Maria Oliveira Santos
                                    </p>
                                    <p className="text-xs text-blue-300 mt-0.5">***.456.789-**</p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    DISPONÍVEL
                                </span>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/40 flex items-center justify-center shrink-0">
                                    <svg
                                        className="w-4 h-4 text-green-300"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.849L.057 23.882l6.196-1.624A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.581-.505-5.065-1.38l-.362-.214-3.68.965.981-3.594-.237-.381A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-white font-medium">
                                        Enviado via WhatsApp
                                    </p>
                                    <p className="text-xs text-blue-300">
                                        Hemograma Completo · há 3 min
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30 px-2 py-0.5 rounded-full">
                                        ENTREGUE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-blue-400 mt-auto">
                        © 2026 MeuExame · Uso restrito a colaboradores autorizados
                    </p>
                </div>
            </div>
        </div>
    );
}
