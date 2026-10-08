import SearchInput from '../components/SearchInput';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { STATUS_LABELS, STATUS_VARIANTS } from '../data/mockData';
import { cx } from '../utils';

export default function QueueList({
  orders,
  counts,
  activeTab,
  onTabChange,
  query,
  onQueryChange,
  selectedId,
  onSelect,
  className,
}) {
  const tabs = [
    { key: 'barchasi', label: 'Barchasi', count: counts.barchasi },
    { key: 'yangi', label: 'Yangi', count: counts.yangi },
    { key: 'bosmada', label: 'Bosmada', count: counts.bosmada },
    { key: 'tayyor', label: 'Tayyor', count: counts.tayyor },
  ];

  return (
    <Card className={cx('flex flex-col overflow-hidden', className)}>
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Navbat</h2>
          <Badge variant="teal">{orders.length} ta buyurtma</Badge>
        </div>

        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder="Mijos yoki buyurtma raqami..."
          className="mt-3"
        />

        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={cx(
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition',
                activeTab === tab.key
                  ? 'bg-teal-600 text-white shadow-glow'
                  : 'bg-white/5 text-slate-400 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-white'
              )}
            >
              {tab.label}
              <span className={cx('ml-1.5', activeTab === tab.key ? 'text-teal-200' : 'text-slate-600')}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ul className="max-h-[62vh] divide-y divide-white/5 overflow-y-auto xl:max-h-[calc(100vh-21rem)]">
        {orders.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-slate-500">
            Buyurtma topilmadi
          </li>
        )}
        {orders.map((order) => {
          const active = order.id === selectedId;
          return (
            <li key={order.id}>
              <button
                type="button"
                onClick={() => onSelect(order.id)}
                className={cx(
                  'flex w-full items-start gap-3 px-4 py-3.5 text-left transition',
                  active ? 'bg-teal-500/10 ring-1 ring-inset ring-teal-500/40' : 'hover:bg-white/5'
                )}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: `${order.jerseyColor}dd` }}
                >
                  {order.initials}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold text-white">{order.customer}</span>
                    <span className="shrink-0 text-[11px] text-slate-500">{order.time}</span>
                  </span>

                  <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="font-mono text-teal-400">#{order.id}</span>
                    <span className="text-slate-700">·</span>
                    <span>{order.size}</span>
                    <span className="text-slate-700">·</span>
                    <span>{order.qty} dona</span>
                  </span>

                  <span className="mt-2 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-slate-500">{order.model}</span>
                    <Badge variant={STATUS_VARIANTS[order.status]}>
                      {STATUS_LABELS[order.status]}
                    </Badge>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
