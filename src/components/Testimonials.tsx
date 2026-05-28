const testimonials = [
  {
    name: "Ana Beatriz Costa",
    role: "Paciente",
    city: "São Paulo, SP",
    avatar: "AC",
    color: "bg-blue-500",
    stars: 5,
    text: "Finalmente não preciso mais ir até o laboratório buscar resultado. Recebi a notificação no celular e em segundos já tinha meu exame em mãos. Incrível!",
  },
  {
    name: "Dr. Ricardo Mendes",
    role: "Clínico Geral",
    city: "Rio de Janeiro, RJ",
    avatar: "RM",
    color: "bg-emerald-500",
    stars: 5,
    text: "Meus pacientes chegam à consulta com os laudos organizados. O link seguro que eles compartilham comigo facilita demais o atendimento. Recomendo a todos.",
  },
  {
    name: "Carlos Eduardo Lima",
    role: "Paciente",
    city: "Belo Horizonte, MG",
    avatar: "CL",
    color: "bg-violet-500",
    stars: 5,
    text: "Tenho histórico de diabetes e preciso acompanhar exames mensais. O MeuExame me ajuda a manter tudo organizado e a mostrar a evolução pro médico. Essencial!",
  },
  {
    name: "Fernanda Rocha",
    role: "Enfermeira",
    city: "Curitiba, PR",
    avatar: "FR",
    color: "bg-rose-500",
    stars: 5,
    text: "Uso o MeuExame pessoalmente e indico para todos os meus pacientes. A plataforma é intuitiva, segura e resolve um problema real que todo mundo tem.",
  },
  {
    name: "João Paulo Souza",
    role: "Paciente",
    city: "Fortaleza, CE",
    avatar: "JS",
    color: "bg-amber-500",
    stars: 5,
    text: "Morava longe do laboratório e era um sufoco buscar resultados. Agora recebo notificação e baixo na hora. Economizo tempo e gasolina. Muito obrigado!",
  },
  {
    name: "Dra. Patrícia Alves",
    role: "Cardiologista",
    city: "Porto Alegre, RS",
    avatar: "PA",
    color: "bg-cyan-500",
    stars: 5,
    text: "A praticidade do compartilhamento seguro transformou minha rotina clínica. Consigo consultar laudos de imagem em alta qualidade direto no computador.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Depoimentos</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Quem usa, aprova
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Mais de 120 mil pacientes e profissionais de saúde confiam no MeuExame.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4">
              <Stars count={t.stars} />
              <p className="text-sm text-slate-700 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role} · {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
