import AppHeader from "@/components/app-header";
import UsuariosTable from "./usuarios-table";

export default function UsuariosRoute() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader active="usuarios" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Gerenciamento de usuários</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Crie, edite, ative ou desative os acessos ao painel da clínica.
          </p>
        </div>
        <UsuariosTable />
      </main>
    </div>
  );
}
