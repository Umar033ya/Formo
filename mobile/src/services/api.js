import { orders, products, profile } from '../data/mockData';

// mobile/.env:  EXPO_PUBLIC_API_URL=http://<kompyuter-IP>:3001/api
// Telefonda "localhost" — telefonning o'zi, shuning uchun kompyuterning Wi-Fi IP manzili kerak.
// Android emulator uchun: http://10.0.2.2:3001/api
const API_URL = (() => {
  const raw = (process.env.EXPO_PUBLIC_API_URL || '').trim().replace(/\/+$/, '');
  if (!raw) return '';
  return raw.endsWith('/api') ? raw : `${raw}/api`;
})();

// Tokenlar xotirada saqlanadi (ilova yopilsa qayta login). Doimiy saqlash uchun
// keyinchalik expo-secure-store ga o'tkazish mumkin.
let tokens = { accessToken: null, refreshToken: null };
let onSessionExpired = null;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const errorMessage = (data) => {
  const msg = data?.message;
  return Array.isArray(msg) ? msg[0] : msg || 'Serverda xatolik yuz berdi';
};

async function rawRequest(path, { method = 'GET', body, auth = true } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && tokens.accessToken && { Authorization: `Bearer ${tokens.accessToken}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => null);
  return { response, data };
}

let refreshing = null;
function refreshTokens() {
  refreshing ??= (async () => {
    if (!tokens.refreshToken) return false;
    const { response, data } = await rawRequest('/auth/refresh', {
      method: 'POST',
      body: { refreshToken: tokens.refreshToken },
      auth: false,
    });
    if (!response.ok) return false;
    tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
    return true;
  })().finally(() => {
    refreshing = null;
  });
  return refreshing;
}

async function request(path, options = {}) {
  if (!API_URL) throw new ApiError("EXPO_PUBLIC_API_URL sozlanmagan (mobile/.env)", 0);

  let { response, data } = await rawRequest(path, options);
  if (response.status === 401 && options.auth !== false && tokens.refreshToken) {
    if (await refreshTokens()) {
      ({ response, data } = await rawRequest(path, options));
    } else {
      tokens = { accessToken: null, refreshToken: null };
      onSessionExpired?.();
    }
  }
  if (!response.ok) {
    if (response.status === 429) throw new ApiError("Juda ko'p urinish. Birozdan so'ng qayta urinib ko'ring", 429);
    throw new ApiError(errorMessage(data), response.status);
  }
  return data;
}

// Backendda hali yo'q endpointlar uchun: server ishlamasa yoki 404 bo'lsa mock ma'lumot
async function withMock(path, mock, options) {
  try {
    return (await request(path, options)) ?? mock;
  } catch (error) {
    if (error.status === 0 || error.status === 404 || error instanceof TypeError) return mock;
    throw error;
  }
}

/** "+998 90 123 45 67" / "901234567" -> "+998901234567" (server ham normallashtiradi) */
export function normalizePhone(phone) {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 9 ? `+998${digits}` : `+${digits}`;
}

export const auth = {
  /** Mobil foydalanuvchi ro'yxatdan o'tishi. gender: 'MALE' | 'FEMALE', height sm, weight kg */
  async register({ phone, password, fullName, gender, age, height, weight }) {
    const data = await request('/auth/register', {
      method: 'POST',
      auth: false,
      body: { phone: normalizePhone(phone), password, fullName, gender, age, height, weight },
    });
    tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
    return data.user;
  },

  async login({ phone, password }) {
    const data = await request('/auth/login', {
      method: 'POST',
      auth: false,
      body: { phone: normalizePhone(phone), password },
    });
    tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
    return data.user;
  },

  /** Serverdagi sessiyani yopadi; xato bo'lsa ham lokal chiqish bo'ladi */
  async logout() {
    try {
      if (tokens.accessToken) await request('/auth/logout', { method: 'POST' });
    } finally {
      tokens = { accessToken: null, refreshToken: null };
    }
  },

  me: () => request('/auth/me'),
  isLoggedIn: () => !!tokens.accessToken,
  /** Sessiya tugaganda (refresh ham o'tmasa) chaqiriladi — login ekraniga qaytarish uchun */
  onSessionExpired: (callback) => {
    onSessionExpired = callback;
  },
};

export const api = {
  async getProducts() { return withMock('/products', products); },
  async getOrders() { return withMock('/orders', orders); },
  async getProfile() { return auth.isLoggedIn() ? auth.me() : profile; },
  async createOrder(payload) {
    return withMock('/orders', { id: `#FM-${Date.now().toString().slice(-4)}`, ...payload, status: 'production' }, {
      method: 'POST',
      body: payload,
    });
  },
};
