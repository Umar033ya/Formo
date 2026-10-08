import { NavLink, useNavigate } from 'react-router-dom';
import { Boxes, ClipboardList, Layers, LogOut, Scissors, Settings2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { cx } from '../utils';

const NAV_ITEMS = [
  { to: '/tailor', label: 'Bugungi navbat', icon: ClipboardList, end: true },
  { to: '/tailor/partiyalar', label: 'Partiyalar', icon: Layers },
  { to: '/tailor/zaxira', label: 'Zaxira', icon: Boxes },
  { to: '/tailor/profil', label: 'Profil va sozlamalar', icon: Settings2 },
];

const SHIFT_DONE = 18;
const SHIFT_TOTAL = 24;

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const percent = Math.round((SHIFT_DONE / SHIFT_TOTAL) * 100);
  const fullName = user?.fullName ?? 'Tikuvchi';
  const initials = fullName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-full flex-col gap-6 bg-[#0b0f19] p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-glow">
          <Scissors className="h-5 w-5 text-white" />
        </span>
        <span>
          <span className="block text-lg font-extrabold leading-none tracking-wide text-white">
            FORMO
          </span>
          <span className="mt-1 block text-[11px] font-medium uppercase tracking-widest text-teal-400">
            Tikuvxona
          </span>
        </span>
      </div>

      <nav className="flex flex-col gap-1.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cx(
                'flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-teal-500/15 text-teal-300 ring-1 ring-inset ring-teal-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Bugungi smena
          </span>
          <span className="rounded-full bg-teal-500/15 px-2 py-0.5 text-[11px] font-bold text-teal-400 ring-1 ring-inset ring-teal-500/30">
            {percent}%
          </span>
        </div>
        <p className="mt-3 text-2xl font-extrabold leading-none text-white">
          {SHIFT_DONE}
          <span className="text-base font-semibold text-slate-500"> / {SHIFT_TOTAL}</span>
        </p>
        <p className="mt-1.5 text-xs text-slate-500">buyurtma bajarildi</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-sm font-bold text-teal-300 ring-1 ring-inset ring-teal-500/30">
            {initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">{fullName}</span>
            <span className="block text-xs text-slate-500">
              {user?.role === 'TAILOR' ? 'Tikuvchi' : 'Xodim'}
            </span>
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Chiqish
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-white/10 lg:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Menyuni yopish"
            className="absolute inset-0 h-full w-full cursor-default bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] overflow-y-auto border-r border-white/10 animate-fade-in">
            <SidebarContent onNavigate={onClose} />
          </div>
        </div>
      )}
    </>
  );
}
