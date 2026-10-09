import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import {
  CHART_MAX,
  LABELED_DAYS,
  ORDER_SERIES,
  PERIODS,
  RECENT_AUDIT,
  ROLE_DIST,
  ROLE_DIST_MAX,
  SYSTEM_HEALTH,
  Y_TICKS,
  buildKpis,
} from './dashboardData';

const WEEKDAYS = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
];

const MONTHS_LONG = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
];

const MONTHS_SHORT = [
  'yan',
  'fev',
  'mar',
  'apr',
  'may',
  'iyn',
  'iyl',
  'avg',
  'sen',
  'okt',
  'noy',
  'dek',
];

// Maketdagi shriftlar: Onest (asosiy) va Unbounded (sarlavhalar)
const FONTS_ID = 'sa-dash-fonts';
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&family=Unbounded:wght@500;600&display=swap';

// 1 234 567 ko'rinishida — probel bilan ajratilgan
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// Takrorlanadigan Tailwind klasslari
const card = 'flex flex-col rounded-2xl bg-[#121A42] px-6 py-5';
const cardHead = 'flex items-baseline justify-between';
const cardTitle = 'font-[Unbounded,Onest,sans-serif] text-[15px] font-medium';
const link =
  'cursor-pointer border-none bg-transparent p-0 text-xs [font-family:inherit] text-[#19A7A1] hover:text-[#5FD0CA] disabled:cursor-default disabled:hover:text-[#19A7A1]';
const mono = 'font-mono text-xs text-[#A3ABCC]';

export default function SuperadminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState('d');
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    if (document.getElementById(FONTS_ID)) return;
    const el = document.createElement('link');
    el.id = FONTS_ID;
    el.rel = 'stylesheet';
    el.href = FONTS_HREF;
    document.head.appendChild(el);
  }, []);

  const kpis = useMemo(() => buildKpis(period), [period]);

  // Diagramma: oxirgi nuqta — bugun, shuning uchun sanalar orqaga sanaladi
  const chart = useMemo(() => {
    const total = ORDER_SERIES.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / ORDER_SERIES.length);
    const lastIndex = ORDER_SERIES.length - 1;
    const today = new Date();

    const bars = ORDER_SERIES.map((value, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (lastIndex - i));
      const label = `${date.getDate()}-${MONTHS_SHORT[date.getMonth()]}`;

      return {
        value,
        label,
        height: `${(value / CHART_MAX) * 100}%`,
        isToday: i === lastIndex,
        showLabel: LABELED_DAYS.includes(i),
      };
    });

    return {
      bars,
      avg,
      avgBottom: `${(avg / CHART_MAX) * 100}%`,
      total: fmt(total),
    };
  }, []);

  const greetingName = (user?.fullName || '').trim().split(/\s+/)[0];
  const now = new Date();
  const dateLine = `${WEEKDAYS[now.getDay()]}, ${now.getDate()}-${MONTHS_LONG[now.getMonth()]}`;

  return (
    // Manfiy margin layout kontentining 24px paddingini qoplaydi
    <div className="-m-6 min-h-[calc(100vh-77px)] overflow-x-auto bg-[#080C24] p-8 font-[Onest,sans-serif] text-sm leading-[1.45] text-[#F3F5F9] antialiased max-[1180px]:px-5 max-[1180px]:py-6">
      <div className="flex min-w-[1020px] flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="m-0 mb-1 font-[Unbounded,Onest,sans-serif] text-[28px] font-semibold">
              Xayrli kun{greetingName ? `, ${greetingName}` : ''}
            </h1>
            <div className="text-[#A3ABCC]">{dateLine} · barcha tizimlar kuzatuvda</div>
          </div>
          <div className="flex flex-none gap-1 rounded-xl bg-[#121A42] p-1">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={`cursor-pointer rounded-[9px] border-none [font-family:inherit] px-3.5 py-2 text-[13px] ${
                  period === p.id
                    ? 'bg-[#1B2560] text-[#F3F5F9]'
                    : 'bg-transparent text-[#A3ABCC]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="flex flex-col gap-2 rounded-2xl bg-[#121A42] p-5">
              <span className="text-[13px] text-[#A3ABCC]">{k.label}</span>
              <span className="whitespace-nowrap font-[Unbounded,Onest,sans-serif] text-[26px] font-semibold">
                {k.value}
              </span>
              <span className="text-xs" style={{ color: k.deltaColor }}>
                {k.delta}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
          <div className={`${card} gap-4`}>
            <div className={cardHead}>
              <span className={cardTitle}>Buyurtmalar · 30 kun</span>
              <span className="text-xs text-[#A3ABCC]">
                jami {chart.total} · o'rtacha kuniga {chart.avg}
              </span>
            </div>

            <div className="relative ml-[30px] mr-3.5 mt-3.5 h-[250px]">
              {Y_TICKS.map((v) => (
                <div
                  key={v}
                  className="absolute left-0 right-[-8px] border-t border-[rgba(243,245,249,0.06)]"
                  style={{ bottom: `${(v / CHART_MAX) * 100}%` }}
                >
                  <span className="absolute left-[-30px] top-[-8px] w-[22px] text-right text-[10px] text-[#7F88AE]">
                    {v}
                  </span>
                </div>
              ))}

              {/* Ustunlar turgan "polka" — 3D effekt uchun qiyshaytirilgan */}
              <div className="absolute bottom-[-10px] left-[-6px] right-[-14px] h-2.5 origin-top-left -skew-x-[45deg] border-t border-[rgba(243,245,249,0.1)] bg-[#0B1030]" />

              <div className="absolute inset-0 z-[1] flex items-end gap-[7px]">
                {chart.bars.map((b, i) => (
                  <div
                    key={b.label}
                    className="group relative flex h-full flex-1 cursor-pointer flex-col justify-end"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar === i && (
                      <div
                        className="pointer-events-none absolute left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center whitespace-nowrap rounded-lg bg-[#F3F5F9] px-2.5 py-1.5 leading-[1.25] text-[#0E1A3F] shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                        style={{ bottom: `calc(${b.height} + 16px)` }}
                      >
                        <b className="text-[13px] font-bold">{b.value} ta</b>
                        <span className="text-[11px] text-[#5B6480]">
                          {b.isToday ? `Bugun · ${b.label}` : b.label}
                        </span>
                      </div>
                    )}
                    <div className="relative transition-[height] duration-300" style={{ height: b.height }}>
                      {/* Old, yon va ustki yuza; bugungi kun hoverda ham amber qoladi */}
                      <div
                        className={`absolute inset-0 ${
                          b.isToday
                            ? 'bg-[linear-gradient(180deg,#FFBE5C,#E0891E)]'
                            : 'bg-[linear-gradient(180deg,#3A52D6,#1D2F8C)] group-hover:bg-[linear-gradient(180deg,#5B72F0,#2F46C8)]'
                        }`}
                      />
                      <div
                        className={`absolute right-[-6px] top-0 h-full w-1.5 origin-top-left -skew-y-[45deg] ${
                          b.isToday ? 'bg-[#B86A12]' : 'bg-[#14206A] group-hover:bg-[#22369E]'
                        }`}
                      />
                      <div
                        className={`absolute left-0 top-[-6px] h-1.5 w-full origin-bottom-left -skew-x-[45deg] ${
                          b.isToday ? 'bg-[#FFD28A]' : 'bg-[#5068E8] group-hover:bg-[#7C90FF]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="pointer-events-none absolute left-0 right-[-8px] z-[3] [border-top:1px_dashed_rgba(242,163,58,0.7)]"
                style={{ bottom: chart.avgBottom }}
              >
                <span className="absolute left-1 top-[-20px] whitespace-nowrap bg-[#121A42] px-1 text-[11px] font-semibold text-[#F2A33A]">
                  o'rtacha {chart.avg}
                </span>
              </div>
            </div>

            <div className="ml-[30px] mr-3.5 mt-3.5 flex gap-[7px] text-[11px] text-[#7F88AE]">
              {chart.bars.map((b) => (
                <span
                  key={b.label}
                  className={`flex-1 whitespace-nowrap text-center ${
                    b.isToday ? 'font-semibold text-[#F2A33A]' : ''
                  }`}
                >
                  {b.showLabel || b.isToday ? b.label : ''}
                </span>
              ))}
            </div>

            <div className="mt-1 flex gap-[18px] text-xs text-[#A3ABCC]">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-[#2F46C8]" />
                kunlik buyurtmalar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-[#F2A33A]" />
                bugun
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 [border-top:1px_dashed_#F2A33A]" />
                30 kunlik o'rtacha
              </span>
            </div>
          </div>

          <div className={`${card} gap-1`}>
            <div className={`${cardHead} mb-2`}>
              <span className={cardTitle}>Tizim holati</span>
              {/* Integratsiyalar sahifasi hali qurilmagan */}
              <button type="button" className={link} disabled title="Bo'lim hali tayyor emas">
                Integratsiyalar →
              </button>
            </div>
            {SYSTEM_HEALTH.map((h) => (
              <div
                key={h.name}
                className="flex items-center gap-2.5 border-b border-[rgba(243,245,249,0.05)] py-2"
              >
                <span
                  className="h-2 w-2 flex-none rounded"
                  style={{ background: h.ok ? '#19A7A1' : '#F2A33A' }}
                />
                <span className="flex-1">{h.name}</span>
                <span className="text-xs text-[#A3ABCC]">{h.meta}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
          <div className={card}>
            <div className={`${cardHead} mb-2`}>
              <span className={cardTitle}>So'nggi muhim amallar</span>
              {/* Audit jurnali sahifasi hali qurilmagan */}
              <button type="button" className={link} disabled title="Bo'lim hali tayyor emas">
                Audit jurnali →
              </button>
            </div>
            {RECENT_AUDIT.map((a) => (
              <div
                key={a.id}
                className="grid grid-cols-[56px_minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1fr)] items-center gap-3 border-t border-[rgba(243,245,249,0.05)] py-2.5"
              >
                <span className={mono}>{a.time}</span>
                <span>{a.actor}</span>
                <span className="text-[#D6DAEC]">{a.action}</span>
                <span className={`${mono} text-right`}>{a.entity}</span>
              </div>
            ))}
          </div>

          <div className={`${card} gap-3`}>
            <div className={cardHead}>
              <span className={cardTitle}>Xodimlar</span>
              <button type="button" className={link} onClick={() => navigate('/superadmin/users')}>
                Boshqarish →
              </button>
            </div>
            {ROLE_DIST.map((r) => (
              <div key={r.role} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[13px]">
                  <span>{r.name}</span>
                  <span className="text-[#A3ABCC]">{r.count}</span>
                </div>
                <div className="h-1.5 rounded-[3px] bg-[#1B2560]">
                  <div
                    className="h-1.5 rounded-[3px]"
                    style={{
                      width: `${Math.min(100, (r.count / ROLE_DIST_MAX) * 100)}%`,
                      background: r.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
