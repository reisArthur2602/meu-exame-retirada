import { siteUrl } from '@/constants';

export function buildWhatsAppMessage(firstName: string, protocol: string): string {
    return [
        `Olá, ${firstName}!`,
        ``,
        `Seu exame já está disponível para retirada online.`,
        ``,
        `Acesse: ${siteUrl}`,
        `Protocolo: ${protocol}`,
        ``,
        `Informe seu CPF e o protocolo acima para acessar o laudo.`,
        ``,
        `Por segurança, não compartilhe essas informações.`,
    ].join('\n');
}

export function openWhatsApp(phone: string, message: string): void {
    const digits = phone.replace(/\D/g, '');
    // Evita duplicar o DDI: 12 dígitos = DDI+DDD+fixo, 13 = DDI+DDD+celular
    const number = digits.length === 12 || digits.length === 13 ? digits : '55' + digits;
    window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
    );
}

export function maskCPFForPrint(cpf: string): string {
    return cpf.replace(/^(\d{3})(\.[\d.]+-)(  \d{2})$/, '***$2**');
}

export function printReceipt(name: string, cpf: string, protocol: string): void {
    const masked = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, '***.$2.$3-**');
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"/>
  <title>Comprovante — ${protocol}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; padding: 48px 40px; max-width: 420px; color: #1e293b; }
    .logo { font-size: 18px; font-weight: 800; color: #2563eb; margin-bottom: 24px; }
    h1 { font-size: 15px; font-weight: 700; margin-bottom: 20px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; }
    .field { margin-bottom: 14px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; color: #94a3b8; margin-bottom: 3px; }
    .value { font-size: 14px; font-weight: 600; color: #1e293b; }
    .mono { font-family: monospace; font-size: 15px; letter-spacing: .05em; }
    .divider { border: none; border-top: 1px dashed #cbd5e1; margin: 20px 0; }
    .url { font-size: 13px; color: #2563eb; font-weight: 600; }
    .note { margin-top: 20px; font-size: 11px; color: #94a3b8; line-height: 1.5; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="logo">MeuExame</div>
  <h1>Comprovante de exame online</h1>
  <div class="field"><div class="label">Paciente</div><div class="value">${name}</div></div>
  <div class="field"><div class="label">CPF</div><div class="value mono">${masked}</div></div>
  <div class="field"><div class="label">Protocolo</div><div class="value mono">${protocol}</div></div>
  <hr class="divider"/>
  <div class="field"><div class="label">Acesse em</div><div class="url">${siteUrl}/paciente</div></div>
  <p class="note">Use seu CPF e protocolo para retirar o exame.<br/>Por segurança, não compartilhe esses dados.</p>
  <script>window.onload = function(){ window.print(); window.onafterprint = function(){ window.close(); }; }</script>
</body>
</html>`;
    const win = window.open('', '_blank', 'width=520,height=560');
    win?.document.write(html);
    win?.document.close();
}
