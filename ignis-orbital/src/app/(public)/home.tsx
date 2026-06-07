// app/(public)/home.tsx
// Tela Home/Feed — lista de alertas de focos de calor
// Padrão de fetch similar ao exemplo index-tanstack.tsx das aulas, mas usando useEffect + Fetch nativo

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AlertaCard } from '../../components/AlertaCard';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { colors, spacing } from '../../constants/theme';
import { Alerta, getAlertas } from '../../services/alertas';

export default function HomeScreen() {
  const [alertas, setAlertas]   = useState<Alerta[]>([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState('');

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function carregarAlertas() {
    setLoading(true);
    setErro('');
    try {
      const dados = await getAlertas();
      setAlertas(dados);
    } catch {
      setErro('Não foi possível carregar os alertas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingIndicator mensagem="Buscando focos de calor..." />;

  return (
    <View style={styles.container}>
      {/* Cabeçalho de status */}
      <View style={styles.headerInfo}>
        <Text style={styles.contador}>{alertas.length} alertas ativos</Text>
        <Text style={styles.atualizacao}>Dados via satélite</Text>
      </View>

      {/* Mensagem de erro */}
      {erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      ) : null}

      {/* Lista de alertas */}
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
    fontWeight: '700',
    fontSize: 14,
  },
  atualizacao: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  lista: {
    padding: spacing.lg,
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
  },
  vazio: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
