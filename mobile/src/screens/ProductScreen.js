import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';
import { Button, Header, Screen, Segment, formatMoney } from '../components/ui/Common';
import { JerseyPreview } from '../components/ui/JerseyPreview';

export default function ProductScreen({ product, t, onBack, onCustomize }) {
  const [side, setSide] = useState('front');
  const [variant, setVariant] = useState(0);
  const variants = [
    { label: t('kitHome'), color: product.color },
    { label: t('kitAway'), color: '#242749' },
    { label: t('kitThird'), color: '#F5A55E' },
  ];
  const previewProduct = { ...product, color: variants[variant].color };
  const specs = [
    [t('fabric'), '100%'],
    [t('designTime'), '48 h'],
    [t('sizes'), '7–XXL'],
  ];
  return (
    <Screen
      contentStyle={{ paddingBottom: 110 }}
      footer={
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerLabel}>{t('total')}</Text>
            <Text style={styles.footerPrice}>{formatMoney(product.price)}</Text>
          </View>
          <Button onPress={() => onCustomize(product)}>{t('customize')}</Button>
        </View>
      }
    >
      <Header title={product.name} subtitle={t('baseKit')} onBack={onBack} />

      <Segment
        style={styles.segment}
        options={[t('front'), t('rear')]}
        value={side === 'front' ? t('front') : t('rear')}
        onChange={(value) => setSide(value === t('front') ? 'front' : 'back')}
      />

      <View style={styles.preview}>
        <View style={styles.glow} />
        <Text style={styles.badge}>{product.badge}</Text>
        <JerseyPreview
          product={previewProduct}
          number="10"
          large
          side={side}
          name="AZIZ"
        />
      </View>

      <View style={styles.previewRow}>
        {variants.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => setVariant(index)}
            style={[styles.thumb, variant === index && styles.thumbActive]}
          >
            <View style={styles.thumbJersey}>
              <JerseyPreview product={{ ...product, color: item.color }} number="10" tiny />
            </View>
            <Text style={[styles.thumbLabel, variant === index && styles.thumbLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.description}>{t('description')}</Text>

      <View style={styles.specs}>
        {specs.map(([label, value]) => (
          <View key={label} style={styles.specRow}>
            <Text style={styles.specLabel}>{label}</Text>
            <Text style={styles.specValue}>{value}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segment: { alignSelf: 'center', marginBottom: spacing.lg },
  preview: {
    height: 300,
    borderRadius: radii.xl,
    backgroundColor: '#0C1130',
    borderWidth: 1,
    borderColor: '#1A2048',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  glow: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#182256',
    opacity: 0.75,
  },
  badge: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    color: colors.accent,
    backgroundColor: '#171E4B',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    overflow: 'hidden',
    zIndex: 2,
  },
  previewRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  thumb: {
    flex: 1,
    height: 96,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#1B2150',
    paddingTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbActive: { borderColor: colors.accent, backgroundColor: '#0E1330' },
  thumbJersey: { width: '100%', height: 64, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  thumbLabel: { color: colors.muted, fontSize: 9, fontWeight: '700', marginTop: 4 },
  thumbLabelActive: { color: colors.accent },
  description: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  specs: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#1B2150',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#171C3F',
  },
  specLabel: { color: colors.muted, fontSize: 13 },
  specValue: { color: colors.text, fontSize: 13, fontWeight: '800' },
  footer: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footerLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 0.6 },
  footerPrice: { color: colors.text, fontSize: 17, fontWeight: '900', marginTop: 3 },
});
