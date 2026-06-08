// components/SobreHeader.tsx
// Cabeçalho da tela Sobre com logo e identidade do app

import { StyleSheet, Text, View } from 'react-native';
import { AppLogo } from './AppLogo';
import { logoAspectRatio, logos } from '../constants/images';
import { colors, fonts, spacing } from '../constants/theme';

type Props = {
  nome: string;
  subtitulo: string;
};

export function SobreHeader({ nome, subtitulo }: Props) {
  return (
    <View style={styles.header}>
      <AppLogo source={logos.sobre} aspectRatio={logoAspectRatio.sobre} />
      <Text style={styles.titulo}>{nome}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  titulo: {
    color: colors.textPrimary,
    fontSize: 32,
    fontFamily: fonts.bold,
    letterSpacing: 1,
  },
  subtitulo: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
});
