import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import { formatMoney } from './Common';
import { JerseyPreview } from './JerseyPreview';

export function ProductCard({ product, onPress, favorite, onFavorite }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.root, pressed && styles.pressed]}><View style={styles.image}><Text style={styles.badge}>{product.badge}</Text>{onFavorite ? <Pressable onPress={onFavorite} style={styles.heart}><Text style={styles.heartText}>{favorite ? '♥' : '♡'}</Text></Pressable> : null}<JerseyPreview product={product} compact /></View><Text style={styles.name}>{product.name}</Text><Text style={styles.category}>{product.category}</Text><Text style={styles.price}>{formatMoney(product.price)}</Text></Pressable>;
}
const styles = StyleSheet.create({ root: { width: '47%' }, image: { height: 190, borderRadius: 20, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 10 }, badge: { position: 'absolute', top: 12, left: 12, color: colors.success, fontSize: 9, fontWeight: '900', zIndex: 2 }, heart: { position: 'absolute', right: 10, top: 8, zIndex: 3 }, heartText: { color: colors.accent, fontSize: 24 }, name: { color: colors.text, fontWeight: '900', fontSize: 13 }, category: { color: colors.muted, fontSize: 11, marginTop: 4, textTransform: 'capitalize' }, price: { color: colors.text, fontWeight: '800', fontSize: 12, marginTop: 7 }, pressed: { opacity: 0.75 } });
