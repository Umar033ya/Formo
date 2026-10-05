import Dashboard from './Dashboard';
import Orders from './Orders';

const BASE = '/tailor';

export const tailorRoutes = [
  { path: '', element: <Dashboard /> },
  { path: 'orders', element: <Orders /> },
];

export const tailorMenu = [
  { to: BASE, label: 'Dashboard', end: true },
  { to: `${BASE}/orders`, label: 'Buyurtmalar' },
];
