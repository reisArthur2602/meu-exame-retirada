export function formatPhone(value: string): string {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Normaliza para 10–11 dígitos (DDD + número, sem DDI).
 * Remove formatação e descarta o prefixo 55 caso já esteja presente,
 * evitando duplicação ao montar o link wa.me.
 */
export function normalizePhone(raw: string): string {
    let digits = raw.replace(/\D/g, '');
    // 12 dígitos = DDI + DDD + 8 fixo; 13 = DDI + DDD + 9 celular
    if (digits.length === 12 || digits.length === 13) {
        digits = digits.slice(2);
    }
    return digits;
}
