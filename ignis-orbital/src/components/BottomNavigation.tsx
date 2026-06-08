import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, usePathname } from 'expo-router';
import Icon from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing } from '../constants/theme';

type NavItem = {
  name: string;
  route: string;
  icon: string;
  match: (pathname: string) => boolean;
};

export default function BottomNavigation() {
  const { isLogado } = useAuth();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      name: 'Sobre',
      route: '/(public)/sobre',
      icon: 'info-circle',
      match: (path) => path.includes('/sobre'),
    },
    {
      name: 'Alertas',
      route: '/',
      icon: 'bell',
      match: (path) => path === '/' || path === '/index',
    },
    {
      name: isLogado ? 'Admin' : 'Login',
      route: isLogado ? '/(admin)/dashboard' : '/(public)/login',
      icon: isLogado ? 'cog' : 'sign-in',
      match: (path) => path.includes('/dashboard') || path.includes('/login'),
    },
  ];

  function handleNavigation(route: string) {
    router.replace(route as any);
  }

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = item.match(pathname);
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => handleNavigation(item.route)}
          >
            <Icon
              name={item.icon}
              size={22}
              color={isActive ? colors.primary : colors.textSecondary}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
  },
});
