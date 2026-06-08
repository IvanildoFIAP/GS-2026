// app/(public)/sobre.tsx
// Tela "Sobre" — compõe os componentes e dados do projeto

import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card } from '../../components/Card';
import { IntegrantesList } from '../../components/IntegrantesList';
import { SobreHeader } from '../../components/SobreHeader';
import { colors, fonts, spacing } from '../../constants/theme';
import { useSobre } from '../../hooks/use-sobre';

export default function SobreScreen() {
  const { commitHash, integrantes, projeto } = useSobre();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SobreHeader nome={projeto.nome} subtitulo={projeto.subtitulo} />

      <Card title="Sobre o Projeto">
        <Text style={styles.texto}>{projeto.descricao}</Text>
        <Text style={styles.texto}>
          Desenvolvido como solução para o tema{' '}
          <Text style={styles.destaque}>{projeto.tema}</Text> da {projeto.contexto}.
        </Text>
      </Card>

      <Card title="Squad" icon="users">
        <IntegrantesList nomes={integrantes} />
      </Card>

      <Card title="Commit de Referência" icon="code-fork" iconColor={colors.accent} style={styles.commitCard}>
        <Text style={styles.commitHash}>{commitHash}</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  texto: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.regular,
  },
  destaque: {
    color: colors.primary,
    fontFamily: fonts.bold,
  },
  commitCard: {
    backgroundColor: colors.bgInput,
    borderColor: colors.accentDim,
    alignItems: 'center',
  },
  commitHash: {
    color: colors.accent,
    fontSize: 22,
    fontFamily: fonts.bold,
    fontVariant: ['tabular-nums'],
    letterSpacing: 3,
    textAlign: 'center',
  },
});
