export interface Exame {
  id: string;
  protocolo: string;
  paciente: {
    nome: string;
    cpf: string;
  };
  status: "disponivel" | "processando" | "cancelado";
  arquivoUrl: string;
}

const MOCK_EXAMES: Exame[] = [
  {
    id: "EX2026001234",
    protocolo: "EX2026001234",
    paciente: { nome: "Maria Aparecida Silva", cpf: "123.456.789-09" },
    status: "disponivel",
    arquivoUrl: "/api/exames/EX2026001234/download",
  },
  {
    id: "EX2026005678",
    protocolo: "EX2026005678",
    paciente: { nome: "João Paulo Ferreira", cpf: "987.654.321-00" },
    status: "disponivel",
    arquivoUrl: "/api/exames/EX2026005678/download",
  },
];

export function getExameById(id: string): Exame | undefined {
  return MOCK_EXAMES.find((e) => e.id === id);
}

export function getExameByCpfAndProtocolo(cpf: string, protocolo: string): Exame | undefined {
  const digits = cpf.replace(/\D/g, "");
  return MOCK_EXAMES.find(
    (e) =>
      e.paciente.cpf.replace(/\D/g, "") === digits &&
      e.protocolo.toLowerCase() === protocolo.trim().toLowerCase(),
  );
}
