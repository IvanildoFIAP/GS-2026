// app/(admin)/dashboard.tsx
// Painel Admin — lista de regiões monitoradas com opções de editar e excluir
// Rota protegida: só acessível após login

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useAuth } from '../../context/AuthContext';
import { colors, radius, spacing } from '../../constants/theme';
import { Regiao, deleteRegiao, getRegioes } from '../../services/regioes';

export default function DashboardScreen() {
  const { usuario, logout } = useAuth();

  const [regioes, setRegioes]   = useState<Regiao[]>([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState('');

  // Proteção de rota: redireciona se não estiver logado
  useEffect(() => {
    if (!usuario) router.replace('/(public)/login');
  }, [usuario]);

  useEffect(() => {
    carregarRegioes();
  }, []);

  async function carregarRegioes() {
    setLoading(true);
    setErro('');
    try {
      const dados = await getRegioes();
      setRegioes(dados);
    } catch {
      setErro('Erro ao carregar regiões.');
    } finally {
      setLoading(false);
    }
  }

  function confirmarExclusao(regiao: Regiao) {
    Alert.alert(
      'Excluir Região',
      `Deseja remover "${regiao.nm_regiao}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => excluirRegiao(regiao.id_regiao),
        },
      ],
    );
  }

  async function excluirRegiao(id: number) {
    try {
      await deleteRegiao(id);
      setRegioes((prev) => prev.filter((r) => r.id_regiao !== id));
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir a região.');
    }
  }

  async function handleLogout() {
    await logout();
    router.replace('/(public)/index');
  }

  if (loading) return <LoadingIndicator mensagem="Carregando regiões..." />;

  return (
    <View style={styles.container}>
      {/* Barra do usuário logado */}
      <View style={styles.userBar}>
        <Text style={styles.userTexto}>👤 {usuario?.nome}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Erro */}
      {erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      ) : null}

      {/* Lista de Regiões */}
      <FlatList
        data={regioes}
        keyExtractor={(item) => String(item.id_regiao)}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <Text style={styles.secaoTitulo}>Regiões Monitoradas ({regioes.length})</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardNome}>{item.nm_regiao}</Text>
              <View style={styles.criticidadeBadge}>
                <Text style={styles.criticidadeTexto}>Criticidade {item.nr_criticidade_base}/10</Text>
              </View>
            </View>
            <Text style={styles.cardBioma}>{item.ds_bioma} · {item.ds_estado}</Text>

            {/* Ações CRUD */}
            <View style={styles.acoes}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => router.push({ pathname: '/(admin)/form', params: { regiaoJson: JSON.stringify(item) } })}
              >
                <Text style={styles.botaoEditarTexto}>✏ Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item)}
              >
                <Text style={styles.botaoExcluirTexto}>🗑 Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma região cadastrada.</Text>
        }
      />

      {/* Botão de criar nova região */}
      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={() => router.push('/(admin)/form')}
      >
        <Text style={styles.botaoCriarTexto}>+ Nova Região</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  userBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  userTexto: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  logoutTexto: {
    color: colors.riskCritical,
    fontSize: 13,
    fontWeight: '600',
  },
  secaoTitulo: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  lista: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNome: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  criticidadeBadge: {
    backgroundColor: colors.primaryDim,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  criticidadeTexto: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  cardBioma: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  acoes: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  botaoEditar: {
    flex: 1,
    backgroundColor: colors.accentDim,
    borderRadius: radius.sm,
    padding: spacing.sm,
    alignItems: 'center',
  },
  botaoEditarTexto: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 13,
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: colors.riskCritical + '22',
    borderRadius: radius.sm,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.riskCritical,
  },
  botaoExcluirTexto: {
    color: colors.riskCritical,
    fontWeight: '600',
    fontSize: 13,
  },
  botaoCriar: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    left: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  botaoCriarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  erroContainer: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.riskCritical + '22',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.riskCritical,
  },
  erroTexto: {
    color: colors.riskCritical,
    textAlign: 'center',
  },
  vazio: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
