import { redirect } from "next/navigation";
import { getExameById } from "@/lib/exames";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Redireciona links antigos (/paciente/exame/EX2026001234) para o novo
// formato com query params (/paciente/exame?protocolo=EX2026001234&cpf=...)
// Como o CPF não vem na URL antiga, redireciona para o formulário.
export default async function ExamRouteLegacy({ params }: PageProps) {
  const { id } = await params;
  const exame = getExameById(id);

  if (exame) {
    redirect(
      `/paciente/exame?cpf=${encodeURIComponent(exame.paciente.cpf)}&protocolo=${encodeURIComponent(exame.protocolo)}`,
    );
  }

  redirect("/paciente");
}
