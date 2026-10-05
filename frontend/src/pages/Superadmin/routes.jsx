import Dashboard from './Dashboard';
import Users from './Users';
import Factories from './Factories';
import Orders from './Orders';

const BASE = '/superadmin';

export const superadminRoutes = [
  { path: '', element: <Dashboard /> },
  { path: 'users', element: <Users /> },
  { path: 'factories', element: <Factories /> },
  { path: 'orders', element: <Orders /> },
];

export const superadminMenu = [
  { to: BASE, label: 'Dashboard', end: true },
  { to: `${BASE}/users`, label: 'Foydalanuvchilar' },
  { to: `${BASE}/factories`, label: 'Tikuvxonalar' },
  { to: `${BASE}/orders`, label: 'Buyurtmalar' },
];
