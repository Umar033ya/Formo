import Card from '../components/Card';
import { STOCK_COLORS, STOCK_SIZES, stockMatrix } from '../data/mockData';
import { cx } from '../utils';

export function stockLevel(qty) {
  if (qty <= 0) return { key: 'nol', label: 'Nol', variant: 'red' };
  if (qty < 10) return { key: 'kam', label: 'Kam', variant: 'amber' };
  return { key: 'yeterli', label: 'Yeterli', variant: 'teal' };
}

const BADGE_STYLES = {
  teal: 'bg-teal-500/15 text-teal-300 ring-teal-500/30',
  amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  red: 'bg-red-500/15 text-red-300 ring-red-500/40',
};

export default function StockMatrix() {
  const legend = [
    { label: 'Yeterli', style: BADGE_STYLES.teal },
    { label: 'Kam', style: BADGE_STYLES.amber },
    { label: 'Nol', style: BADGE_STYLES.red },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">
            Rang / o'lcham matritsasi
          </h2>
          <p className="mt-1 text-xs text-slate-500">Har bir variant bo'yicha qoldiq miqdori</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {legend.map((item) => (
            <span
              key={item.label}
              className={cx(
                'rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset',
                item.style
              )}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto p-2 sm:p-4">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Rang
              </th>
              {STOCK_SIZES.map((size) => (
                <th
                  key={size}
                  className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STOCK_COLORS.map((color) => (
              <tr key={color.name} className="border-t border-white/5">
                <td className="px-3 py-3">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-5 w-5 shrink-0 rounded-full ring-1 ring-inset ring-white/30"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-semibold text-white">{color.name}</span>
                  </span>
                </td>
                {STOCK_SIZES.map((size) => {
                  const qty = stockMatrix[color.name]?.[size] ?? 0;
                  const level = stockLevel(qty);
                  return (
                    <td key={size} className="px-3 py-3 text-center">
                      <span
                        title={`${level.label} — ${qty} dona`}
                        className={cx(
                          'inline-flex min-w-[62px] items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold ring-1 ring-inset',
                          BADGE_STYLES[level.variant]
                        )}
                      >
                        {qty}
                        <span className="text-[10px] font-semibold opacity-70">
                          {level.label}
                        </span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
