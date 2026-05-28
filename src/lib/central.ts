export type ExameStatus = "pendente" | "disponivel" | "enviado" | "acessado" | "expirado" | "entregue";

export type HistoricoTipo =
  | "whatsapp_enviado"
  | "mensagem_copiada"
  | "comprovante_impresso"
  | "paciente_acessou";

export interface HistoricoItem {
  id: string;
  tipo: HistoricoTipo;
  timestamp: string;
  usuario?: string;
}

export interface AtendimentoRow {
  id: string;
  paciente: string;
  cpf: string;
  telefone?: string;
  protocolo: string;
  status: ExameStatus;
  dataCadastro: string;
  ultimoEnvio?: string;
  ultimoAcesso?: string;
  historico: HistoricoItem[];
}

export const STATUS_CONFIG: Record<ExameStatus, { label: string; className: string; dot: string }> = {
  pendente:   { label: "Pendente",   className: "bg-amber-100  text-amber-700",   dot: "bg-amber-400"  },
  disponivel: { label: "Disponível", className: "bg-blue-100   text-blue-700",    dot: "bg-blue-500"   },
  enviado:    { label: "Enviado",    className: "bg-violet-100 text-violet-700",  dot: "bg-violet-500" },
  acessado:   { label: "Acessado",   className: "bg-green-100  text-green-700",   dot: "bg-green-500"  },
  expirado:   { label: "Expirado",   className: "bg-slate-100  text-slate-500",   dot: "bg-slate-400"  },
  entregue:   { label: "Entregue",   className: "bg-teal-100   text-teal-700",    dot: "bg-teal-500"   },
};

export const HISTORICO_CONFIG: Record<HistoricoTipo, { label: string; color: string }> = {
  whatsapp_enviado:      { label: "WhatsApp enviado",         color: "text-green-600"  },
  mensagem_copiada:      { label: "Mensagem copiada",         color: "text-blue-600"   },
  comprovante_impresso:  { label: "Comprovante impresso",     color: "text-slate-600"  },
  paciente_acessou:      { label: "Paciente acessou o exame", color: "text-violet-600" },
};

export function maskCPFCentral(cpf: string): string {
  return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, "***.$2.$3-**");
}

export function formatTimestampCentral(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function ts(daysAgo: number, h: number, m: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

export const MOCK_ATENDIMENTOS: AtendimentoRow[] = [
  {
    id: "1",
    paciente: "Maria Aparecida Silva",
    cpf: "123.456.789-09",
    telefone: "(11) 99999-1234",
    protocolo: "EX2026001234",
    status: "acessado",
    dataCadastro: ts(3, 8, 0),
    ultimoEnvio: ts(1, 10, 30),
    ultimoAcesso: ts(0, 9, 15),
    historico: [
      { id: "h1", tipo: "whatsapp_enviado",     timestamp: ts(1, 10, 30), usuario: "Ana Souza"     },
      { id: "h2", tipo: "comprovante_impresso",  timestamp: ts(1, 10, 31), usuario: "Ana Souza"     },
      { id: "h3", tipo: "paciente_acessou",      timestamp: ts(0, 9, 15)                            },
    ],
  },
  {
    id: "2",
    paciente: "João Paulo Ferreira",
    cpf: "987.654.321-00",
    telefone: "(21) 98888-5678",
    protocolo: "EX2026005678",
    status: "enviado",
    dataCadastro: ts(2, 9, 0),
    ultimoEnvio: ts(0, 11, 5),
    historico: [
      { id: "h4", tipo: "mensagem_copiada",      timestamp: ts(0, 10, 58), usuario: "Carlos Lima"   },
      { id: "h5", tipo: "whatsapp_enviado",      timestamp: ts(0, 11, 5),  usuario: "Carlos Lima"   },
    ],
  },
  {
    id: "3",
    paciente: "Ana Beatriz Costa",
    cpf: "321.654.987-11",
    protocolo: "EX2026009101",
    status: "disponivel",
    dataCadastro: ts(1, 14, 30),
    historico: [],
  },
  {
    id: "4",
    paciente: "Carlos Eduardo Lima",
    cpf: "111.222.333-44",
    telefone: "(31) 97777-1122",
    protocolo: "EX2026001122",
    status: "disponivel",
    dataCadastro: ts(1, 8, 0),
    historico: [
      { id: "h6", tipo: "comprovante_impresso",  timestamp: ts(1, 8, 10),  usuario: "Fernanda Reis" },
    ],
  },
  {
    id: "5",
    paciente: "Fernanda Rocha Santos",
    cpf: "555.666.777-88",
    telefone: "(41) 96666-3344",
    protocolo: "EX2026003344",
    status: "pendente",
    dataCadastro: ts(0, 10, 0),
    historico: [],
  },
  {
    id: "6",
    paciente: "Roberto Alves Pereira",
    cpf: "999.888.777-66",
    protocolo: "EX2026005566",
    status: "expirado",
    dataCadastro: ts(35, 9, 0),
    ultimoEnvio: ts(30, 14, 0),
    historico: [
      { id: "h7", tipo: "whatsapp_enviado",      timestamp: ts(30, 14, 0), usuario: "Ana Souza"     },
      { id: "h8", tipo: "mensagem_copiada",      timestamp: ts(28, 9, 30), usuario: "Carlos Lima"   },
    ],
  },
  {
    id: "7",
    paciente: "Patricia Lima Souza",
    cpf: "777.888.999-00",
    telefone: "(51) 95555-9000",
    protocolo: "EX2026001010",
    status: "acessado",
    dataCadastro: ts(5, 10, 0),
    ultimoEnvio: ts(4, 11, 0),
    ultimoAcesso: ts(3, 16, 20),
    historico: [
      { id: "h9",  tipo: "whatsapp_enviado",     timestamp: ts(4, 11, 0),  usuario: "Fernanda Reis" },
      { id: "h10", tipo: "paciente_acessou",     timestamp: ts(3, 16, 20)                           },
    ],
  },
  {
    id: "8",
    paciente: "Marcelo Teixeira Gomes",
    cpf: "444.555.666-77",
    telefone: "(61) 94444-9900",
    protocolo: "EX2026009900",
    status: "enviado",
    dataCadastro: ts(1, 7, 30),
    ultimoEnvio: ts(0, 8, 45),
    historico: [
      { id: "h11", tipo: "whatsapp_enviado",     timestamp: ts(0, 8, 45),  usuario: "Ana Souza"     },
    ],
  },
];

export function getAtendimentosComTelefone(): AtendimentoRow[] {
  return MOCK_ATENDIMENTOS.filter((r) => !!r.telefone);
}
