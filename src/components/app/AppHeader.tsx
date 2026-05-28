import Link from "next/link";
import AvatarDropdown from "./AvatarDropdown";

type NavItem = "upload" | "usuarios" | "central" | "logs";

interface AppHeaderProps {
  active: NavItem;
}

const NAV_ITEMS: { key: NavItem; label: string; href: string }[] = [
  { key: "upload",   label: "Enviar exame", href: "/app/upload"   },
  { key: "usuarios", label: "Usuários",     href: "/app/usuarios" },
  { key: "central",  label: "Central",      href: "/app/central"  },
  { key: "logs",     label: "Logs",         href: "/app/logs"     },
];

export default function AppHeader({ active }: AppHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <span className="font-bold text-base text-slate-900">MeuExame</span>
          </Link>
          <span className="hidden sm:block text-slate-300">·</span>
          <span className="hidden sm:block text-sm font-semibold text-slate-500">Painel da Clínica</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                active === item.key
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <AvatarDropdown name="Dra. Regina" role="Recepcionista" initials="DR" />
      </div>
    </header>
  );
}
