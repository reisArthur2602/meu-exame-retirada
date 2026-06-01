import { Download, Lock, Share2 } from 'lucide-react';

const items = [
    {
        icon: <Download className="size-6" />,
        color: 'text-blue-600 bg-blue-50',
        title: 'Acesso imediato ao laudo',
        description:
            'Assim que o resultado estiver disponível, você baixa o PDF diretamente — sem precisar ligar ou ir à clínica.',
    },
    {
        icon: <Share2 className="size-6" />,
        color: 'text-violet-600 bg-violet-50',
        title: 'Compartilhe com seu médico',
        description:
            'Envie o laudo por WhatsApp ou e-mail através de um link seguro, com prazo de validade que você controla.',
    },
    {
        icon: <Lock className="size-6" />,
        color: 'text-green-600 bg-green-50',
        title: 'Seus dados protegidos',
        description:
            'Acesso restrito ao portador do CPF e do protocolo — nenhuma outra pessoa consegue visualizar o seu resultado.',
    },
];

export default function Features() {
    return (
        <section id="funcionalidades" className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                        Por que online?
                    </span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
                        Cuidado com o seu resultado
                    </h2>
                    <p className="mt-3 text-base text-slate-500 max-w-lg mx-auto">
                        Pensado para facilitar sua vida, com a segurança que informações de saúde exigem.
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div key={item.title} className="flex flex-col items-start gap-4">
                            <div className={`size-12 rounded-xl flex items-center justify-center ${item.color}`}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
