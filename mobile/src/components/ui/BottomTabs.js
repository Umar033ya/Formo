import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/theme';

const TABS = [
  { key: 'home',    label: 'home',    icon: 'home-outline',         iconActive: 'home' },
  { key: 'catalog', label: 'catalog', icon: 'view-grid-outline',    iconActive: 'view-grid' },
  { key: 'studio',  label: 'studio',  icon: 'pencil-ruler',         iconActive: 'pencil-ruler' },
  { key: 'orders',  label: 'orders',  icon: 'clipboard-list-outline',iconActive: 'clipboard-list' },
  { key: 'profile', label: 'profile', icon: 'account-outline',      iconActive: 'account' },
];

export function BottomTabs({ active, onChange, cartCount, t }) {
  return (
    <View style={styles.root}>
      {TABS.map(({ key, label, icon, iconActive }) => {
        const isActive = active === key;
        return (
          <Pressable key={key} onPress={() => onChange(key)} style={styles.item}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons
                name={isActive ? iconActive : icon}
                size={24}
                color={isActive ? colors.accent : colors.muted}
              />
              {key === 'catalog' && cartCount > 0 ? (
                <View style={styles.dot}>
                  <Text style={styles.dotText}>{cartCount}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{t(label)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: '#0C1030',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  item: {
    alignItems: 'center',
    width: 65,
  },
  iconWrap: {
    position: 'relative',
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
  activeLabel: {
    color: colors.text,
    fontWeight: '800',
  },
  dot: {
    position: 'absolute',
    top: -3,
    right: -10,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotText: {
    color: colors.black,
    fontSize: 9,
    fontWeight: '900',
  },
});
