export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div className="lg:col-span-1">
                        <a href="#" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                    />
                                </svg>
                            </div>
                            <span className="font-bold text-white">MeuExame</span>
                        </a>
                        <p className="text-sm leading-relaxed">
                            Retire e compartilhe exames laboratoriais e de imagem só com CPF e
                            protocolo. Sem cadastro, sem app — direto no navegador.
                        </p>
                        <div className="flex gap-3 mt-4">
                            {['instagram', 'twitter', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                                    aria-label={social}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {social === 'instagram' && (
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        )}
                                        {social === 'twitter' && (
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        )}
                                        {social === 'linkedin' && (
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        )}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Para pacientes</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                'Retirar exame',
                                'Como funciona',
                                'Compartilhar com médico',
                                'Segurança',
                                'FAQ',
                            ].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Suporte</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                'Central de ajuda',
                                'Contato',
                                'Status do sistema',
                                'Política de privacidade',
                                'Termos de uso',
                            ].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} MeuExame. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
