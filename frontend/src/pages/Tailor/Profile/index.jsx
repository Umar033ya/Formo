import { useMemo, useState } from 'react';
import { BellRing, Check, Clock, Globe, Pencil, Plus, UserCog } from 'lucide-react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';
import Toggle from '../components/Toggle';
import EmployeeModal from './EmployeeModal';
import { employees as initialEmployees } from '../data/mockData';
import { cx } from '../utils';

const LANGUAGES = ["O'zbekcha", 'Русский', 'English'];
const ROLES = ['Tikuvchi', 'Bosmachi', 'Nazoratchi', 'Dizayner', 'Boshqaruvchi'];

export default function Profile() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedId, setSelectedId] = useState(initialEmployees[0].id);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(null); // { mode: 'edit' | 'add', employee }
  const [saved, setSaved] = useState(false);

  const selected = employees.find((emp) => emp.id === selectedId) ?? employees[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (emp) => emp.name.toLowerCase().includes(q) || emp.role.toLowerCase().includes(q)
    );
  }, [employees, query]);

  const patchEmployee = (id, patch) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...patch } : emp)));
  };

  const flashSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const handleSave = (form) => {
    if (form.id) {
      patchEmployee(form.id, form);
    } else {
      const next = { ...form, id: Date.now() };
      setEmployees((prev) => [...prev, next]);
      setSelectedId(next.id);
    }
    setModal(null);
    flashSaved();
  };

  const notify = (key) =>
    patchEmployee(selected.id, {
      notifications: { ...selected.notifications, [key]: !selected.notifications[key] },
    });

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <Card className="flex h-fit flex-col overflow-hidden">
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Xodimlar
            </h2>
            <button
              type="button"
              onClick={() => setModal({ mode: 'add', employee: null })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-500"
            >
              <Plus className="h-3.5 w-3.5" />
              Qo'shish
            </button>
          </div>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Xodim qidirish..."
            className="mt-3"
          />
        </div>

        <ul className="max-h-[60vh] divide-y divide-white/5 overflow-y-auto">
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-slate-500">Xodim topilmadi</li>
          )}
          {filtered.map((emp) => {
            const active = emp.id === selected.id;
            return (
              <li key={emp.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(emp.id)}
                  className={cx(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition',
                    active ? 'bg-teal-500/10 ring-1 ring-inset ring-teal-500/40' : 'hover:bg-white/5'
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-slate-200">
                    {emp.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white">
                      {emp.name}
                    </span>
                    <span className="block text-xs text-slate-500">{emp.role}</span>
                  </span>
                  <span
                    className={cx(
                      'h-2 w-2 shrink-0 rounded-full',
                      emp.active ? 'bg-emerald-400' : 'bg-slate-600'
                    )}
                    title={emp.active ? 'Faol' : 'Faol emas'}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-transparent p-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/15 text-lg font-extrabold text-teal-300 ring-1 ring-inset ring-teal-500/30">
            {selected.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-white">{selected.name}</h2>
              <Badge variant={selected.active ? 'emerald' : 'slate'}>
                {selected.active ? 'Faol' : 'Faol emas'}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-slate-400">
              {selected.role} · {selected.phone}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/30 animate-fade-in">
                <Check className="h-4 w-4" />
                Saqlandi
              </span>
            )}
            <button
              type="button"
              onClick={() => setModal({ mode: 'edit', employee: selected })}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-500"
            >
              <Pencil className="h-4 w-4" />
              Tahrirlash
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-5 xl:grid-cols-2">
          <section>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <BellRing className="h-4 w-4 text-teal-400" />
              Bildirishnomalar
            </h3>
            <div className="mt-2 divide-y divide-white/5">
              <Toggle
                label="Push bildirishnomalar"
                description="Yangi buyurtma haqida darhol xabar"
                checked={selected.notifications.push}
                onChange={() => notify('push')}
              />
              <Toggle
                label="SMS xabarnomalar"
                description="Smaena boshlanishi va tugashi"
                checked={selected.notifications.sms}
                onChange={() => notify('sms')}
              />
              <Toggle
                label="Email xabarnomalar"
                description="Haftalik hisobotlar pochtaga"
                checked={selected.notifications.email}
                onChange={() => notify('email')}
              />
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Clock className="h-4 w-4 text-teal-400" />
                Ish vaqti
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">
                    Boshlanishi
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{selected.shiftStart}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Tugashi</p>
                  <p className="mt-1 text-sm font-semibold text-white">{selected.shiftEnd}</p>
                </div>
              </div>
            </div>

            <label className="block">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <UserCog className="h-4 w-4 text-teal-400" />
                Lavozim
              </span>
              <select
                value={selected.role}
                onChange={(e) => patchEmployee(selected.id, { role: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role} className="bg-[#111827]">
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Globe className="h-4 w-4 text-teal-400" />
                Interfeys tili
              </span>
              <select
                value={selected.language}
                onChange={(e) => patchEmployee(selected.id, { language: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} className="bg-[#111827]">
                    {lang}
                  </option>
                ))}
              </select>
            </label>
          </section>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 p-5">
          <button
            type="button"
            onClick={() => setModal({ mode: 'edit', employee: selected })}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={flashSaved}
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-500"
          >
            Saqlash
          </button>
        </div>
      </Card>

      <EmployeeModal
        open={!!modal}
        mode={modal?.mode}
        employee={modal?.employee}
        onClose={() => setModal(null)}
        onSave={handleSave}
      />
    </div>
  );
}
