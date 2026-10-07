import { api } from '../../services/api';
import { ROLES } from '../../constants/roles';

// Backend hali tayyor emas, shuning uchun .env bo'lmasa ham mock login ishlaydi.
// Haqiqiy backendga ulash uchun .env da VITE_USE_MOCK_AUTH=false qiling.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH !== 'false';

// Backend tayyor bo'lguncha test uchun foydalanuvchilar (VITE_USE_MOCK_AUTH=true)
const MOCK_USERS = [
  { id: 1, fullName: 'Super Admin', phone: '+998901111111', password: 'admin123', role: ROLES.SUPERADMIN },
  { id: 2, fullName: 'Operator', phone: '+998902222222', password: 'operator123', role: ROLES.OPERATOR },
  { id: 3, fullName: 'Tikuvxona', phone: '+998903333333', password: 'tailor123', role: ROLES.TAILOR },
];

async function mockLogin({ phone, password }) {
  const found = MOCK_USERS.find((u) => u.phone === phone && u.password === password);
  if (!found) throw new Error("Telefon raqam yoki parol noto'g'ri");

  const { password: _, ...user } = found;
  return { token: `mock-token-${user.id}`, user };
}

/**
 * Bitta umumiy login. Backend telefon + parol bo'yicha foydalanuvchini topadi
 * va uning rolini qaytaradi.
 * Kutilayotgan javob: { token: string, user: { id, fullName, phone, role } }
 */
export function login(credentials) {
  if (USE_MOCK) return mockLogin(credentials);
  return api('/auth/login', { method: 'POST', body: credentials });
}
