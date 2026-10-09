import Dashboard from './Dashboard';
import Factories from './Factories';
import Orders from './Orders';

const BASE = '/operator';

export const operatorRoutes = [
  { path: '', element: <Dashboard /> },
  { path: 'orders', element: <Orders /> },
  { path: 'factories', element: <Factories /> },
];

export const operatorMenu = [
  { to: BASE, label: 'Dashboard', end: true },
  { to: `${BASE}/orders`, label: 'Buyurtmalar' },
  { to: `${BASE}/factories`, label: 'Tikuv sexlari' },
];
