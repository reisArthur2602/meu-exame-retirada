'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { formatCPF, isValidCPF } from '@/helpers/cpf';
import { ArrowRight, HelpCircle, Loader, Lock, Search } from 'lucide-react';
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
            `/app/exame?cpf=${encodeURIComponent(cpf)}&protocolo=${encodeURIComponent(protocolo)}`
        );
    }

    return (
        <section className="pt-40 pb-16 bg-linear-to-b from-blue-50 to-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                            Retire seu exame <span className="text-blue-600">em 10 segundos</span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Digite seu <strong>CPF</strong> e o <strong>protocolo</strong> entregue
                            pela clínica. Baixe o laudo em PDF e compartilhe com seu médico por um
                            link seguro. Pronto — sem filas, sem ligações, sem papelada.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl shadow-xl shadow-blue-100 border border-slate-100 p-5 sm:p-6 mb-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Search className="size-4 text-blue-600" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    Acessar meu exame
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3 mb-4">
                                <div>
                                    <label
                                        htmlFor="hero-cpf"
                                        className="block text-xs font-semibold text-slate-600 mb-1.5"
                                    >
                                        CPF
                                    </label>
                                    <Input
                                        id="hero-cpf"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="000.000.000-00"
                                        value={cpf}
                                        onChange={(e) => setCpf(formatCPF(e.target.value))}
                                        disabled={loading}
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
                                    <Input
                                        id="hero-protocolo"
                                        type="text"
                                        placeholder="EX2026001234"
                                        value={protocolo}
                                        onChange={(e) =>
                                            setProtocolo(formatProtocolo(e.target.value))
                                        }
                                        disabled={loading}
                                    />
                                    {touched && !protocoloValid && (
                                        <p className="text-xs text-red-500 mt-1">
                                            Protocolo inválido
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || (touched && !canSubmit)}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="size-4 animate-spin" />
                                        Buscando exame...
                                    </>
                                ) : (
                                    <>
                                        Acessar meu exame
                                        <ArrowRight className="size-4" />
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
                                <HelpCircle className="size-3.5 text-slate-400 shrink-0" />
                                Não tem o protocolo? Olhe no comprovante de entrega ou WhatsApp da
                                clínica.
                            </p>
                        </form>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    MS
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 truncate">
                                        Maria Aparecida Silva
                                    </p>
                                    <p className="text-xs text-slate-500">Protocolo EX2026001234</p>
                                </div>
                                <span className="ml-auto text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full shrink-0">
                                    Disponível
                                </span>
                            </div>

                            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 mb-4 space-y-2.5">
                                <div className="flex items-baseline justify-between gap-3">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                                        Paciente
                                    </span>
                                    <span className="text-xs font-semibold text-slate-800 truncate">
                                        Maria Aparecida Silva
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between gap-3">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                                        CPF
                                    </span>
                                    <span className="text-xs font-mono font-semibold text-slate-800">
                                        •••.•••.789-09
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between gap-3">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                                        Protocolo
                                    </span>
                                    <span className="text-xs font-mono font-semibold text-slate-800">
                                        EX2026001234
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <button className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
                                    <svg
                                        className="w-3.5 h-3.5"
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
                                    Baixar PDF
                                </button>
                                <button className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 rounded-xl transition-colors">
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                        />
                                    </svg>
                                    Compartilhar
                                </button>
                            </div>

                            <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 flex items-center gap-2.5">
                                <svg
                                    className="w-4 h-4 text-blue-600 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                                <p className="text-xs text-blue-800 leading-snug">
                                    <span className="font-semibold">Link enviado por WhatsApp</span>{' '}
                                    — válido por 7 dias.
                                </p>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Lock className="size-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">Sem login</p>
                                <p className="text-xs text-slate-500">CPF + protocolo</p>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">10 segundos</p>
                                <p className="text-xs text-slate-500">do CPF ao PDF</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-100">
                    {[
                        { value: '10s', label: 'Tempo médio para retirar' },
                        { value: '500+', label: 'Clínicas e laboratórios' },
                        { value: '2M+', label: 'Exames já entregues' },
                        { value: '99.9%', label: 'Disponibilidade' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-extrabold text-blue-600">{stat.value}</p>
                            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
