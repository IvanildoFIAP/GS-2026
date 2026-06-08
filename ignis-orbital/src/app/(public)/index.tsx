// app/(public)/index.tsx
// Tela inicial — feed de alertas de focos de calor

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { AlertaCard } from '../../components/AlertaCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { colors, fonts, spacing } from '../../constants/theme';
import { getErrorMessage } from '../../services/api';
import { Alerta, getAlertas } from '../../services/alertas';

export default function AlertasScreen() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function carregarAlertas() {
    setIsLoading(true);
    setErro('');
    try {
      const dados = await getAlertas();
      setAlertas(dados);
    } catch (error) {
      const mensagem = getErrorMessage(error, 'Não foi possível carregar os alertas.');
      setErro(mensagem);
      Alert.alert('Erro', mensagem);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingIndicator mensagem="Buscando focos de calor..." />;

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.contador}>{alertas.length} alertas ativos</Text>
        <Text style={styles.atualizacao}>Dados via satélite</Text>
      </View>

      {erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      ) : null}

      <FlatList
        data={alertas}
        keyExtractor={(item) => String(item.id_alerta)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <AlertaCard
            alerta={item}
            onPress={() => router.push(`/(public)/alerta/${item.id_alerta}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum alerta encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contador: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  atualizacao: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  lista: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  erroContainer: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.riskCritical + '22',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.riskCritical,
  },
  erroTexto: {
    color: colors.riskCritical,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  vazio: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontFamily: fonts.regular,
  },
});
