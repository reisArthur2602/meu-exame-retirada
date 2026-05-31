const testimonials = [
  {
    name: "Ana Beatriz Costa",
    role: "Paciente",
    city: "São Paulo, SP",
    avatar: "AC",
    color: "bg-blue-500",
    stars: 5,
    text: "Recebi o protocolo por WhatsApp, digitei o CPF e em segundos baixei o laudo. Não precisei criar conta nem instalar nada. Que alívio!",
  },
  {
    name: "Dr. Ricardo Mendes",
    role: "Clínico Geral",
    city: "Rio de Janeiro, RJ",
    avatar: "RM",
    color: "bg-emerald-500",
    stars: 5,
    text: "Meus pacientes chegam à consulta com o laudo no celular através do link compartilhado. Acelerou meu atendimento e eliminou o papel.",
  },
  {
    name: "Carlos Eduardo Lima",
    role: "Paciente",
    city: "Belo Horizonte, MG",
    avatar: "CL",
    color: "bg-violet-500",
    stars: 5,
    text: "Minha mãe tem 72 anos e conseguiu retirar o exame sozinha pelo celular. CPF, protocolo e pronto — sem senha pra esquecer.",
  },
  {
    name: "Clínica Vida Plena",
    role: "Clínica parceira",
    city: "Curitiba, PR",
    avatar: "VP",
    color: "bg-rose-500",
    stars: 5,
    text: "Cortamos pela metade as ligações pedindo resultado. Subimos o PDF, mandamos o protocolo no WhatsApp e o paciente se vira sozinho.",
  },
  {
    name: "João Paulo Souza",
    role: "Paciente",
    city: "Fortaleza, CE",
    avatar: "JS",
    color: "bg-amber-500",
    stars: 5,
    text: "Mandei o link direto pro meu cardiologista pelo WhatsApp. Ele abriu na hora, sem precisar baixar nada. Resolvi a teleconsulta em 5 minutos.",
  },
  {
    name: "Dra. Patrícia Alves",
    role: "Cardiologista",
    city: "Porto Alegre, RS",
    avatar: "PA",
    color: "bg-cyan-500",
    stars: 5,
    text: "O QR code de autenticidade me dá segurança de que o laudo é real, sem precisar ligar pra clínica. Recomendo a todos os meus pacientes.",
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
            Quem usa, recomenda
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Pacientes, médicos e clínicas que trocaram a fila pelo link.
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
