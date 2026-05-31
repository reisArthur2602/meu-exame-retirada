import { getSession } from '@/helpers/get-session';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import AvatarDropdown from './avatar-dropdown';

type NavItem = 'envio' | 'equipe';

interface AppHeaderProps {
    active: NavItem;
}

const NAV_ITEMS: { key: NavItem; label: string; href: string; adminOnly?: boolean }[] = [
    { key: 'envio', label: 'Enviar exame', href: '/envio' },
    { key: 'equipe', label: 'Equipe', href: '/equipe', adminOnly: true },
];

export default async function AppHeader({ active = 'envio' }: AppHeaderProps) {
    const session = await getSession();
    const user = session?.user;
    const isAdmin = user?.role === 'ADMIN';

    const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

    return (
        <header className="bg-white border-b border-slate-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <FileText className="size-4 text-white" />
                        </div>
                        <span className="font-bold text-base text-slate-900">MeuExame</span>
                    </Link>
                    <span className="hidden sm:block text-slate-300">·</span>
                    <span className="hidden sm:block text-sm font-semibold text-slate-500">
                        Painel da Clínica
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {visibleItems.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`px-3 py-1.5 rounded-lg transition-colors ${
                                active === item.key
                                    ? 'bg-blue-50 text-blue-700 font-semibold'
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {user && <AvatarDropdown name={user.nome} email={user.email} />}
            </div>
        </header>
    );
}
