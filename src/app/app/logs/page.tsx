import AppHeader from "@/components/app/AppHeader";
import LogsTable from "@/components/logs/LogsTable";

export default function LogsRoute() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader active="logs" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Logs do sistema</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Auditoria completa de todas as ações realizadas no painel.
          </p>
        </div>
        <LogsTable />
      </main>
    </div>
  );
}
