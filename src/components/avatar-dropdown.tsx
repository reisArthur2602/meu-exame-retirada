'use client';

import { logout } from '@/helpers/logout';
import { LogOut } from 'lucide-react';
import {
    Dropdown,
    DropdownContent,
    DropdownItemForm,
    DropdownLabel,
    DropdownSeparator,
    DropdownTrigger,
} from './ui/dropdown';

interface AvatarDropdownProps {
    name: string;
    email: string;
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AvatarDropdown({ name, email }: AvatarDropdownProps) {
    const initials = getInitials(name);

    return (
        <Dropdown>
            <DropdownTrigger className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 select-none">
                    {initials}
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{name}</p>
                    <p className="text-xs text-slate-400 truncate max-w-32">{email}</p>
                </div>
                <svg
                    className="hidden md:block size-3.5 text-slate-400 transition-transform duration-150 in-aria-expanded:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </DropdownTrigger>

            <DropdownContent align="right">
                <DropdownLabel>
                    <p className="text-sm font-semibold text-slate-900 leading-tight">{name}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{email}</p>
                </DropdownLabel>

                <DropdownSeparator />

                <div className="py-1">
                    <DropdownItemForm action={logout} danger icon={<LogOut className="size-4" />}>
                        Sair da conta
                    </DropdownItemForm>
                </div>
            </DropdownContent>
        </Dropdown>
    );
}
