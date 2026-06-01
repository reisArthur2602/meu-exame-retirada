'use client';

import Logo from '@/components/logo';
import { Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Dúvidas', href: '#faq' },
    { label: 'Área da clínica', href: '/login' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-xl ">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                <Logo href="/" />

                <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-blue-50/60 transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="#retirar"
                        className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-blue-300/40 hover:shadow-lg hover:shadow-blue-300/50 hover:-translate-y-px"
                    >
                        <Download className="size-3.5" />
                        Retirar exame
                    </Link>

                    <button
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100/80 transition-colors"
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden border-t border-white/50 bg-white/80 backdrop-blur-xl px-4 py-4 flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-700 px-3 py-2 rounded-lg hover:bg-blue-50/60 hover:text-blue-600 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2 mt-1 border-t border-slate-100/80">
                        <Link
                            href="#retirar"
                            className="flex items-center justify-center gap-1.5 text-sm font-semibold bg-linear-to-br from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg shadow-md shadow-blue-200/60"
                            onClick={() => setOpen(false)}
                        >
                            <Download className="size-3.5" />
                            Retirar exame
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
