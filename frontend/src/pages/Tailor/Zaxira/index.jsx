import { AlertOctagon, AlertTriangle, Boxes, PackageCheck } from 'lucide-react';
import StatCard from '../components/StatCard';
import StockAlerts from './StockAlerts';
import StockMatrix, { stockLevel } from './StockMatrix';
import { STOCK_COLORS, STOCK_SIZES, stockMatrix } from '../data/mockData';

function calculateStats() {
  let total = 0;
  let low = 0;
  let zero = 0;

  STOCK_COLORS.forEach((color) => {
    STOCK_SIZES.forEach((size) => {
      const qty = stockMatrix[color.name]?.[size] ?? 0;
      const level = stockLevel(qty);
      total += qty;
      if (level.key === 'kam') low += 1;
      if (level.key === 'nol') zero += 1;
    });
  });

  return { total, low, zero };
}

export default function Zaxira() {
  const stats = calculateStats();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Jami qoldiq"
          value={stats.total}
          hint="barcha rang va o'lchamlar"
          icon={Boxes}
          tone="teal"
        />
        <StatCard
          label="Kam qoldiq"
          value={stats.low}
          hint="10 donadan kam variantlar"
          icon={AlertTriangle}
          tone="amber"
        />
        <StatCard
          label="Nol qoldiq"
          value={stats.zero}
          hint="tugagan variantlar"
          icon={AlertOctagon}
          tone="red"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <StockMatrix />
        <StockAlerts />
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-teal-500/25 bg-teal-500/[0.07] px-4 py-3.5 text-sm text-teal-300">
        <PackageCheck className="h-5 w-5 shrink-0" />
        Oxirgi inventarizatsiya: 07.10.2026 · Keyingi hisobot har payshanba kuni
      </div>
    </div>
  );
}
