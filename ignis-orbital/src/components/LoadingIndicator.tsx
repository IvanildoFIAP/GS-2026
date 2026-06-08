// components/LoadingIndicator.tsx
// Indicador de carregamento centralizado reutilizável

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants/theme';

type Props = {
  mensagem?: string;
};

export function LoadingIndicator({ mensagem = 'Carregando...' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  texto: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});
