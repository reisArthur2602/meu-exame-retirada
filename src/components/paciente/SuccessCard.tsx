import { maskCPF } from "@/lib/cpf";

interface SuccessCardProps {
  cpf: string;
  protocol: string;
  onReset: () => void;
}

const MOCK_EXAMS = [
  { label: "Hemograma Completo", date: "28/05/2026" },
  { label: "Glicemia em Jejum", date: "28/05/2026" },
];

export default function SuccessCard({ cpf, protocol, onReset }: SuccessCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-xl font-extrabold text-slate-900 mb-1">Exame encontrado!</h2>
      <p className="text-sm text-slate-500 mb-6">
        Protocolo{" "}
        <span className="font-mono font-semibold text-slate-700">{protocol}</span>{" "}
        localizado para o CPF{" "}
        <span className="font-semibold text-slate-700">{maskCPF(cpf)}</span>.
      </p>

      <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-3">
        {MOCK_EXAMS.map((exam) => (
          <div key={exam.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">{exam.label}</p>
                <p className="text-xs text-slate-500">{exam.date}</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Baixar
            </button>
          </div>
        ))}
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-200 mb-3 flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Baixar todos os laudos (PDF)
      </button>

      <button
        onClick={onReset}
        className="w-full text-sm text-slate-500 hover:text-blue-600 transition-colors py-2"
      >
        Consultar outro protocolo
      </button>
    </div>
  );
}
