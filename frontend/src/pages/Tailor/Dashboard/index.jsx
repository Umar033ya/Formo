import { useMemo, useState } from 'react';
import OrderDetail from './OrderDetail';
import QueueList from './QueueList';
import { queueOrders } from '../data/mockData';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('barchasi');
  const [selectedId, setSelectedId] = useState(queueOrders[0].id);
  const [mobileView, setMobileView] = useState('detail');

  const counts = useMemo(
    () => ({
      barchasi: queueOrders.length,
      yangi: queueOrders.filter((o) => o.status === 'yangi').length,
      bosmada: queueOrders.filter((o) => o.status === 'bosmada').length,
      tayyor: queueOrders.filter((o) => o.status === 'tayyor').length,
    }),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return queueOrders.filter((order) => {
      const matchTab = tab === 'barchasi' || order.status === tab;
      const matchQuery =
        !q ||
        order.customer.toLowerCase().includes(q) ||
        order.id.toLowerCase().includes(q) ||
        order.model.toLowerCase().includes(q);
      return matchTab && matchQuery;
    });
  }, [query, tab]);

  const selected =
    queueOrders.find((order) => order.id === selectedId) ?? filtered[0] ?? queueOrders[0];

  const handleSelect = (id) => {
    setSelectedId(id);
    setMobileView('detail');
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 xl:hidden">
        <button
          type="button"
          onClick={() => setMobileView('list')}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            mobileView === 'list'
              ? 'bg-teal-600 text-white'
              : 'bg-white/5 text-slate-400 ring-1 ring-inset ring-white/10'
          }`}
        >
          Navbat
        </button>
        <button
          type="button"
          onClick={() => setMobileView('detail')}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            mobileView === 'detail'
              ? 'bg-teal-600 text-white'
              : 'bg-white/5 text-slate-400 ring-1 ring-inset ring-white/10'
          }`}
        >
          Tafsilot
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[400px_minmax(0,1fr)]">
        <QueueList
          className={`${mobileView === 'list' ? 'block' : 'hidden'} xl:block`}
          orders={filtered}
          counts={counts}
          activeTab={tab}
          onTabChange={setTab}
          query={query}
          onQueryChange={setQuery}
          selectedId={selected?.id}
          onSelect={handleSelect}
        />
        <div className={`${mobileView === 'detail' ? 'block' : 'hidden'} xl:block`}>
          <OrderDetail order={selected} />
        </div>
      </div>
    </div>
  );
}
