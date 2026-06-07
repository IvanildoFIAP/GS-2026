// components/AlertaCard.tsx
// Card reutilizável para exibir um foco de calor no feed

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, getRiskColor, radius, spacing } from '../constants/theme';
import { Alerta } from '../services/alertas';

type Props = {
  alerta: Alerta;
  onPress: () => void;
};

export function AlertaCard({ alerta, onPress }: Props) {
  const corRisco = getRiskColor(alerta.risco);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Barra lateral colorida por nível de risco */}
      <View style={[styles.riscoBar, { backgroundColor: corRisco }]} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.regiao}>{alerta.regiao}</Text>
          <View style={[styles.badge, { backgroundColor: corRisco + '22', borderColor: corRisco }]}>
            <Text style={[styles.badgeText, { color: corRisco }]}>{alerta.risco}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>🌡 Temperatura</Text>
          <Text style={styles.valor}>{alerta.temperatura.toFixed(1)}°C</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>📡 Status</Text>
          <Text style={styles.valor}>{alerta.status}</Text>
        </View>

        <Text style={styles.coords}>
          {alerta.coordenadas.lat.toFixed(2)}, {alerta.coordenadas.lng.toFixed(2)}
        </Text>
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
    fontWeight: '700',
  },
  badge: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  valor: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  coords: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: spacing.xs,
  },
});
