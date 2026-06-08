// components/IntegrantesList.tsx
// Lista de integrantes do squad

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';

type Props = {
  nomes: string[];
};

export function IntegrantesList({ nomes }: Props) {
  return (
    <>
      {nomes.map((nome) => (
        <View key={nome} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.nome}>{nome}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  nome: {
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
});
