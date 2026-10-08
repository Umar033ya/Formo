import React, { useState } from 'react';
import { BottomTabs } from '../components/ui/BottomTabs';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import StudioScreen from '../screens/StudioScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductScreen from '../screens/ProductScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default function AppNavigator({ store, t }) {
  const [route, setRoute] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = (next) => setRoute(next);
  const openProduct = (product) => {
    setSelectedProduct(product);
    setRoute('product');
  };

  const content =
    route === 'home' ? (
      <HomeScreen t={t} onNavigate={navigate} onProduct={openProduct} />
    ) : route === 'catalog' ? (
      <CatalogScreen t={t} favorites={store.favorites} onToggleFavorite={store.toggleFavorite} onProduct={openProduct} />
    ) : route === 'studio' ? (
      <StudioScreen
        t={t}
        addToCart={store.addToCart}
        cartCount={store.cart.length}
        onOpenCart={() => navigate('cart')}
        onBack={() => navigate('home')}
      />
    ) : route === 'cart' ? (
      <CartScreen t={t} cart={store.cart} removeFromCart={store.removeFromCart} clearCart={store.clearCart} onBack={() => navigate('studio')} />
    ) : route === 'orders' ? (
      <OrdersScreen t={t} />
    ) : route === 'profile' ? (
      <ProfileScreen t={t} onSettings={() => navigate('settings')} onOrders={() => navigate('orders')} />
    ) : route === 'settings' ? (
      <SettingsScreen t={t} language={store.language} setLanguage={store.setLanguage} onBack={() => navigate('profile')} />
    ) : (
      <ProductScreen t={t} product={selectedProduct} onBack={() => navigate('catalog')} onCustomize={() => navigate('studio')} />
    );

  const hideTabs = ['product', 'settings', 'studio'].includes(route);

  return (
    <>
      {content}
      {!hideTabs && <BottomTabs active={route} onChange={navigate} cartCount={store.cart.length} t={t} />}
    </>
  );
}
