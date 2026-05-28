import { redirect } from "next/navigation";
import Link from "next/link";
import { getExameByCpfAndProtocolo } from "@/lib/exames";
import ExameCard from "@/components/exame/ExameCard";

interface PageProps {
  searchParams: Promise<{ cpf?: string; protocolo?: string }>;
}

export default async function ExameRoute({ searchParams }: PageProps) {
  const { cpf, protocolo } = await searchParams;

  // Params ausentes → redireciona para o formulário
  if (!cpf || !protocolo) redirect("/paciente");

  const exame = getExameByCpfAndProtocolo(cpf, protocolo);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col">
      <header className="w-full px-4 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <span className="font-bold text-lg text-slate-900">MeuExame</span>
        </Link>
        <Link
          href="/paciente"
          className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {exame ? (
            <>
              <ExameCard exame={exame} />
              <p className="text-center text-xs text-slate-400 mt-6">
                Dúvidas sobre o resultado?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Entre em contato com o laboratório
                </a>
              </p>
            </>
          ) : (
            <NotFound protocolo={protocolo} />
          )}
        </div>
      </main>
    </div>
  );
}

function NotFound({ protocolo }: { protocolo: string }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-xl font-extrabold text-slate-900 mb-2">Exame não encontrado</h2>
      <p className="text-sm text-slate-500 mb-2">
        Não localizamos nenhum resultado para o protocolo{" "}
        <span className="font-mono font-semibold text-slate-700">{protocolo}</span>{" "}
        com o CPF informado.
      </p>
      <p className="text-xs text-slate-400 mb-8">
        Verifique se os dados estão corretos ou entre em contato com o laboratório.
      </p>
      <Link
        href="/paciente"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-blue-200"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Tentar novamente
      </Link>
    </div>
  );
}
