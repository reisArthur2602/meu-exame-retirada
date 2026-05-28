export type Role = "ADMIN" | "MEMBER";
export type UserStatus = "ativo" | "inativo";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: Role;
  status: UserStatus;
  criadoEm: string;
}

export const ROLE_CONFIG: Record<Role, { label: string; className: string }> = {
  ADMIN:  { label: "Admin",  className: "bg-violet-100 text-violet-700" },
  MEMBER: { label: "Membro", className: "bg-blue-100 text-blue-700"    },
};

export const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
  ativo:   { label: "Ativo",   className: "bg-green-100 text-green-700" },
  inativo: { label: "Inativo", className: "bg-slate-100 text-slate-500" },
};

export function getInitials(nome: string): string {
  const parts = nome.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-blue-500", "bg-violet-500", "bg-emerald-500",
  "bg-rose-500",  "bg-amber-500",  "bg-cyan-500",
];

export function getAvatarColor(id: string): string {
  const index = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export const MOCK_USUARIOS: Usuario[] = [
  { id: "1",  nome: "Regina Oliveira",     email: "regina@clinica.com.br",   role: "ADMIN",  status: "ativo",   criadoEm: "2025-01-10" },
  { id: "2",  nome: "Carlos Mendes",       email: "carlos@clinica.com.br",   role: "ADMIN",  status: "ativo",   criadoEm: "2025-01-15" },
  { id: "3",  nome: "Fernanda Costa",      email: "fernanda@clinica.com.br", role: "MEMBER", status: "ativo",   criadoEm: "2025-02-03" },
  { id: "4",  nome: "Thiago Alves",        email: "thiago@clinica.com.br",   role: "MEMBER", status: "ativo",   criadoEm: "2025-02-18" },
  { id: "5",  nome: "Juliana Ramos",       email: "juliana@clinica.com.br",  role: "MEMBER", status: "ativo",   criadoEm: "2025-03-05" },
  { id: "6",  nome: "Bruno Teixeira",      email: "bruno@clinica.com.br",    role: "MEMBER", status: "inativo", criadoEm: "2025-03-22" },
  { id: "7",  nome: "Patricia Sousa",      email: "patricia@clinica.com.br", role: "MEMBER", status: "ativo",   criadoEm: "2025-04-11" },
  { id: "8",  nome: "Leonardo Barbosa",    email: "leo@clinica.com.br",      role: "MEMBER", status: "inativo", criadoEm: "2025-04-30" },
  { id: "9",  nome: "Camila Freitas",      email: "camila@clinica.com.br",   role: "MEMBER", status: "ativo",   criadoEm: "2025-05-14" },
  { id: "10", nome: "Ricardo Nascimento",  email: "ricardo@clinica.com.br",  role: "ADMIN",  status: "ativo",   criadoEm: "2025-05-28" },
];
