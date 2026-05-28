"use client";

import { useMemo, useState } from "react";
import {
  type Role,
  type UserStatus,
  type Usuario,
  MOCK_USUARIOS,
  ROLE_CONFIG,
  STATUS_CONFIG,
  getInitials,
  getAvatarColor,
} from "@/lib/usuarios";
import UsuarioModal, { type UsuarioFormData } from "./UsuarioModal";

const PER_PAGE = 6;

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function UsuariosTable() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(MOCK_USUARIOS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return usuarios.filter((u) => {
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchSearch =
        !q ||
        u.nome.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      return matchRole && matchSearch;
    });
  }, [usuarios, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function handleSearch(value: string) { setSearch(value); setPage(1); }
  function handleRoleFilter(value: Role | "all") { setRoleFilter(value); setPage(1); }

  function openCreate() { setEditingUser(undefined); setModalOpen(true); }
  function openEdit(user: Usuario) { setEditingUser(user); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditingUser(undefined); }

  function handleSave(data: UsuarioFormData) {
    if (editingUser) {
      setUsuarios((prev) =>
        prev.map((u) => u.id === editingUser.id ? { ...u, nome: data.nome, role: data.role } : u)
      );
    } else {
      const newUser: Usuario = {
        id: String(Date.now()),
        nome: data.nome,
        email: data.email,
        role: data.role,
        status: "ativo",
        criadoEm: new Date().toISOString().split("T")[0],
      };
      setUsuarios((prev) => [newUser, ...prev]);
    }
    closeModal();
  }

  function toggleStatus(id: string) {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ativo" ? "inativo" : "ativo" as UserStatus }
          : u
      )
    );
  }

  function confirmDelete(id: string) {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    setDeletingId(null);
  }

  const adminCount = usuarios.filter((u) => u.role === "ADMIN" && u.status === "ativo").length;
  const activeCount = usuarios.filter((u) => u.status === "ativo").length;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total de usuários" value={String(usuarios.length)} icon="users" />
        <StatCard label="Usuários ativos"   value={String(activeCount)}    icon="check" />
        <StatCard label="Admins"            value={String(adminCount)}     icon="shield" />
        <StatCard label="Inativos"          value={String(usuarios.length - activeCount)} icon="pause" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-base font-bold text-slate-900 shrink-0">Usuários do sistema</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-colors w-full sm:w-56"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilter(e.target.value as Role | "all")}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors text-slate-700"
            >
              <option value="all">Todos os perfis</option>
              <option value="ADMIN">Admin</option>
              <option value="MEMBER">Membro</option>
            </select>
            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm shadow-blue-200 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Novo usuário
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {["Usuário", "Perfil", "Status", "Criado em", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length > 0 ? (
                paginated.map((user) => (
                  <tr key={user.id} className={`transition-colors ${user.status === "inativo" ? "opacity-60" : "hover:bg-slate-50/60"}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {getInitials(user.nome)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{user.nome}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ROLE_CONFIG[user.role].className}`}>
                        {ROLE_CONFIG[user.role].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_CONFIG[user.status].className}`}>
                        {STATUS_CONFIG[user.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-500">{formatDate(user.criadoEm)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {deletingId === user.id ? (
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-slate-500">Confirmar exclusão?</span>
                          <button
                            onClick={() => confirmDelete(user.id)}
                            className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition-colors"
                          >
                            Excluir
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 justify-end">
                          <ActionButton
                            title="Editar usuário"
                            onClick={() => openEdit(user)}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                            </svg>
                          </ActionButton>
                          <ActionButton
                            title={user.status === "ativo" ? "Desativar usuário" : "Ativar usuário"}
                            onClick={() => toggleStatus(user.id)}
                          >
                            {user.status === "ativo" ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </ActionButton>
                          <ActionButton
                            title="Excluir usuário"
                            onClick={() => setDeletingId(user.id)}
                            danger
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </ActionButton>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <p className="text-sm font-medium">Nenhum usuário encontrado</p>
                      <p className="text-xs">Tente ajustar a busca ou o filtro de perfil.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > PER_PAGE && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Mostrando{" "}
              <span className="font-semibold text-slate-700">
                {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-slate-700">{filtered.length}</span> usuários
            </p>
            <div className="flex items-center gap-1">
              <PageButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Anterior">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PageButton key={n} onClick={() => setPage(n)} active={n === safePage}>{n}</PageButton>
              ))}
              <PageButton onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Próxima">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </PageButton>
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <UsuarioModal
          mode={editingUser ? "edit" : "create"}
          usuario={editingUser}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    users: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    check: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    shield: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    pause: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
        {icons[icon]}
      </div>
      <div>
        <p className="text-xl font-extrabold text-slate-900 leading-tight">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function ActionButton({
  children, onClick, title, danger,
}: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-colors ${
        danger
          ? "text-slate-400 hover:text-red-600 hover:bg-red-50"
          : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {children}
    </button>
  );
}

function PageButton({
  children, onClick, disabled, active, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors
        ${active
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
      {...rest}
    >
      {children}
    </button>
  );
}
