'use client';

import Button from '@/components/ui/button';
import FileDropzone from '@/components/ui/file-dropzone';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { formatCPF, isValidCPF } from '@/helpers/cpf';
import { formatPhone } from '@/helpers/format-phone';
import { buildWhatsAppMessage, openWhatsApp, printReceipt } from '@/helpers/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadExame } from './actions/upload-exame';

const uploadSchema = z.object({
    nome: z.string().min(3, 'Informe o nome completo do paciente.'),
    cpf: z.string().refine(isValidCPF, 'CPF inválido. Verifique e tente novamente.'),
    telefone: z.string().optional(),
    file: z
        .instanceof(File, { message: 'Selecione o arquivo PDF do exame.' })
        .refine((f) => f.type === 'application/pdf', 'Apenas arquivos PDF são aceitos.')
        .refine((f) => f.size <= 20 * 1024 * 1024, 'O arquivo deve ter no máximo 20 MB.'),
});

type UploadValues = z.infer<typeof uploadSchema>;

export default function UploadForm() {
    const [submitted, setSubmitted] = useState<{
        nome: string;
        cpf: string;
        telefone: string;
    } | null>(null);

    const form = useForm<UploadValues>({
        resolver: zodResolver(uploadSchema),
        defaultValues: { nome: '', cpf: '', telefone: '' },
    });

    const mutation = useMutation({
        mutationFn: async (values: UploadValues) => {
            await uploadExame({
                nome: values.nome,
                cpf: values.cpf.replace(/\D/g, ''),
                telefone: values.telefone || undefined,
                file: values.file,
            });
        },
        onSuccess: () => {
            const { nome, cpf, telefone } = form.getValues();
            setSubmitted({ nome, cpf, telefone: telefone ?? '' });
            toast.success('Exame enviado com sucesso!');
        },
        onError: (error: Error) => {
            toast.error('Erro ao enviar exame', { description: error.message });
        },
    });

    if (submitted) {
        const firstName = submitted.nome.trim().split(' ')[0];
        const hasPhone = submitted.telefone.replace(/\D/g, '').length >= 10;

        return (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                        <svg
                            className="w-7 h-7 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                        Exame enviado com sucesso!
                    </h3>
                    <p className="text-sm text-slate-500">
                        O laudo de{' '}
                        <span className="font-semibold text-slate-700">{submitted.nome}</span> já
                        está disponível para o paciente.
                    </p>
                </div>

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center mb-3">
                    Notificar paciente
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    <button
                        onClick={() =>
                            openWhatsApp(submitted.telefone, buildWhatsAppMessage(firstName, ''))
                        }
                        disabled={!hasPhone}
                        title={
                            !hasPhone
                                ? 'Informe o telefone do paciente para usar esta opção'
                                : undefined
                        }
                        className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                    >
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Enviar via WhatsApp
                    </button>

                    <button
                        onClick={() => printReceipt(submitted.nome, submitted.cpf, '')}
                        className="flex items-center justify-center gap-2.5 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                    >
                        <svg
                            className="w-5 h-5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                            />
                        </svg>
                        Imprimir comprovante
                    </button>
                </div>

                <div className="border-t border-slate-100 pt-5 text-center">
                    <button
                        onClick={() => {
                            setSubmitted(null);
                            form.reset();
                        }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Enviar outro exame
                    </button>
                </div>
            </div>
        );
    }

    const isPending = mutation.isPending;

    return (
        <div className="">
            

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
                    noValidate
                    className="space-y-5"
                >
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel>Nome completo do paciente</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Maria Aparecida Silva"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF do paciente</FormLabel>
                                    <FormControl>
                                        <Input
                                            inputMode="numeric"
                                            placeholder="000.000.000-00"
                                            disabled={isPending}
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(formatCPF(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Telefone / WhatsApp{' '}
                                        <span className="text-xs font-normal text-slate-400">
                                            (opcional)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-slate-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                            </div>
                                            <Input
                                                inputMode="tel"
                                                placeholder="(00) 00000-0000"
                                                disabled={isPending}
                                                className="pl-10"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(formatPhone(e.target.value))
                                                }
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Informe para habilitar o envio automático via WhatsApp.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field: { onChange, value, name, onBlur }, fieldState }) => (
                            <FormItem>
                                <FormLabel>Arquivo do exame (PDF)</FormLabel>
                                <FormControl>
                                    <FileDropzone
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending}
                                        error={!!fieldState.error}
                                        name={name}
                                        onBlur={onBlur}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg" loading={isPending} className="w-full">
                        {!isPending && (
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
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                        )}
                        {isPending ? 'Enviando...' : 'Enviar exame'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
