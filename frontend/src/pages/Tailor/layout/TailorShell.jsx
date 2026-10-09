import { useEffect, useState } from 'react';
import { Bell, Calendar, Menu } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200">
      <style>{OUTER_CHROME_CSS}</style>

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              aria-label="Menyuni ochish"
              onClick={() => setMenuOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-extrabold text-white">{title}</h1>
              {subtitle && <p className="truncate text-xs font-medium text-slate-400">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden items-center gap-2 rounded-xl border border-white/10 bg-[#121829] px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 sm:inline-flex"
              >
                <Calendar className="h-4 w-4 text-teal-400" />
                <span>02 oktabr, 2026</span>
              </button>

              <button
                type="button"
                aria-label="Bildirishnomalar"
                className="relative rounded-xl border border-white/10 bg-[#121829] p-2 text-slate-300 transition hover:bg-white/10"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-[#0b0f19]" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
