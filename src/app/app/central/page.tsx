import AppHeader from "@/components/app/AppHeader";
import BuscaExames from "@/components/central/BuscaExames";

export default function CentralRoute() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader active="central" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Central de Atendimento</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Localize exames disponíveis e envie o link de acesso ao paciente com segurança.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 shrink-0">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-semibold text-amber-700">Acesso restrito · Visualização segura</p>
          </div>
        </div>
        <BuscaExames />
      </main>
    </div>
  );
}
