'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { formatCPF, isValidCPF } from '@/helpers/cpf';
import { ArrowRight, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function formatProtocolo(value: string): string {
    return value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 14);
}

export default function CTABanner() {
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
        <section
            id="retirar"
            className="py-20 bg-linear-to-br from-blue-600 to-blue-700 relative overflow-hidden"
        >
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                    Seu exame está a 10 segundos de distância
                </h2>
                <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                    Tem o protocolo em mãos? Digite agora e baixe o laudo na hora.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-5 sm:p-6 mb-6 text-left"
                >
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div>
                            <label
                                htmlFor="cta-cpf"
                                className="block text-xs font-semibold text-slate-600 mb-1.5"
                            >
                                CPF
                            </label>
                            <Input
                                id="cta-cpf"
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
                                htmlFor="cta-protocolo"
                                className="block text-xs font-semibold text-slate-600 mb-1.5"
                            >
                                Protocolo
                            </label>
                            <Input
                                id="cta-protocolo"
                                type="text"
                                placeholder="EX2026001234"
                                value={protocolo}
                                onChange={(e) => setProtocolo(formatProtocolo(e.target.value))}
                                disabled={loading}
                            />
                            {touched && !protocoloValid && (
                                <p className="text-xs text-red-500 mt-1">Protocolo inválido</p>
                            )}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={loading || (touched && !canSubmit)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg"
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
                </form>
            </div>
        </section>
    );
}
