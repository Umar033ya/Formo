import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../constants/roles';
import './DashboardLayout.css';

// Uchala rol uchun umumiy layout: sidebar menyusi rolga qarab beriladi
export default function DashboardLayout({ menu }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <div className="layout__brand">FORMO</div>
        <nav className="layout__nav">
          {menu.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `layout__link${isActive ? ' layout__link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="layout__main">
        <header className="layout__header">
          <div>
            <div className="layout__user">{user?.fullName}</div>
            <div className="layout__role">{ROLE_LABELS[role]}</div>
          </div>
          <button type="button" className="layout__logout" onClick={handleLogout}>
            Chiqish
          </button>
        </header>
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
