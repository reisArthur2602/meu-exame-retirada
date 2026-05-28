export type LogAction =
  | "LOGIN"
  | "LOGOUT"
  | "UPLOAD"
  | "DOWNLOAD"
  | "EXAM_VIEWED"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "STATUS_CHANGED";

export type LogLevel = "info" | "warning" | "error";

export interface LogEntry {
  id: string;
  action: LogAction;
  level: LogLevel;
  usuario: string;
  email: string;
  detalhes: string;
  ip: string;
  timestamp: string; // ISO datetime
}

export const ACTION_CONFIG: Record<LogAction, { label: string; className: string; level: LogLevel }> = {
  LOGIN:          { label: "Login",            className: "bg-blue-100   text-blue-700",   level: "info"    },
  LOGOUT:         { label: "Logout",           className: "bg-slate-100  text-slate-600",  level: "info"    },
  UPLOAD:         { label: "Upload",           className: "bg-green-100  text-green-700",  level: "info"    },
  DOWNLOAD:       { label: "Download",         className: "bg-cyan-100   text-cyan-700",   level: "info"    },
  EXAM_VIEWED:    { label: "Visualização",     className: "bg-indigo-100 text-indigo-700", level: "info"    },
  USER_CREATED:   { label: "Usuário criado",   className: "bg-emerald-100 text-emerald-700", level: "info"  },
  USER_UPDATED:   { label: "Usuário editado",  className: "bg-amber-100  text-amber-700",  level: "warning" },
  USER_DELETED:   { label: "Usuário excluído", className: "bg-red-100    text-red-700",    level: "error"   },
  STATUS_CHANGED: { label: "Status alterado",  className: "bg-orange-100 text-orange-700", level: "warning" },
};

export const LEVEL_CONFIG: Record<LogLevel, { label: string; className: string }> = {
  info:    { label: "Info",    className: "bg-blue-100  text-blue-700"  },
  warning: { label: "Aviso",   className: "bg-amber-100 text-amber-700" },
  error:   { label: "Erro",    className: "bg-red-100   text-red-700"   },
};

function daysAgo(days: number, hours = 0, minutes = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

export const MOCK_LOGS: LogEntry[] = [
  { id: "1",  action: "LOGIN",          level: "info",    usuario: "Regina Oliveira",   email: "regina@clinica.com.br",   detalhes: "Acesso realizado com sucesso.",                              ip: "192.168.1.10", timestamp: daysAgo(0, 8,  5)  },
  { id: "2",  action: "UPLOAD",         level: "info",    usuario: "Regina Oliveira",   email: "regina@clinica.com.br",   detalhes: "Exame enviado — protocolo EX2026001234 (Hemograma Completo).", ip: "192.168.1.10", timestamp: daysAgo(0, 8,  22) },
  { id: "3",  action: "UPLOAD",         level: "info",    usuario: "Thiago Alves",      email: "thiago@clinica.com.br",   detalhes: "Exame enviado — protocolo EX2026005678 (Glicemia em Jejum).",  ip: "192.168.1.15", timestamp: daysAgo(0, 9,  10) },
  { id: "4",  action: "EXAM_VIEWED",    level: "info",    usuario: "Fernanda Costa",    email: "fernanda@clinica.com.br", detalhes: "Visualização do exame EX2026005678.",                          ip: "192.168.1.12", timestamp: daysAgo(0, 9,  45) },
  { id: "5",  action: "DOWNLOAD",       level: "info",    usuario: "Fernanda Costa",    email: "fernanda@clinica.com.br", detalhes: "Download do laudo EX2026005678 (Glicemia em Jejum).",          ip: "192.168.1.12", timestamp: daysAgo(0, 9,  46) },
  { id: "6",  action: "USER_CREATED",   level: "info",    usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Novo usuário criado: juliana@clinica.com.br (MEMBER).",       ip: "10.0.0.5",     timestamp: daysAgo(0, 10, 30) },
  { id: "7",  action: "LOGIN",          level: "info",    usuario: "Juliana Ramos",     email: "juliana@clinica.com.br",  detalhes: "Acesso realizado com sucesso.",                              ip: "192.168.1.20", timestamp: daysAgo(0, 11, 0)  },
  { id: "8",  action: "UPLOAD",         level: "info",    usuario: "Juliana Ramos",     email: "juliana@clinica.com.br",  detalhes: "Exame enviado — protocolo EX2026009101 (Colesterol Total).",  ip: "192.168.1.20", timestamp: daysAgo(0, 11, 18) },
  { id: "9",  action: "STATUS_CHANGED", level: "warning", usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Usuário bruno@clinica.com.br desativado.",                    ip: "10.0.0.5",     timestamp: daysAgo(0, 14, 0)  },
  { id: "10", action: "LOGOUT",         level: "info",    usuario: "Regina Oliveira",   email: "regina@clinica.com.br",   detalhes: "Sessão encerrada.",                                           ip: "192.168.1.10", timestamp: daysAgo(0, 17, 55) },
  { id: "11", action: "LOGIN",          level: "info",    usuario: "Thiago Alves",      email: "thiago@clinica.com.br",   detalhes: "Acesso realizado com sucesso.",                              ip: "192.168.1.15", timestamp: daysAgo(1, 8,  0)  },
  { id: "12", action: "EXAM_VIEWED",    level: "info",    usuario: "Thiago Alves",      email: "thiago@clinica.com.br",   detalhes: "Visualização do exame EX2026001234.",                        ip: "192.168.1.15", timestamp: daysAgo(1, 8,  35) },
  { id: "13", action: "DOWNLOAD",       level: "info",    usuario: "Thiago Alves",      email: "thiago@clinica.com.br",   detalhes: "Download do laudo EX2026001234 (Hemograma Completo).",       ip: "192.168.1.15", timestamp: daysAgo(1, 8,  36) },
  { id: "14", action: "USER_UPDATED",   level: "warning", usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Role de thiago@clinica.com.br alterada: MEMBER → ADMIN.",    ip: "10.0.0.5",     timestamp: daysAgo(1, 10, 5)  },
  { id: "15", action: "UPLOAD",         level: "info",    usuario: "Patricia Sousa",    email: "patricia@clinica.com.br", detalhes: "Exame enviado — protocolo EX2026001122 (Raio-X Tórax).",     ip: "192.168.1.25", timestamp: daysAgo(1, 11, 40) },
  { id: "16", action: "LOGIN",          level: "info",    usuario: "Regina Oliveira",   email: "regina@clinica.com.br",   detalhes: "Acesso realizado com sucesso.",                              ip: "192.168.1.10", timestamp: daysAgo(2, 8,  0)  },
  { id: "17", action: "USER_DELETED",   level: "error",   usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Usuário leo@clinica.com.br excluído do sistema.",            ip: "10.0.0.5",     timestamp: daysAgo(2, 9,  20) },
  { id: "18", action: "UPLOAD",         level: "info",    usuario: "Regina Oliveira",   email: "regina@clinica.com.br",   detalhes: "Exame enviado — protocolo EX2026003344 (TSH Ultrassensível).", ip: "192.168.1.10", timestamp: daysAgo(2, 10, 15) },
  { id: "19", action: "EXAM_VIEWED",    level: "info",    usuario: "Fernanda Costa",    email: "fernanda@clinica.com.br", detalhes: "Visualização do exame EX2026003344.",                        ip: "192.168.1.12", timestamp: daysAgo(2, 14, 0)  },
  { id: "20", action: "LOGOUT",         level: "info",    usuario: "Thiago Alves",      email: "thiago@clinica.com.br",   detalhes: "Sessão encerrada.",                                           ip: "192.168.1.15", timestamp: daysAgo(2, 18, 10) },
  { id: "21", action: "LOGIN",          level: "info",    usuario: "Camila Freitas",    email: "camila@clinica.com.br",   detalhes: "Acesso realizado com sucesso.",                              ip: "172.16.0.8",   timestamp: daysAgo(5, 9,  0)  },
  { id: "22", action: "UPLOAD",         level: "info",    usuario: "Camila Freitas",    email: "camila@clinica.com.br",   detalhes: "Exame enviado — protocolo EX2026005566 (Urina Tipo I).",     ip: "172.16.0.8",   timestamp: daysAgo(5, 9,  30) },
  { id: "23", action: "STATUS_CHANGED", level: "warning", usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Usuário patricia@clinica.com.br reativado.",                 ip: "10.0.0.5",     timestamp: daysAgo(5, 11, 0)  },
  { id: "24", action: "USER_CREATED",   level: "info",    usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Novo usuário criado: camila@clinica.com.br (MEMBER).",       ip: "10.0.0.5",     timestamp: daysAgo(14, 10, 0) },
  { id: "25", action: "LOGIN",          level: "info",    usuario: "Ricardo Nascimento", email: "ricardo@clinica.com.br", detalhes: "Acesso realizado com sucesso.",                              ip: "10.0.0.9",     timestamp: daysAgo(14, 8, 0)  },
  { id: "26", action: "USER_UPDATED",   level: "warning", usuario: "Ricardo Nascimento", email: "ricardo@clinica.com.br", detalhes: "Nome de fernanda@clinica.com.br atualizado.",                ip: "10.0.0.9",     timestamp: daysAgo(20, 15, 0) },
  { id: "27", action: "UPLOAD",         level: "info",    usuario: "Patricia Sousa",    email: "patricia@clinica.com.br", detalhes: "Exame enviado — protocolo EX2026007788 (Eletrocardiograma).", ip: "192.168.1.25", timestamp: daysAgo(25, 9,  0)  },
  { id: "28", action: "USER_DELETED",   level: "error",   usuario: "Carlos Mendes",     email: "carlos@clinica.com.br",   detalhes: "Usuário teste@clinica.com.br excluído do sistema.",          ip: "10.0.0.5",     timestamp: daysAgo(28, 16, 0) },
];

export type DateFilter = "today" | "7d" | "30d" | "all";

export function filterByDate(entries: LogEntry[], filter: DateFilter): LogEntry[] {
  if (filter === "all") return entries;
  const now = new Date();
  const cutoff = new Date();
  if (filter === "today") { cutoff.setHours(0, 0, 0, 0); }
  else if (filter === "7d")  { cutoff.setDate(now.getDate() - 7); }
  else if (filter === "30d") { cutoff.setDate(now.getDate() - 30); }
  return entries.filter((e) => new Date(e.timestamp) >= cutoff);
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day:    "2-digit",
    month:  "2-digit",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}
