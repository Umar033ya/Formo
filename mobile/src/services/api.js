import { orders, products, profile } from '../data/mockData';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

const request = async (path, options = {}) => {
  if (!API_URL) return null;
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
};

export const api = {
  async getProducts() { return (await request('/products')) || products; },
  async getOrders() { return (await request('/orders')) || orders; },
  async getProfile() { return (await request('/me')) || profile; },
  async createOrder(payload) { return (await request('/orders', { method: 'POST', body: JSON.stringify(payload) })) || { id: `#FM-${Date.now().toString().slice(-4)}`, ...payload, status: 'production' }; },
};
