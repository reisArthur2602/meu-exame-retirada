import { Exame } from '@/generated/prisma/client';
import { formatCPF, maskCPF } from '@/helpers/cpf';
import DownloadButton from './download-button';
import ShareActions from './share-actions';

interface ExameCardProps {
    exame: Exame;
}

export default function ExameCard({ exame }: ExameCardProps) {
    const canDownload = !!exame.arquivoUrl;

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="bg-linear-to-br from-blue-600 to-blue-500 px-8 py-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1.5">
                        Resultado do exame
                    </p>
                    <h2 className="text-white text-xl font-extrabold leading-tight truncate">
                        {exame.nome}
                    </h2>
                </div>
            </div>

            <div className="px-8 py-6 space-y-6">
                <dl className="space-y-4">
                    <Field label="CPF" value={formatCPF(exame.cpf)} mono />
                    <Field label="Protocolo" value={exame.protocolo} mono />
                </dl>

                <div className="border-t border-slate-100" />

                {canDownload ? (
                    <div className="space-y-3">
                        <DownloadButton url={exame.arquivoUrl!} protocolo={exame.protocolo} />
                        <ShareActions protocolo={exame.protocolo} paciente={exame.nome} />
                    </div>
                ) : (
                    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center">
                        <p className="text-sm font-semibold text-amber-800 mb-1">
                            Resultado ainda não disponível
                        </p>
                        <p className="text-xs text-amber-700">
                            Você receberá um aviso assim que o laudo for liberado pela clínica.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-4">
            <dt className="text-xs text-slate-500 uppercase tracking-wider shrink-0">{label}</dt>
            <dd
                className={`text-sm font-semibold text-slate-800 text-right truncate ${mono ? 'font-mono tracking-wide' : ''}`}
            >
                {value}
            </dd>
        </div>
    );
}
