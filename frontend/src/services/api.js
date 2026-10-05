import { STORAGE_KEYS } from '../constants/storage';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function api(path, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || 'Serverda xatolik yuz berdi');
  }

  return data;
}
