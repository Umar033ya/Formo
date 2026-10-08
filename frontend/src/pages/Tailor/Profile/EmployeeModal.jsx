import { useEffect, useState } from 'react';
import Modal from '../components/Modal';

const ROLES = ['Tikuvchi', 'Bosmachi', 'Nazoratchi', 'Dizayner', 'Boshqaruvchi'];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20';
const labelClass = 'block text-xs font-bold uppercase tracking-widest text-slate-400';

function makeInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function normalize(employee) {
  return {
    id: employee?.id ?? null,
    name: employee?.name ?? '',
    initials: employee?.initials ?? '',
    role: employee?.role ?? ROLES[0],
    phone: employee?.phone ?? '',
    shiftStart: employee?.shiftStart ?? '08:00',
    shiftEnd: employee?.shiftEnd ?? '17:00',
    language: employee?.language ?? "O'zbekcha",
    active: employee?.active ?? true,
    notifications: employee?.notifications ?? { push: true, sms: false, email: false },
  };
}

export default function EmployeeModal({ open, mode, employee, onClose, onSave }) {
  const [form, setForm] = useState(() => normalize(employee));

  useEffect(() => {
    if (open) setForm(normalize(employee));
  }, [open, employee]);

  const set = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, initials: makeInitials(form.name) });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === 'add' ? "Yangi xodim qo'shish" : 'Xodim maʼlumotlarini tahrirlash'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className={labelClass}>
          F.I.Sh.
          <input
            className={`${inputClass} mt-2`}
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            required
          />
        </label>

        <label className={labelClass}>
          Telefon raqam
          <input
            className={`${inputClass} mt-2`}
            value={form.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="+998 90 000 00 00"
            required
          />
        </label>

        <label className={labelClass}>
          Lavozim
          <select
            className={`${inputClass} mt-2`}
            value={form.role}
            onChange={(e) => set({ role: e.target.value })}
          >
            {ROLES.map((role) => (
              <option key={role} value={role} className="bg-[#111827]">
                {role}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className={labelClass}>
            Ish boshlanishi
            <input
              type="time"
              className={`${inputClass} mt-2 [color-scheme:dark]`}
              value={form.shiftStart}
              onChange={(e) => set({ shiftStart: e.target.value })}
            />
          </label>
          <label className={labelClass}>
            Ish tugashi
            <input
              type="time"
              className={`${inputClass} mt-2 [color-scheme:dark]`}
              value={form.shiftEnd}
              onChange={(e) => set({ shiftEnd: e.target.value })}
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-500"
          >
            Saqlash
          </button>
        </div>
      </form>
    </Modal>
  );
}
