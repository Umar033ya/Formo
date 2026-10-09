import { useCallback, useMemo, useState } from 'react';

export function useAppStore() {
  const [language, setLanguage] = useState('uz');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = useCallback((item) => setCart((current) => [...current, item]), []);
  const removeFromCart = useCallback((index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index)), []);
  const toggleFavorite = useCallback((id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]), []);
  const clearCart = useCallback(() => setCart([]), []);

  return useMemo(() => ({ language, setLanguage, cart, addToCart, removeFromCart, clearCart, favorites, toggleFavorite }), [language, cart, favorites, addToCart, removeFromCart, clearCart, toggleFavorite]);
}
