const steps = [
  {
    number: "01",
    title: "Crie sua conta",
    description: "Cadastre-se gratuitamente em menos de 2 minutos com seu CPF e e-mail. Nenhum cartão de crédito necessário.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Encontre seu exame",
    description: "Busque pelo nome do laboratório, tipo de exame ou data de realização. Todos os seus laudos em um só lugar.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Baixe ou compartilhe",
    description: "Faça o download do PDF ou compartilhe diretamente com seu médico por link seguro, válido por tempo determinado.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Como funciona</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Simples em 3 passos
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Do cadastro ao download do laudo em poucos minutos — sem burocracia.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-linear-to-r from-blue-200 via-blue-400 to-blue-200" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center group">
                <div className="relative w-24 h-24 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                  <span className="absolute -top-3 -right-3 text-xs font-extrabold text-white bg-blue-600 group-hover:bg-white group-hover:text-blue-600 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300">
                    {step.number.replace("0", "")}
                  </span>
                  <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
          >
            Começar agora — é grátis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
