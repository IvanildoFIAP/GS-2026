// components/Card.tsx
// Card reutilizável com título opcional e ícone

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { colors, fonts, radius, spacing } from '../constants/theme';

type CardProps = {
  title?: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
  iconColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ title, icon, iconColor = colors.primary, children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {title ? (
        <View style={styles.tituloRow}>
          {icon ? <Icon name={icon} size={14} color={iconColor} /> : null}
          <Text style={styles.titulo}>{title}</Text>
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  tituloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  titulo: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
