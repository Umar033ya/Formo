import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../../constants/theme';
import { formatMoney } from './Common';
import { JerseyPreview } from './JerseyPreview';

export function ProductCard({ product, onPress, favorite, onFavorite }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
      <View style={styles.image}>
        <Text style={styles.badge}>{product.badge}</Text>
        {onFavorite ? (
          <Pressable onPress={onFavorite} style={styles.heart} hitSlop={8}>
            <Text style={styles.heartText}>{favorite ? '♥' : '♡'}</Text>
          </Pressable>
        ) : null}
        <JerseyPreview product={product} compact />
      </View>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>{formatMoney(product.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { width: '47.5%' },
  image: {
    height: 170,
    borderRadius: radii.md,
    backgroundColor: '#0E1330',
    borderWidth: 1,
    borderColor: '#1B2150',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: colors.teal,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    zIndex: 2,
  },
  heart: { position: 'absolute', right: 8, top: 6, zIndex: 3 },
  heartText: { color: colors.accent, fontSize: 22 },
  name: { color: colors.text, fontWeight: '800', fontSize: 13 },
  category: { color: colors.muted, fontSize: 11, marginTop: 4, textTransform: 'capitalize' },
  price: { color: colors.text, fontWeight: '800', fontSize: 12, marginTop: 6 },
  pressed: { opacity: 0.75 },
});
