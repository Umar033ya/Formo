import { AlertOctagon, AlertTriangle, PackagePlus } from 'lucide-react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { STOCK_COLORS, STOCK_SIZES, stockMatrix } from '../data/mockData';
import { stockLevel } from './StockMatrix';

function collectVariants() {
  const result = [];
  STOCK_COLORS.forEach((color) => {
    STOCK_SIZES.forEach((size) => {
      const qty = stockMatrix[color.name]?.[size] ?? 0;
      result.push({ color: color.name, hex: color.hex, size, qty, level: stockLevel(qty) });
    });
  });
  return result;
}

function AlertPanel({ title, icon: Icon, tone, items, emptyText }) {
  const toneClasses = {
    red: {
      head: 'text-red-400',
      box: 'border-red-500/25 bg-red-500/[0.07]',
      badge: 'bg-red-500/15 text-red-300 ring-red-500/30',
      dot: 'bg-red-500',
    },
    amber: {
      head: 'text-amber-400',
      box: 'border-amber-500/25 bg-amber-500/[0.07]',
      badge: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
      dot: 'bg-amber-500',
    },
  };
  const t = toneClasses[tone];

  return (
    <Card className="overflow-hidden">
      <div className={`flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5 ${t.box}`}>
        <Icon className={`h-5 w-5 ${t.head}`} />
        <h3 className={`text-sm font-bold ${t.head}`}>{title}</h3>
        <Badge className="ml-auto" variant={tone === 'red' ? 'red' : 'amber'}>
          {items.length} ta
        </Badge>
      </div>
      <ul className="max-h-56 divide-y divide-white/5 overflow-y-auto">
        {items.length === 0 && (
          <li className="px-4 py-6 text-center text-xs text-slate-500">{emptyText}</li>
        )}
        {items.map((item) => (
          <li key={`${item.color}-${item.size}`} className="flex items-center gap-3 px-4 py-2.5">
            <span className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
            <span className="flex min-w-0 flex-1 items-center gap-2 text-sm">
              <span
                className="h-4 w-4 shrink-0 rounded-full ring-1 ring-inset ring-white/30"
                style={{ backgroundColor: item.hex }}
              />
              <span className="font-semibold text-white">{item.color}</span>
              <span className="text-slate-500">·</span>
              <span className="font-semibold text-slate-300">{item.size}</span>
            </span>
            <span
              className={`rounded-lg px-2 py-1 text-[11px] font-bold ring-1 ring-inset ${t.badge}`}
            >
              {item.qty} dona
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function StockAlerts() {
  const variants = collectVariants();
  const zero = variants.filter((v) => v.level.key === 'nol');
  const low = variants.filter((v) => v.level.key === 'kam');

  return (
    <div className="flex flex-col gap-4">
      <AlertPanel
        title="Nol qoldiqdagi variantlar"
        icon={AlertOctagon}
        tone="red"
        items={zero}
        emptyText="Nol qoldiqdagi variant yo'q"
      />
      <AlertPanel
        title="Kam qoldiqdagi variantlar"
        icon={AlertTriangle}
        tone="amber"
        items={low}
        emptyText="Kam qoldiqdagi variant yo'q"
      />
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500 active:scale-[0.98]"
      >
        <PackagePlus className="h-5 w-5" />
        Kirim hujjatini yaratish
      </button>
    </div>
  );
}
