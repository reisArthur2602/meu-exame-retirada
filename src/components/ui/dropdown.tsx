'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

/* ── Context ─────────────────────────────────────── */
interface DropdownCtx {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Ctx = createContext<DropdownCtx | null>(null);

function useDropdownCtx() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('Dropdown compound components must be used inside <Dropdown>');
    return ctx;
}

/* ── Root ────────────────────────────────────────── */
export function Dropdown({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onMouseDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        <Ctx.Provider value={{ open, setOpen }}>
            <div ref={ref} className="relative">
                {children}
            </div>
        </Ctx.Provider>
    );
}

/* ── Trigger ─────────────────────────────────────── */
export function DropdownTrigger({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { open, setOpen } = useDropdownCtx();
    return (
        <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className={className}
        >
            {children}
        </button>
    );
}

/* ── Content ─────────────────────────────────────── */
export function DropdownContent({
    children,
    align = 'right',
    className = '',
}: {
    children: React.ReactNode;
    align?: 'left' | 'right';
    className?: string;
}) {
    const { open } = useDropdownCtx();
    if (!open) return null;

    return (
        <div
            role="menu"
            className={`absolute top-full mt-2 z-50 min-w-56 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden
                ${align === 'right' ? 'right-0' : 'left-0'}
                ${className}`}
        >
            {children}
        </div>
    );
}

/* ── Label (cabeçalho de seção) ──────────────────── */
export function DropdownLabel({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={`px-4 py-3 ${className}`}>{children}</div>;
}

/* ── Separator ───────────────────────────────────── */
export function DropdownSeparator({ className = '' }: { className?: string }) {
    return <div role="separator" className={`border-t border-slate-100 ${className}`} />;
}

/* ── Item (botão) ────────────────────────────────── */
export function DropdownItem({
    icon,
    children,
    danger = false,
    onClick,
    className = '',
}: {
    icon?: React.ReactNode;
    children: React.ReactNode;
    danger?: boolean;
    onClick?: () => void;
    className?: string;
}) {
    const { setOpen } = useDropdownCtx();

    function handleClick() {
        onClick?.();
        setOpen(false);
    }

    return (
        <button
            type="button"
            role="menuitem"
            onClick={handleClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
                ${
                    danger
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-slate-700 hover:bg-slate-50'
                }
                ${className}`}
        >
            {icon && (
                <span
                    className={`size-4 shrink-0 ${danger ? 'text-red-500' : 'text-slate-400'}`}
                >
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
}

/* ── ItemForm (para server actions via form) ─────── */
export function DropdownItemForm({
    icon,
    children,
    action,
    danger = false,
    className = '',
}: {
    icon?: React.ReactNode;
    children: React.ReactNode;
    action: (formData: FormData) => void | Promise<void>;
    danger?: boolean;
    className?: string;
}) {
    return (
        <form action={action}>
            <button
                type="submit"
                role="menuitem"
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
                    ${
                        danger
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-slate-700 hover:bg-slate-50'
                    }
                    ${className}`}
            >
                {icon && (
                    <span
                        className={`size-4 shrink-0 ${danger ? 'text-red-500' : 'text-slate-400'}`}
                    >
                        {icon}
                    </span>
                )}
                {children}
            </button>
        </form>
    );
}
