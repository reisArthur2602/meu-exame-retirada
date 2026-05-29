"use client";

import { useState } from "react";

const faqs = [
  {
    question: "O MeuExame é gratuito?",
    answer: "Sim! A retirada e visualização de exames é completamente gratuita para pacientes. Oferecemos também planos premium com recursos avançados como histórico ilimitado, múltiplos perfis familiares e relatórios de saúde personalizados.",
  },
  {
    question: "Quais laboratórios estão integrados à plataforma?",
    answer: "Temos mais de 500 laboratórios e clínicas parceiras em todo o Brasil, incluindo grandes redes como Fleury, DASA, Hermes Pardini, Sabin, entre outros. Se o seu laboratório não estiver listado, você pode solicitar a integração.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Absolutamente. Utilizamos criptografia SSL de 256 bits, armazenamento em conformidade com a LGPD e nunca compartilhamos seus dados com terceiros sem seu consentimento explícito. Seus laudos pertencem exclusivamente a você.",
  },
  {
    question: "Como faço para acessar exames de familiares?",
    answer: "Você pode criar perfis vinculados para dependentes (filhos menores, idosos) dentro da sua conta. Cada perfil tem acesso isolado aos seus próprios exames, mantendo a privacidade de todos.",
  },
  {
    question: "Por quanto tempo meus exames ficam armazenados?",
    answer: "No plano gratuito, os últimos 12 meses de exames ficam disponíveis. No plano premium, o armazenamento é ilimitado — todos os seus laudos desde o cadastro ficam acessíveis para sempre.",
  },
  {
    question: "O laudo baixado tem validade legal?",
    answer: "Sim. Todos os laudos baixados pela plataforma possuem assinatura digital ICP-Brasil e QR code de autenticação, tendo a mesma validade legal do documento físico original.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-900">{question}</span>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">FAQ</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Dúvidas frequentes
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Não encontrou o que procura?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">Fale com a gente</a>.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
