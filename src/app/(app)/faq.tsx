"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Preciso criar uma conta para retirar meu exame?",
    answer: "Não. Você acessa seu exame apenas com CPF e o código de protocolo que a clínica envia. Sem cadastro, senha, e-mail de confirmação ou aplicativo.",
  },
  {
    question: "Onde encontro o código de protocolo?",
    answer: "A clínica ou laboratório envia o protocolo no momento da coleta — geralmente por WhatsApp, e-mail ou impresso no comprovante. Se não recebeu, entre em contato direto com o local onde realizou o exame.",
  },
  {
    question: "Como faço para compartilhar o exame com meu médico?",
    answer: "Após acessar seu exame, clique em \"Compartilhar\". Você recebe um link seguro que pode enviar por WhatsApp, e-mail ou qualquer canal. Você define por quanto tempo o link fica válido — depois disso ele expira automaticamente.",
  },
  {
    question: "O laudo baixado tem validade?",
    answer: "O arquivo gerado é o mesmo enviado pela clínica. Consulte o local onde realizou o exame caso precise de informações sobre validade ou reconhecimento do documento.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Nenhuma outra pessoa consegue acessar seu exame sem o CPF e o protocolo corretos. O acesso é restrito e nenhuma informação é compartilhada com terceiros.",
  },
  {
    question: "E se eu perder o protocolo?",
    answer: "Sem o protocolo, por segurança, só a clínica que realizou o exame pode reenviá-lo. Basta entrar em contato com o local — eles têm o registro completo da sua coleta.",
  },
  {
    question: "Sou clínica ou laboratório — como passo a usar o sistema?",
    answer: "Cadastre sua clínica em \"Sou clínica\" no topo da página. Você ganha acesso ao painel para enviar laudos, gerar protocolos e acompanhar entregas. Nenhuma instalação — funciona 100% no navegador.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
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
            Perguntas frequentes
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
