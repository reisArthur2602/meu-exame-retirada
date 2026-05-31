import { Role, UserStatus } from '@/generated/prisma/enums';

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    role: Role;
    status: UserStatus;
    criadoEm: string;
}

export const ROLE_CONFIG: Record<Role, { label: string; className: string }> = {
    ADMIN: { label: 'Admin', className: 'bg-violet-100 text-violet-700' },
    MEMBER: { label: 'Membro', className: 'bg-blue-100 text-blue-700' },
};

export const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
    ativo: { label: 'Ativo', className: 'bg-green-100 text-green-700' },
    inativo: { label: 'Inativo', className: 'bg-slate-100 text-slate-500' },
};

export function getInitials(nome: string): string {
    const parts = nome.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
    'bg-blue-500',
    'bg-violet-500',
    'bg-emerald-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-cyan-500',
];

export function getAvatarColor(id: string): string {
    const index = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
}
