import { useEffect, useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const OUTER_CHROME_CSS = `
  body.tailor-shell .layout__sidebar,
  body.tailor-shell .layout__header { display: none !important; }
  body.tailor-shell .layout__content { padding: 0 !important; }
  body.tailor-shell .layout__main { background: #0b0f19 !important; }
  body.tailor-shell { background: #0b0f19 !important; }
`;

export default function TailorShell({ title, subtitle, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('tailor-shell');
    return () => document.body.classList.remove('tailor-shell');
  }, []);

  const today = new Date().toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200">
      <style>{OUTER_CHROME_CSS}</style>

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0f19]/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              aria-label="Menyuni ochish"
              onClick={() => setMenuOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-bold text-white">{title}</h1>
              {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
            </div>

            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400 sm:block">
              {today}
            </span>

            <button
              type="button"
              aria-label="Bildirishnomalar"
              className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/10"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-[#0b0f19]" />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
