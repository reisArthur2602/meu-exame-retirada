"use client";

import { useState } from "react";
import { formatCPF, isValidCPF } from "@/lib/cpf";
import SuccessCard from "./success-card";

type FormState = "idle" | "loading" | "success" | "error";
type FieldErrors = { cpf?: string; protocol?: string };

export default function ExameForm() {
  const [cpf, setCpf] = useState("");
  const [protocol, setProtocol] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCpf(formatCPF(e.target.value));
    if (errors.cpf) setErrors((prev) => ({ ...prev, cpf: undefined }));
  }

  function handleProtocolChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 16);
    setProtocol(value);
    if (errors.protocol) setErrors((prev) => ({ ...prev, protocol: undefined }));
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!isValidCPF(cpf)) next.cpf = "CPF inválido. Verifique e tente novamente.";
    if (protocol.trim().length < 6) next.protocol = "Número de protocolo deve ter no mínimo 6 caracteres.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setFormState("loading");
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("error");
  }

  function handleReset() {
    setCpf("");
    setProtocol("");
    setErrors({});
    setFormState("idle");
  }

  if (formState === "success") {
    return <SuccessCard cpf={cpf} protocol={protocol} onReset={handleReset} />;
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Retire seu exame</h1>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          Informe seu CPF e o número de protocolo recebido no laboratório para acessar seu laudo.
        </p>
      </div>

      {formState === "error" && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-700">Exame não encontrado</p>
            <p className="text-xs text-red-600 mt-0.5">
              Não encontramos nenhum resultado com os dados informados. Verifique o CPF e o protocolo ou entre em contato com o laboratório.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="cpf" className="block text-sm font-semibold text-slate-700 mb-1.5">
            CPF do paciente
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCPFChange}
              disabled={formState === "loading"}
              className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border transition-colors outline-none
                ${errors.cpf
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          </div>
          {errors.cpf && <FieldError message={errors.cpf} />}
        </div>

        <div>
          <label htmlFor="protocol" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Número do protocolo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
              </svg>
            </div>
            <input
              id="protocol"
              type="text"
              placeholder="Ex: EX2026001234"
              value={protocol}
              onChange={handleProtocolChange}
              disabled={formState === "loading"}
              className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border transition-colors outline-none font-mono tracking-wider uppercase
                ${errors.protocol
                  ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          </div>
          {errors.protocol && <FieldError message={errors.protocol} />}
          {!errors.protocol && (
            <p className="mt-1.5 text-xs text-slate-400">
              Consta no comprovante entregue pelo laboratório no momento da coleta.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-200 mt-2"
        >
          {formState === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Buscando exame...
            </>
          ) : (
            <>
              Acessar meu exame
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>

        {formState === "error" && (
          <button
            type="button"
            onClick={handleReset}
            className="w-full text-sm text-slate-500 hover:text-blue-600 transition-colors py-1"
          >
            Limpar e tentar novamente
          </button>
        )}
      </form>

      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
        </svg>
        Conexão segura — seus dados são protegidos com criptografia SSL
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
