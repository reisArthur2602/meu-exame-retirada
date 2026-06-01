export function generateProtocolo(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1_000_000)
        .toString()
        .padStart(6, '0');
    return `EX${year}${random}`;
}
