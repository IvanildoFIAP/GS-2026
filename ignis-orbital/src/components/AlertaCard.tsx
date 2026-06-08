// components/AlertaCard.tsx
// Card reutilizável para exibir um foco de calor no feed

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { colors, fonts, getRiskColor, radius, spacing } from '../constants/theme';
import { Alerta } from '../services/alertas';

type Props = {
  alerta: Alerta;
  onPress: () => void;
};

export function AlertaCard({ alerta, onPress }: Props) {
  const corRisco = getRiskColor(alerta.risco);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.riscoBar, { backgroundColor: corRisco }]} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.regiao}>{alerta.regiao_nome}</Text>
          <View style={[styles.badge, { backgroundColor: corRisco + '22', borderColor: corRisco }]}>
            <Text style={[styles.badgeText, { color: corRisco }]}>{alerta.risco}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.labelRow}>
            <Icon name="thermometer-half" size={12} color={colors.textSecondary} />
            <Text style={styles.label}>Temperatura</Text>
          </View>
          <Text style={styles.valor}>{alerta.temperatura.toFixed(1)}°C</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.labelRow}>
            <Icon name="paper-plane" size={12} color={colors.textSecondary} />
            <Text style={styles.label}>Status</Text>
          </View>
          <Text style={styles.valor}>{alerta.status}</Text>
        </View>

        <View style={styles.coordsRow}>
          <Icon name="map-marker" size={11} color={colors.textSecondary} />
          <Text style={styles.coords}>
            {alerta.coordenadas.latitude.toFixed(2)}, {alerta.coordenadas.longitude.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  riscoBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  regiao: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  badge: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: fonts.bold,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  valor: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: fonts.semiBold,
  },
  coordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  coords: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fonts.regular,
  },
});
