type BadgeVariant = 'blue' | 'green' | 'red' | 'amber' | 'violet' | 'teal' | 'slate';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    dot?: boolean;
    className?: string;
}

const VARIANT: Record<BadgeVariant, { badge: string; dot: string }> = {
    blue: { badge: 'bg-blue-100   text-blue-700', dot: 'bg-blue-500' },
    green: { badge: 'bg-green-100  text-green-700', dot: 'bg-green-500' },
    red: { badge: 'bg-red-100    text-red-700', dot: 'bg-red-500' },
    amber: { badge: 'bg-amber-100  text-amber-700', dot: 'bg-amber-400' },
    violet: { badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
    teal: { badge: 'bg-teal-100   text-teal-700', dot: 'bg-teal-500' },
    slate: { badge: 'bg-slate-100  text-slate-500', dot: 'bg-slate-400' },
};

export default function Badge({ children, variant = 'slate', dot, className = '' }: BadgeProps) {
    const cfg = VARIANT[variant];
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.badge} ${className}`}
        >
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
            {children}
        </span>
    );
}
