import AppHeader from "@/components/app/AppHeader";
import UploadForm from "@/components/upload/UploadForm";
import ExamesTable from "@/components/upload/ExamesTable";

export default function UploadRoute() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader active="upload" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Enviar novo exame</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Preencha os dados do paciente e faça o upload do laudo em PDF.
          </p>
        </div>
        <UploadForm />
        <ExamesTable />
      </main>
    </div>
  );
}
