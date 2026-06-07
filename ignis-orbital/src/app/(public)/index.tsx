// app/(public)/index.tsx
// Tela "Sobre" — exibe informações do projeto e o hash do último commit
// Esta tela é o ponto de entrada público do app

import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

// ⚙️ Substitua pelo hash real do último commit do GitHub antes de entregar
const COMMIT_HASH = 'a3f8d21'; // ex: obtido com `git rev-parse --short HEAD`

const INTEGRANTES = ['Leticia', 'Jennyfer', 'Paulo', '[Seu Nome]'];

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>🔥</Text>
        <Text style={styles.titulo}>Ignis Orbital</Text>
        <Text style={styles.subtitulo}>Monitoramento Orbital de Focos de Calor</Text>
      </View>

      {/* Descrição */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Sobre o Projeto</Text>
        <Text style={styles.cardTexto}>
          Ignis Orbital é um sistema de monitoramento em tempo real de focos de calor e prevenção de
          queimadas, utilizando dados de satélites como NOAA-20 e Terra/Aqua para detectar e alertar
          sobre incêndios em biomas brasileiros.
        </Text>
        <Text style={styles.cardTexto}>
          Desenvolvido como solução para o tema <Text style={styles.destaque}>Space Connect</Text> da
          Global Solution 2026 — FIAP.
        </Text>
      </View>

      {/* Integrantes */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>👥 Squad</Text>
        {INTEGRANTES.map((nome) => (
          <View key={nome} style={styles.membroRow}>
            <View style={styles.membroDot} />
            <Text style={styles.membroNome}>{nome}</Text>
          </View>
        ))}
      </View>

      {/* Hash do Commit — Requisito DevOps */}
      <View style={styles.commitCard}>
        <Text style={styles.commitLabel}>🔗 Commit de Referência</Text>
        <Text style={styles.commitHash}>{COMMIT_HASH}</Text>
      </View>

      {/* Botões de Navegação */}
      <TouchableOpacity style={styles.botaoPrimario} onPress={() => router.push('/(public)/home')}>
        <Text style={styles.botaoTexto}>Ver Alertas de Focos →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={() => router.push('/(public)/login')}>
        <Text style={styles.botaoTextoSecundario}>Acesso Administrador</Text>
      </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 56,
  },
  titulo: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitulo: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTitulo: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  cardTexto: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  destaque: {
    color: colors.primary,
    fontWeight: '700',
  },
  membroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  membroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  membroNome: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  commitCard: {
    backgroundColor: colors.bgInput,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accentDim,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  commitLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  commitHash: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    letterSpacing: 3,
  },
  botaoPrimario: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  botaoTextoSecundario: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
