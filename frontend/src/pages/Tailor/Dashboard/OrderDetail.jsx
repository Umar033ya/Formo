import { useNavigate } from 'react-router-dom';
import { AlertTriangle, FileDown, ImageDown, Play } from 'lucide-react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import JerseyPreview from '../components/JerseyPreview';
import { STATUS_LABELS, STATUS_VARIANTS } from '../data/mockData';
import WorkflowTracker from './WorkflowTracker';

function SpecItem({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export default function OrderDetail({ order }) {
  const navigate = useNavigate();

  if (!order) {
    return (
      <Card className="flex min-h-[320px] items-center justify-center p-8 text-center text-sm text-slate-500">
        O'ng tomondan buyurtmani tanlang
      </Card>
    );
  }

  const specs = [
    { label: 'Model', value: order.model },
    { label: 'Raqam', value: order.number },
    { label: "O'lcham", value: order.size },
    { label: 'Mato turi', value: order.fabric },
    { label: 'Tarkibi', value: order.composition },
    { label: 'Soni', value: `${order.qty} dona` },
    { label: 'Bosma rangi', value: order.printColor },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-white/10 bg-gradient-to-r from-teal-500/10 via-teal-500/[0.03] to-transparent p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-extrabold tracking-wide text-white">{order.customer}</h2>
              <Badge variant={STATUS_VARIANTS[order.status]}>
                {STATUS_LABELS[order.status]}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Buyurtma{' '}
              <span className="font-mono font-semibold text-teal-400">#{order.id}</span> · Smena
              {order.time}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-500 active:scale-[0.98]"
            >
              <Play className="h-4 w-4" />
              Bosishni boshlash
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <FileDown className="h-4 w-4" />
              PDF
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ImageDown className="h-4 w-4" />
              PNG
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4">
          <div className="mx-auto aspect-[4/5] w-full max-w-[190px]">
            <JerseyPreview
              color={order.jerseyColor}
              number={order.number}
              name={order.customer}
            />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span
              className="h-4 w-4 rounded-full ring-1 ring-inset ring-white/30"
              style={{ backgroundColor: order.jerseyColor }}
            />
            {order.printColor}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Buyurtma tafsilotlari
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {specs.map((spec) => (
              <SpecItem key={spec.label} label={spec.label} value={spec.value} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Jarayon kuzatuvi
          </h3>
          <button
            type="button"
            onClick={() => navigate('/tailor/brak')}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            <AlertTriangle className="h-4 w-4" />
            Brakni qayd etish
          </button>
        </div>
        <WorkflowTracker stage={order.stage} />
      </div>
    </Card>
  );
}
