import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_HOME } from '../../constants/roles';
import './Login.css';

// Superadmin, Operator va Tikuvxona uchun bitta umumiy login sahifasi.
// Rol backend javobidan aniqlanadi va foydalanuvchi o'z dashboardiga yo'naltiriladi.
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login({ phone: phone.replace(/\s/g, ''), password });
      const home = ROLE_HOME[user.role];
      if (!home) throw new Error("Bu foydalanuvchi uchun ruxsat yo'q");
      navigate(home, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <h1 className="login__title">FORMO</h1>
        <p className="login__subtitle">Tizimga kirish</p>

        <label className="login__field">
          <span>Telefon raqam</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998901234567"
            autoComplete="username"
            required
          />
        </label>

        <label className="login__field">
          <span>Parol</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </label>

        {error && <div className="login__error">{error}</div>}

        <button type="submit" className="login__submit" disabled={loading}>
          {loading ? 'Kirilmoqda...' : 'Kirish'}
        </button>
      </form>
    </div>
  );
}
