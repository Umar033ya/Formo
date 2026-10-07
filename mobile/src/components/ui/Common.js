import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, screenStyles, spacing } from '../../constants/theme';

export function Screen({ children, scroll = true, contentStyle }) {
  const Content = scroll ? require('react-native').ScrollView : View;
  return <SafeAreaView edges={['top', 'left', 'right']} style={screenStyles.safe}><Content contentContainerStyle={scroll ? [screenStyles.content, contentStyle] : undefined} style={!scroll ? [screenStyles.content, contentStyle] : undefined} showsVerticalScrollIndicator={false}>{children}</Content></SafeAreaView>;
}

export function Header({ title, subtitle, onBack, right }) {
  return <View style={styles.header}>{onBack ? <Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable> : <View style={styles.logo}><Text style={styles.logoText}>F</Text></View>}<View style={styles.headerCopy}><Text style={styles.overline}>FORMO · MIJOZ ILOVASI</Text><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>{right || null}</View>;
}

export function Button({ children, onPress, variant = 'primary', style }) { return <Pressable onPress={onPress} style={({ pressed }) => [styles.button, variant === 'secondary' && styles.secondaryButton, pressed && styles.pressed, style]}><Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryText]}>{children}</Text></Pressable>; }
export function SectionTitle({ eyebrow, title, action, onAction }) { return <View style={styles.sectionRow}><View><Text style={styles.overline}>{eyebrow}</Text><Text style={styles.sectionTitle}>{title}</Text></View>{action ? <Pressable onPress={onAction}><Text style={styles.action}>{action} →</Text></Pressable> : null}</View>; }
export function FieldLabel({ children }) { return <Text style={styles.fieldLabel}>{children}</Text>; }
export function Card({ children, style }) { return <View style={[styles.card, style]}>{children}</View>; }
export function formatMoney(value) { return `${Number(value).toLocaleString('uz-UZ')} so‘m`; }

const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', minHeight: 50, marginBottom: spacing.xl }, logo: { width: 42, height: 42, borderRadius: radii.md, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }, logoText: { color: colors.white, fontWeight: '900', fontSize: 27, fontStyle: 'italic' }, back: { width: 42, height: 42, borderRadius: radii.md, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' }, backText: { color: colors.text, fontSize: 34, lineHeight: 38 }, headerCopy: { flex: 1, marginLeft: spacing.md }, overline: { color: colors.info, fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 4 }, title: { color: colors.text, fontSize: 26, fontWeight: '900' }, subtitle: { color: colors.muted, fontSize: 12, marginTop: 3 }, button: { backgroundColor: colors.accent, borderRadius: radii.md, paddingVertical: 15, paddingHorizontal: 18, alignItems: 'center' }, buttonText: { color: colors.black, fontWeight: '900', fontSize: 13 }, secondaryButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, secondaryText: { color: colors.text }, pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] }, sectionRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: spacing.md }, sectionTitle: { color: colors.text, fontSize: 22, fontWeight: '900' }, action: { color: colors.accent, fontSize: 12, fontWeight: '800', marginBottom: 3 }, fieldLabel: { color: colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1.1, marginBottom: spacing.sm, marginTop: spacing.md }, card: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg },
});
