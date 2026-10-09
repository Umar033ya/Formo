// Dizayn maketidagi ko'rsatkichlar. Backend tayyor bo'lgach bu yerdagi
// konstantalar API javoblari bilan almashtiriladi.

export const PERIODS = [
  { id: 'd', label: 'Bugun' },
  { id: 'w', label: '7 kun' },
  { id: 'm', label: '30 kun' },
];

// Har bir davr uchun uchta asosiy ko'rsatkich: [label, value, delta]
const KPI_BY_PERIOD = {
  d: [
    ['Buyurtmalar', '48', '+12% kechagiga nisbatan'],
    ['Tushum', "8,47 mln so'm", '+8% kechagiga nisbatan'],
    ['Sexdagi yuk', '72%', '86 / 120 dona'],
  ],
  w: [
    ['Buyurtmalar', '286', "+9% o'tgan haftaga"],
    ['Tushum', "50,4 mln so'm", '+11%'],
    ['Sexdagi yuk', '68%', "kunlik o'rtacha"],
  ],
  m: [
    ['Buyurtmalar', '1 184', '+22% avgustga'],
    ['Tushum', "198,4 mln so'm", '+22% avgustga'],
    ['Sexdagi yuk', '64%', "kunlik o'rtacha"],
  ],
};

// Muddatga 3 soatdan kam qolgan vazifalar soni
const LATE_COUNT = 2;

export function buildKpis(period) {
  const base = KPI_BY_PERIOD[period].map(([label, value, delta]) => ({
    label,
    value,
    delta,
    // O'sish ko'rsatkichi yashil, oddiy izoh esa kulrang
    deltaColor: delta.startsWith('+') ? '#19A7A1' : '#A3ABCC',
  }));

  return base.concat({
    label: 'Kechikayotgan',
    value: String(LATE_COUNT),
    delta: 'muddatga 3 soatdan kam',
    deltaColor: LATE_COUNT ? '#F08A93' : '#19A7A1',
  });
}

// So'nggi 30 kunlik buyurtmalar
export const ORDER_SERIES = [
  28, 31, 26, 34, 30, 38, 41, 29, 33, 36, 40, 44, 37, 35, 42, 39, 45, 48, 43,
  40, 46, 51, 47, 44, 49, 53, 50, 46, 52, 48,
];

// Diagramma shkalasining yuqori chegarasi va belgilari
export const CHART_MAX = 60;
export const Y_TICKS = [0, 15, 30, 45, 60];
// X o'qida faqat shu kunlar imzolanadi
export const LABELED_DAYS = [0, 7, 14, 21, 29];

export const SYSTEM_HEALTH = [
  { name: 'API', meta: 'p95 184 ms', ok: true },
  { name: 'Navbat · print.generate', meta: '2 kutmoqda', ok: true },
  { name: 'Navbat · sms / push', meta: '0 xato', ok: true },
  { name: 'Click / Payme webhook', meta: 'oxirgisi 2 daq oldin', ok: true },
  { name: 'Eskiz SMS', meta: 'yetkazish 98,6%', ok: true },
  { name: 'Telegram bot', meta: 'kechikish 40 s', ok: false },
  { name: 'Backup', meta: 'bugun 03:00 · 7 kun', ok: true },
];

// Audit jurnalidan muhim amallar (sev: low bo'lganlari ko'rsatilmaydi)
export const RECENT_AUDIT = [
  { id: 'AUD-20931', time: '14:32', actor: 'Sardor Rahimov', action: "Rol o'zgartirildi", entity: 'user · Dilnoza K.' },
  { id: 'AUD-20930', time: '14:05', actor: 'Bekzod Aliyev', action: 'Qaytarish tasdiqlandi', entity: 'FRM-88412' },
  { id: 'AUD-20929', time: '13:48', actor: 'Dilnoza Karimova', action: 'Buyurtma bekor qilindi', entity: 'FRM-88419' },
  { id: 'AUD-20928', time: '13:20', actor: 'Malika Yusupova', action: "Narx o'zgartirildi", entity: 'product · tshirt' },
  { id: 'AUD-20926', time: '12:10', actor: 'Sardor Rahimov', action: 'Integratsiya kaliti almashtirildi', entity: 'payme.prod.key' },
];

// Xodimlar rol bo'yicha: nomi, rangi va hozirgi soni
export const ROLE_DIST = [
  { role: 'operator', name: 'Operator', color: '#8C9BF5', count: 2 },
  { role: 'kontent', name: 'Kontent-menejer', color: '#19A7A1', count: 1 },
  { role: 'moliya', name: 'Moliyachi', color: '#5FC7E8', count: 2 },
  { role: 'menejer', name: 'Sex menejeri', color: '#E88FB5', count: 1 },
  { role: 'kuryer', name: 'Kuryer', color: '#9BD27A', count: 2 },
];

// Progress chizig'i to'lishi uchun eng ko'p xodimli rol asos qilib olinadi
export const ROLE_DIST_MAX = 3;
