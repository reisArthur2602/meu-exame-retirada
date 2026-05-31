'use client';

import { login } from '@/app/(app)/login/actions/login';
import Button from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.email('Informe um e-mail válido.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    remember: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', remember: false },
    });

    const mutation = useMutation({
        mutationFn: (values: LoginValues) => login(values),
        onSuccess: () => {
            toast.success('Bem-vindo!');
            router.push('/envio');
        },
        onError: (error) => toast.error(error.message),
    });

    return (
        <div>
            <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-7 h-7 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900">Acesso da clínica</h1>
                <p className="text-sm text-slate-500 mt-1.5">
                    Entre com as suas credenciais institucionais.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
                    noValidate
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="voce@clinica.com.br"
                                        disabled={mutation.isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>

                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            disabled={mutation.isPending}
                                            className="pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                            aria-label={
                                                showPassword ? 'Ocultar senha' : 'Mostrar senha'
                                            }
                                        >
                                            {showPassword ? (
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

                    <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">
                                    Manter sessão ativa neste dispositivo
                                </span>
                            </label>
                        )}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        loading={mutation.isPending}
                        className="w-full py-3.5 shadow-lg shadow-blue-200 mt-1"
                    >
                        {mutation.isPending ? (
                            'Entrando...'
                        ) : (
                            <>
                                Entrar
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </>
                        )}
                    </Button>
                </form>
            </Form>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                    />
                </svg>
                Acesso restrito a funcionários autorizados
            </div>
        </div>
    );
}
