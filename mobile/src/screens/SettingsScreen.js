import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';
import { languageOptions } from '../i18n';
import { Button, Header, Screen } from '../components/ui/Common';

export default function SettingsScreen({ language, setLanguage, t, onBack }) {
  return <Screen><Header title={t('settings')} subtitle={t('languageSub')} onBack={onBack} /><Text style={styles.label}>{t('language')}</Text>{languageOptions.map((option) => <Pressable key={option.code} onPress={() => setLanguage(option.code)} style={[styles.option, language === option.code && styles.selected]}><View><Text style={styles.optionTitle}>{option.label}</Text><Text style={styles.optionCode}>{option.code.toUpperCase()}</Text></View><Text style={styles.radio}>{language === option.code ? '●' : '○'}</Text></Pressable>)}<Button onPress={onBack} style={styles.save}>{t('save')}</Button></Screen>;
}
const styles = StyleSheet.create({ label: { color: colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: spacing.sm }, option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.lg, marginBottom: spacing.sm, borderWidth: 1, borderColor: 'transparent' }, selected: { borderColor: colors.primary, backgroundColor: colors.surfaceRaised }, optionTitle: { color: colors.text, fontWeight: '800', fontSize: 15 }, optionCode: { color: colors.muted, fontSize: 10, marginTop: 4 }, radio: { color: colors.accent, fontSize: 22 }, save: { marginTop: spacing.lg } });
