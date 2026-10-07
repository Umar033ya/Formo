import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

export function JerseyPreview({ product, number = '10', compact = false }) {
  const item = product || { color: '#5A66DE', accent: '#BFD5FF' };
  return <View style={[styles.jersey, { backgroundColor: item.color }, compact && styles.compact]}><View style={[styles.stripe, { backgroundColor: item.accent }]} /><View style={styles.collar} /><Text style={[styles.brand, { color: item.accent }]}>FORMO</Text><Text style={[styles.number, { color: item.accent }]}>{number}</Text><View style={[styles.sleeve, styles.left, { backgroundColor: item.color }]} /><View style={[styles.sleeve, styles.right, { backgroundColor: item.color }]} /></View>;
}
const styles = StyleSheet.create({ jersey: { width: 126, height: 150, borderBottomLeftRadius: 26, borderBottomRightRadius: 26, borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', position: 'relative', elevation: 5 }, compact: { transform: [{ scale: 0.78 }] }, stripe: { position: 'absolute', width: 28, height: 180, transform: [{ rotate: '28deg' }], opacity: 0.55 }, collar: { position: 'absolute', top: -5, width: 37, height: 21, borderRadius: 20, backgroundColor: colors.black }, brand: { fontSize: 8, fontWeight: '900', marginTop: 14, letterSpacing: 1 }, number: { fontSize: 52, fontWeight: '900', marginTop: 9 }, sleeve: { position: 'absolute', top: 14, width: 34, height: 54, borderRadius: 12 }, left: { left: -17, transform: [{ rotate: '-27deg' }] }, right: { right: -17, transform: [{ rotate: '27deg' }] } });
