export default function CTABanner() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
          Pronto para nunca mais perder um resultado de exame?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          Junte-se a mais de 120 mil pacientes que já simplificaram o acesso à sua saúde com o MeuExame.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            Criar conta grátis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-blue-500"
          >
            Sou um laboratório
          </a>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          Sem cartão de crédito · Configuração em 2 minutos · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
