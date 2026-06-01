'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ── Context ─────────────────────────────────────── */
interface DropdownCtx {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onMouseDown(e: MouseEvent) {
            const t = e.target as Node;
            if (!triggerRef.current?.contains(t) && !contentRef.current?.contains(t)) {
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
        <Ctx.Provider value={{ open, setOpen, triggerRef, contentRef }}>
            <div className="relative inline-block">
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
    const { open, setOpen, triggerRef } = useDropdownCtx();
    return (
        <button
            ref={triggerRef}
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
    if (!open || typeof document === 'undefined') return null;
    return <DropdownPanel align={align} className={className}>{children}</DropdownPanel>;
}

function DropdownPanel({
    children,
    align,
    className,
}: {
    children: React.ReactNode;
    align: 'left' | 'right';
    className: string;
}) {
    const { triggerRef, contentRef } = useDropdownCtx();
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'fixed',
        visibility: 'hidden',
        top: 0,
        left: 0,
        zIndex: 50,
    });

    useLayoutEffect(() => {
        const trigger = triggerRef.current;
        const content = contentRef.current;
        if (!trigger || !content) return;

        const tr = trigger.getBoundingClientRect();
        const co = content.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Flip upward when not enough space below
        const below = tr.bottom + 4;
        const above = tr.top - co.height - 4;
        const top = below + co.height > vh && above > 0 ? above : below;

        const next: React.CSSProperties = { position: 'fixed', top, zIndex: 50, visibility: 'visible' };

        if (align === 'right') {
            next.right = Math.max(0, vw - tr.right);
        } else {
            next.left = Math.min(tr.left, vw - co.width);
        }

        setStyle(next);
    }, [align, triggerRef, contentRef]);

    return createPortal(
        <div
            ref={contentRef}
            style={style}
            role="menu"
            className={`min-w-44 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/60 py-1 overflow-hidden ${className}`}
        >
            {children}
        </div>,
        document.body
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
    return <div className={`px-3.5 py-2.5 ${className}`}>{children}</div>;
}

/* ── Separator ───────────────────────────────────── */
export function DropdownSeparator({ className = '' }: { className?: string }) {
    return <div role="separator" className={`border-t border-slate-100 my-1 ${className}`} />;
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
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors
                ${danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'}
                ${className}`}
        >
            {icon && (
                <span className={`size-3.5 shrink-0 ${danger ? 'text-red-500' : 'text-slate-400'}`}>
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
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors
                    ${danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'}
                    ${className}`}
            >
                {icon && (
                    <span className={`size-3.5 shrink-0 ${danger ? 'text-red-500' : 'text-slate-400'}`}>
                        {icon}
                    </span>
                )}
                {children}
            </button>
        </form>
    );
}
