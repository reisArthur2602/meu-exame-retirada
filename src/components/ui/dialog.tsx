'use client';

import {
    createContext,
    useContext,
    useEffect,
    useId,
    type ButtonHTMLAttributes,
    type HTMLAttributes,
    type ReactNode,
} from 'react';

// ─── Context ──────────────────────────────────────────────────────────────────

interface DialogContextValue {
    onOpenChange: (open: boolean) => void;
    titleId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
    const ctx = useContext(DialogContext);
    if (!ctx) throw new Error('useDialogContext must be used inside <Dialog>');
    return ctx;
}

// ─── Dialog ───────────────────────────────────────────────────────────────────

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
    const titleId = useId();
    return (
        <DialogContext.Provider value={{ onOpenChange, titleId }}>
            {open ? children : null}
        </DialogContext.Provider>
    );
}

// ─── DialogContent ────────────────────────────────────────────────────────────

interface DialogContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    children: ReactNode;
}

function DialogContent({ children, className = '', ...props }: DialogContentProps) {
    const { onOpenChange, titleId } = useDialogContext();

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onOpenChange(false);
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onOpenChange]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onOpenChange(false);
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 ${className}`}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}

// ─── DialogHeader ─────────────────────────────────────────────────────────────

function DialogHeader({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { onOpenChange } = useDialogContext();
    return (
        <div
            className={`flex items-center justify-between px-6 py-4 border-b border-slate-100 ${className}`}
            {...props}
        >
            {children}
            <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 shrink-0"
                aria-label="Fechar"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

// ─── DialogTitle ──────────────────────────────────────────────────────────────

function DialogTitle({ children, className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
    const { titleId } = useDialogContext();
    return (
        <h2 id={titleId} className={`text-base font-bold text-slate-900 ${className}`} {...props}>
            {children}
        </h2>
    );
}

// ─── DialogBody ───────────────────────────────────────────────────────────────

function DialogBody({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`px-6 py-5 space-y-4 ${className}`} {...props}>
            {children}
        </div>
    );
}

// ─── DialogFooter ─────────────────────────────────────────────────────────────

function DialogFooter({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex gap-3 pt-2 ${className}`} {...props}>
            {children}
        </div>
    );
}

// ─── DialogClose ──────────────────────────────────────────────────────────────

function DialogClose({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { onOpenChange } = useDialogContext();
    return (
        <button
            type="button"
            onClick={(e) => {
                onOpenChange(false);
                onClick?.(e);
            }}
            {...props}
        >
            {children}
        </button>
    );
}

export { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle };
