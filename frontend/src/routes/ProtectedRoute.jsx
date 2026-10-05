import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLE_HOME } from '../constants/roles';

// Login qilmagan bo'lsa -> /login, roli mos kelmasa -> o'zining dashboardiga
export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_HOME[role] ?? '/login'} replace />;
  }

  return <Outlet />;
}
