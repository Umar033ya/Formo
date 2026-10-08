import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, CheckCircle2, Ruler, Scissors, Shirt } from 'lucide-react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { defectReasons } from '../data/mockData';
import { cx } from '../utils';

const REASON_ICONS = {
  'bosma-siljidi': Scissors,
  'mato-nuqsoni': Shirt,
  'notogri-olcham': Ruler,
};

const PENALTY_PER_UNIT = 15000;

export default function Brak() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const penalty = (Number(quantity) || 0) * PENALTY_PER_UNIT;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) {
      setError('Brak sababini tanlang');
      return;
    }
    if (!quantity || quantity < 1) {
      setError("Brak soni 1 dan kam bo'lishi mumkin emas");
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl">
        <Card className="p-8 text-center animate-fade-in">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 text-teal-400 ring-1 ring-inset ring-teal-500/30">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-xl font-bold text-white">Brak muvaffaqiyatli qayd etildi</h2>
          <p className="mt-2 text-sm text-slate-400">
            #F-24822 buyurtma uchun {quantity} dona brak hisobga olindi. Jarima hisobi:{' '}
            <span className="font-semibold text-amber-400">
              {penalty.toLocaleString('uz-UZ')} so'm
            </span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/tailor')}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Navbatga qaytish
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setReason('');
                setQuantity(1);
                setNote('');
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Yangi brak qayd etish
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-transparent p-5">
          <div>
            <h2 className="text-lg font-bold text-white">Brakni qayd etish</h2>
            <p className="mt-1 text-sm text-slate-400">
              Buyurtma{' '}
              <span className="font-mono font-semibold text-teal-400">#F-24822</span> · DILSHOD ·
              Liverpul Home 24/25
            </p>
          </div>
          <Badge variant="red">Javobgar: bosmachi</Badge>
        </div>

        <div className="space-y-6 p-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Brak sababi
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {defectReasons.map((item) => {
                const Icon = REASON_ICONS[item.id];
                const active = reason === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setReason(item.id);
                      setError('');
                    }}
                    className={cx(
                      'rounded-2xl border p-4 text-left transition',
                      active
                        ? 'border-teal-500/60 bg-teal-500/10 ring-1 ring-inset ring-teal-500/40'
                        : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                    )}
                  >
                    <span
                      className={cx(
                        'flex h-9 w-9 items-center justify-center rounded-xl',
                        active
                          ? 'bg-teal-500/20 text-teal-300'
                          : 'bg-white/5 text-slate-400'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={cx(
                        'mt-3 block text-sm font-bold',
                        active ? 'text-white' : 'text-slate-300'
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-slate-500">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                Brak soni
              </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                Izoh
              </span>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Qo'shi izoh yozing (ixtiyoriy)..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
              />
            </label>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="text-sm">
              <p className="font-bold text-amber-300">Jarima haqida ogohlantirish</p>
              <p className="mt-1 leading-relaxed text-amber-200/70">
                Brak uchun har bir dona{' '}
                <span className="font-semibold text-amber-300">
                  {PENALTY_PER_UNIT.toLocaleString('uz-UZ')} so'm
                </span>{' '}
                jarima hisoblanadi. Jami jarima:{' '}
                <span className="font-semibold text-amber-300">
                  {penalty.toLocaleString('uz-UZ')} so'm
                </span>
                . Tasdiqlashdan oldin ma'lumotlarni tekshiring.
              </p>
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 p-5">
          <button
            type="button"
            onClick={() => navigate('/tailor')}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-500 active:scale-[0.98]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Tasdiqlash
          </button>
        </div>
      </Card>
    </form>
  );
}
