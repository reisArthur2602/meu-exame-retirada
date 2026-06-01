import { FileText } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
    href?: string;
    className?: string;
}

export default function Logo({ href = '/', className = '' }: LogoProps) {
    return (
        <Link href={href} className={`flex items-center gap-2 shrink-0 ${className}`}>
            <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <FileText className="size-4 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">MeuExame</span>
        </Link>
    );
}
