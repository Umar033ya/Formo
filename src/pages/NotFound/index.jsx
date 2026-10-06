import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: 48, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1>404</h1>
      <p>Sahifa topilmadi</p>
      <Link to="/">Bosh sahifaga qaytish</Link>
    </div>
  );
}
