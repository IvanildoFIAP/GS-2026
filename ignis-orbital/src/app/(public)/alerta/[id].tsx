// app/(public)/alerta/[id].tsx
// Tela de Detalhes do Alerta — dados técnicos do satélite

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { colors, fonts, getRiskColor, radius, spacing } from '../../../constants/theme';
import { getErrorMessage } from '../../../services/api';
import { Alerta, getAlertaById } from '../../../services/alertas';

export default function AlertaDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      setIsLoading(true);
      setErro('');
      try {
        const dado = await getAlertaById(Number(id));
        setAlerta(dado);
      } catch (error) {
        const mensagem = getErrorMessage(error, 'Alerta não encontrado.');
        setErro(mensagem);
        Alert.alert('Erro', mensagem);
      } finally {
        setIsLoading(false);
      }
    }
    carregar();
  }, [id]);

  if (isLoading) return <LoadingIndicator mensagem="Carregando dados do satélite..." />;
  if (erro || !alerta) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroTexto}>{erro || 'Alerta não encontrado.'}</Text>
      </View>
    );
  }

  const corRisco = getRiskColor(alerta.risco);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.riscoBadge, { backgroundColor: corRisco + '22', borderColor: corRisco }]}>
        <Icon name="exclamation-triangle" size={14} color={corRisco} />
        <Text style={[styles.riscoTexto, { color: corRisco }]}>{alerta.risco}</Text>
      </View>

      <Text style={styles.regiao}>{alerta.regiao_nome}</Text>
      <Text style={styles.status}>Status: {alerta.status}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Dados do Satélite</Text>
        <Row label="Satélite" valor={alerta.satelite ?? '—'} />
        <Row label="Temperatura" valor={`${alerta.temperatura.toFixed(1)}°C`} />
        <Row label="Latitude" valor={String(alerta.coordenadas.latitude)} />
        <Row label="Longitude" valor={String(alerta.coordenadas.longitude)} />
        <Row label="Data de Captura" valor={alerta.data_captura ?? '—'} />
      </View>
    </ScrollView>
  );
}

function Row({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  riscoBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  riscoTexto: {
    fontFamily: fonts.bold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  regiao: {
    color: colors.textPrimary,
    fontSize: 26,
    fontFamily: fonts.bold,
  },
  status: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: fonts.regular,
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
    fontFamily: fonts.bold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  rowValor: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
  erroContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  erroTexto: {
    color: colors.riskCritical,
    textAlign: 'center',
    fontSize: 15,
  },
});
