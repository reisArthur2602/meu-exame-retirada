'use client';

import { formatCPF, isValidCPF } from '@/helpers/cpf';
import { ArrowRight, HelpCircle, Lock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function formatProtocolo(value: string): string {
    return value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 14);
}

export default function Hero() {
    const router = useRouter();
    const [cpf, setCpf] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);

    const cpfValid = isValidCPF(cpf);
    const protocoloValid = protocolo.length >= 8;
    const canSubmit = cpfValid && protocoloValid;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setTouched(true);
        if (!canSubmit) return;
        setLoading(true);
        router.push(
            `/exame?cpf=${encodeURIComponent(cpf)}&protocolo=${encodeURIComponent(protocolo)}`
        );
    }

    return (
        <section className="relative min-h-[calc(100dvh-4rem)] pt-24 pb-16 flex items-center overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-50 to-white -z-10" />
            <div className="absolute -top-32 -left-32 size-150 rounded-full bg-blue-100/50 blur-3xl -z-10" />
            <div className="absolute -bottom-20 -right-20 size-125 rounded-full bg-indigo-100/40 blur-3xl -z-10" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-75 rounded-full bg-sky-100/30 blur-2xl -z-10" />
            <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                    Seu resultado está
                    <br />
                    <span className="text-blue-600">pronto para você</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto">
                    Digite o <strong className="text-slate-700">CPF</strong> do paciente e o{' '}
                    <strong className="text-slate-700">protocolo</strong> recebido da clínica para
                    acessar o laudo.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-slate-100 p-5 sm:p-7 text-left mb-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Search className="size-4 text-blue-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Acessar meu exame</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div>
                            <label
                                htmlFor="hero-cpf"
                                className="block text-xs font-semibold text-slate-600 mb-1.5"
                            >
                                CPF do paciente
                            </label>
                            <input
                                id="hero-cpf"
                                type="text"
                                inputMode="numeric"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(formatCPF(e.target.value))}
                                disabled={loading}
                                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-colors disabled:opacity-60 ${
                                    touched && !cpfValid
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                }`}
                            />
                            {touched && !cpfValid && (
                                <p className="text-xs text-red-500 mt-1">CPF inválido</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="hero-protocolo"
                                className="block text-xs font-semibold text-slate-600 mb-1.5"
                            >
                                Protocolo
                            </label>
                            <input
                                id="hero-protocolo"
                                type="text"
                                placeholder="EX2026001234"
                                value={protocolo}
                                onChange={(e) => setProtocolo(formatProtocolo(e.target.value))}
                                disabled={loading}
                                className={`w-full px-3.5 py-2.5 text-sm font-mono tracking-wider rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-colors disabled:opacity-60 ${
                                    touched && !protocoloValid
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                }`}
                            />
                            {touched && !protocoloValid && (
                                <p className="text-xs text-red-500 mt-1">Protocolo inválido</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || (touched && !canSubmit)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-200/70"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="size-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Buscando exame...
                            </>
                        ) : (
                            <>
                                Acessar meu exame
                                <ArrowRight className="size-4" />
                            </>
                        )}
                    </button>

                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5 mx-auto w-fit">
                        <HelpCircle className="size-3.5 shrink-0" />
                        Protocolo no comprovante ou WhatsApp da clínica.
                    </p>
                </form>


            </div>
        </section>
    );
}
