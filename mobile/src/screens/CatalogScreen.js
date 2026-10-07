import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';
import { products } from '../data/mockData';
import { Header, Screen } from '../components/ui/Common';
import { ProductCard } from '../components/ui/ProductCard';

export default function CatalogScreen({ t, favorites, onToggleFavorite, onProduct }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const categories = [['all', t('all')], ['football', t('football')], ['street', t('street')], ['kids', t('kids')]];
  const filtered = useMemo(() => products.filter((item) => (category === 'all' || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <Screen><Header title={t('catalog')} subtitle={t('greetingSub')} /><View style={styles.search}><Text style={styles.icon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder={t('search')} placeholderTextColor={colors.muted} style={styles.input} /></View><View style={styles.filters}>{categories.map(([key, label]) => <Pressable key={key} onPress={() => setCategory(key)} style={[styles.filter, category === key && styles.activeFilter]}><Text style={[styles.filterText, category === key && styles.activeText]}>{label}</Text></Pressable>)}</View><View style={styles.grid}>{filtered.map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={() => onToggleFavorite(item.id)} onPress={() => onProduct(item)} />)}</View></Screen>;
}
const styles = StyleSheet.create({ search: { height: 50, borderRadius: radii.md, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, marginBottom: spacing.md }, icon: { color: colors.muted, fontSize: 24 }, input: { flex: 1, color: colors.text, marginLeft: spacing.sm, fontSize: 14 }, filters: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }, filter: { paddingHorizontal: spacing.md, paddingVertical: 9, borderRadius: radii.round, backgroundColor: colors.surface }, activeFilter: { backgroundColor: colors.primary }, filterText: { color: colors.muted, fontSize: 12 }, activeText: { color: colors.white, fontWeight: '800' }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.xl } });
