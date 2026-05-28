"use client";

import { useEffect, useState } from "react";
import { type Role, type Usuario, ROLE_CONFIG } from "@/lib/usuarios";

type ModalMode = "create" | "edit";

interface UsuarioModalProps {
  mode: ModalMode;
  usuario?: Usuario;
  onClose: () => void;
  onSave: (data: UsuarioFormData) => void;
}

export interface UsuarioFormData {
  nome: string;
  email: string;
  role: Role;
  senha?: string;
}

type FieldErrors = { nome?: string; email?: string; senha?: string };

export default function UsuarioModal({ mode, usuario, onClose, onSave }: UsuarioModalProps) {
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [role, setRole] = useState<Role>(usuario?.role ?? "MEMBER");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (nome.trim().length < 3) next.nome = "Informe o nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Informe um e-mail válido.";
    if (mode === "create" && senha.length < 8) next.senha = "A senha deve ter no mínimo 8 caracteres.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 900));
    onSave({ nome, email, role, ...(mode === "create" ? { senha } : {}) });
    setSaving(false);
  }

  const title = mode === "create" ? "Novo usuário" : "Editar usuário";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="modal-nome" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nome completo
            </label>
            <input
              id="modal-nome"
              type="text"
              placeholder="Ex: João da Silva"
              value={nome}
              onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: undefined })); }}
              disabled={saving}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors outline-none
                ${errors.nome
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                } disabled:opacity-50`}
            />
            {errors.nome && <FieldError message={errors.nome} />}
          </div>

          <div>
            <label htmlFor="modal-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              E-mail institucional
            </label>
            <input
              id="modal-email"
              type="email"
              inputMode="email"
              placeholder="usuario@clinica.com.br"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              disabled={saving || mode === "edit"}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors outline-none
                ${errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {mode === "edit" && (
              <p className="mt-1.5 text-xs text-slate-400">O e-mail não pode ser alterado após o cadastro.</p>
            )}
            {errors.email && <FieldError message={errors.email} />}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Perfil de acesso</label>
            <div className="grid grid-cols-2 gap-2">
              {(["ADMIN", "MEMBER"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  disabled={saving}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all
                    ${role === r
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    } disabled:opacity-50`}
                >
                  <div className={`w-2 h-2 rounded-full ${role === r ? "bg-blue-500" : "bg-slate-300"}`} />
                  <span>{ROLE_CONFIG[r].label}</span>
                  {r === "ADMIN" && (
                    <svg className="w-3.5 h-3.5 ml-auto text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            {role === "ADMIN" && (
              <p className="mt-2 text-xs text-amber-600 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Admins têm acesso total ao sistema, incluindo gerenciamento de usuários.
              </p>
            )}
          </div>

          {mode === "create" && (
            <div>
              <label htmlFor="modal-senha" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Senha de acesso
              </label>
              <div className="relative">
                <input
                  id="modal-senha"
                  type={showSenha ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); setErrors((p) => ({ ...p, senha: undefined })); }}
                  disabled={saving}
                  className={`w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border transition-colors outline-none
                    ${errors.senha
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    } disabled:opacity-50`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowSenha((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showSenha ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.senha && <FieldError message={errors.senha} />}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-200 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Salvando...
                </>
              ) : mode === "create" ? "Criar usuário" : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}
