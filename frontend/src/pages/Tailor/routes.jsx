import Batches from './Batches';
import Dashboard from './Dashboard';
import Brak from './Brak';
import Profile from './Profile';
import Zaxira from './Zaxira';
import TailorShell from './layout/TailorShell';

const BASE = '/tailor';

const shell = (title, subtitle, element) => (
  <TailorShell title={title} subtitle={subtitle}>
    {element}
  </TailorShell>
);

export const tailorRoutes = [
  {
    path: '',
    element: shell('Bugungi navbat', "Bugungi buyurtmalar va bosma navbati", <Dashboard />),
  },
  {
    path: 'partiyalar',
    element: shell('Partiyalar', 'Model bo\'yicha bosma partiyalari', <Batches />),
  },
  {
    path: 'zaxira',
    element: shell('Zaxira', 'Mato va material qoldig\'i', <Zaxira />),
  },
  {
    path: 'brak',
    element: shell('Brakni qayd etish', 'Nosozlik va jarima qayd etish', <Brak />),
  },
  {
    path: 'profil',
    element: shell('Profil va sozlamalar', 'Xodimlar va shaxsiy sozlamalar', <Profile />),
  },
];

export const tailorMenu = [
  { to: BASE, label: 'Bugungi navbat', end: true },
  { to: `${BASE}/partiyalar`, label: 'Partiyalar' },
  { to: `${BASE}/zaxira`, label: 'Zaxira' },
  { to: `${BASE}/profil`, label: 'Profil va sozlamalar' },
];
