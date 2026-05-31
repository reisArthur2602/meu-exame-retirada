'use client';

import Button from '@/components/ui/button';
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { type Role, type Usuario, ROLE_CONFIG } from '@/lib/usuarios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUsuario, updateUsuario } from './actions/save-usuario';

// ─── Schema ──────────────────────────────────────────────────────────────────

const baseSchema = z.object({
    nome: z.string().min(3, 'Informe o nome completo.'),
    role: z.enum(['ADMIN', 'MEMBER'] as const),
});

const createSchema = baseSchema.extend({
    email: z.email('Informe um e-mail válido.'),
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

const editSchema = baseSchema.extend({
    email: z.string().optional(),
    senha: z.string().optional(),
});

type ModalValues = {
    nome: string;
    email: string;
    role: Role;
    senha: string;
};

// ─── Props ───────────────────────────────────────────────────────────────────

type ModalMode = 'create' | 'edit';

interface UsuarioModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: ModalMode;
    usuario?: Usuario;
    onSuccess?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function UsuarioModal({
    open,
    onOpenChange,
    mode,
    usuario,
    onSuccess,
}: UsuarioModalProps) {
    const [showSenha, setShowSenha] = useState(false);

    const form = useForm<ModalValues>({
        resolver: zodResolver(
            mode === 'create' ? createSchema : editSchema
        ) as Resolver<ModalValues>,
        defaultValues: {
            nome: usuario?.nome ?? '',
            email: usuario?.email ?? '',
            role: (usuario?.role ?? 'MEMBER') as Role,
            senha: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: ModalValues) => {
            if (mode === 'create') {
                await createUsuario({
                    nome: values.nome,
                    email: values.email,
                    role: values.role,
                    senha: values.senha,
                });
            } else {
                await updateUsuario({
                    id: usuario!.id,
                    nome: values.nome,
                    role: values.role,
                });
            }
        },
        onSuccess: () => {
            toast.success(
                mode === 'create' ? 'Usuário criado com sucesso!' : 'Usuário atualizado!'
            );
            onSuccess?.();
            onOpenChange(false);
        },
        onError: (error: Error) => {
            toast.error('Erro ao salvar', { description: error.message });
        },
    });

    const isPending = mutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Novo usuário' : 'Editar usuário'}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))} noValidate>
                        <DialogBody>
                            {/* Nome */}
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome completo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: João da Silva"
                                                disabled={isPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email — editável só no create */}
                            {mode === 'create' ? (
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail institucional</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    inputMode="email"
                                                    placeholder="usuario@clinica.com.br"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <FormItem>
                                    <FormLabel>E-mail institucional</FormLabel>
                                    <Input
                                        value={usuario?.email ?? ''}
                                        disabled
                                        className="cursor-not-allowed"
                                    />
                                    <p className="text-xs text-slate-400">
                                        O e-mail não pode ser alterado após o cadastro.
                                    </p>
                                </FormItem>
                            )}

                            {/* Perfil */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Perfil de acesso</FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(['ADMIN', 'MEMBER'] as Role[]).map((r) => (
                                                    <button
                                                        key={r}
                                                        type="button"
                                                        onClick={() => field.onChange(r)}
                                                        disabled={isPending}
                                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all
                                                            ${
                                                                field.value === r
                                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                                            } disabled:opacity-50`}
                                                    >
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${field.value === r ? 'bg-blue-500' : 'bg-slate-300'}`}
                                                        />
                                                        <span>{ROLE_CONFIG[r].label}</span>
                                                        {r === 'ADMIN' && (
                                                            <svg
                                                                className="w-3.5 h-3.5 ml-auto text-violet-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </FormControl>
                                        {field.value === 'ADMIN' && (
                                            <p className="text-xs text-amber-600 flex items-center gap-1.5 mt-1.5">
                                                <svg
                                                    className="w-3.5 h-3.5 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Admins têm acesso total ao sistema, incluindo
                                                gerenciamento de usuários.
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Senha — só no create */}
                            {mode === 'create' && (
                                <FormField
                                    control={form.control}
                                    name="senha"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha de acesso</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showSenha ? 'text' : 'password'}
                                                        placeholder="Mínimo 8 caracteres"
                                                        disabled={isPending}
                                                        className="pr-10"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        tabIndex={-1}
                                                        onClick={() => setShowSenha((v) => !v)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                                        aria-label={
                                                            showSenha
                                                                ? 'Ocultar senha'
                                                                : 'Mostrar senha'
                                                        }
                                                    >
                                                        {showSenha ? (
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={1.5}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={1.5}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="lg"
                                        className="flex-1"
                                        disabled={isPending}
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    size="lg"
                                    loading={isPending}
                                    className="flex-1"
                                >
                                    {mode === 'create' ? 'Criar usuário' : 'Salvar alterações'}
                                </Button>
                            </DialogFooter>
                        </DialogBody>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
