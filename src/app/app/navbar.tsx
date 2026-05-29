'use client';

import { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                <a href="#" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
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
                </a>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                    <a href="#como-funciona" className="hover:text-blue-600 transition-colors">
                        Como funciona
                    </a>
                    <a href="#funcionalidades" className="hover:text-blue-600 transition-colors">
                        Funcionalidades
                    </a>
                    <a href="#depoimentos" className="hover:text-blue-600 transition-colors">
                        Depoimentos
                    </a>
                    <a href="#faq" className="hover:text-blue-600 transition-colors">
                        FAQ
                    </a>
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="#"
                        className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                    >
                        Entrar
                    </a>
                    <a
                        href="#"
                        className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Criar conta grátis
                    </a>
                </div>

                <button
                    className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    {open ? (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4">
                    <a
                        href="#como-funciona"
                        className="text-sm font-medium text-slate-700"
                        onClick={() => setOpen(false)}
                    >
                        Como funciona
                    </a>
                    <a
                        href="#funcionalidades"
                        className="text-sm font-medium text-slate-700"
                        onClick={() => setOpen(false)}
                    >
                        Funcionalidades
                    </a>
                    <a
                        href="#depoimentos"
                        className="text-sm font-medium text-slate-700"
                        onClick={() => setOpen(false)}
                    >
                        Depoimentos
                    </a>
                    <a
                        href="#faq"
                        className="text-sm font-medium text-slate-700"
                        onClick={() => setOpen(false)}
                    >
                        FAQ
                    </a>
                    <hr className="border-slate-100" />
                    <a href="#" className="text-sm font-medium text-slate-700">
                        Entrar
                    </a>
                    <a
                        href="#"
                        className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Criar conta grátis
                    </a>
                </div>
            )}
        </header>
    );
}
