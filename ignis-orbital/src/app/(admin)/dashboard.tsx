// app/(admin)/dashboard.tsx
// Painel Admin — lista de regiões monitoradas com opções de editar e excluir

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useAuth } from '../../context/AuthContext';
import { colors, fonts, radius, spacing } from '../../constants/theme';
import { Regiao, deleteRegiao, getRegioes } from '../../services/regioes';

export default function DashboardScreen() {
  const { usuario, isCarregando, logout } = useAuth();

  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!isCarregando && !usuario) {
      router.replace('/(public)/login');
    }
  }, [usuario, isCarregando]);

  useEffect(() => {
    if (usuario) {
      carregarRegioes();
    }
  }, [usuario]);

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
    router.replace('/');
  }

  if (isCarregando || !usuario) {
    return <LoadingIndicator mensagem="Verificando sessão..." />;
  }

  if (loading) return <LoadingIndicator mensagem="Carregando regiões..." />;

  return (
    <View style={styles.container}>
      <View style={styles.userBar}>
        <Text style={styles.userTexto}>{usuario.nome}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Icon name="sign-out" size={14} color={colors.riskCritical} />
          <Text style={styles.logoutTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      ) : null}

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

            <View style={styles.acoes}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => router.push({ pathname: '/(admin)/form', params: { regiaoJson: JSON.stringify(item) } })}
              >
                <Icon name="pencil" size={14} color={colors.accent} />
                <Text style={styles.botaoEditarTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item)}
              >
                <Icon name="trash" size={14} color={colors.riskCritical} />
                <Text style={styles.botaoExcluirTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma região cadastrada.</Text>
        }
      />

      <TouchableOpacity
        style={styles.botaoCriar}
        onPress={() => router.push('/(admin)/form')}
      >
        <Icon name="plus" size={16} color="#fff" />
        <Text style={styles.botaoCriarTexto}>Nova Região</Text>
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
    fontFamily: fonts.regular,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoutTexto: {
    color: colors.riskCritical,
    fontSize: 13,
    fontFamily: fonts.semiBold,
  },
  secaoTitulo: {
    color: colors.primary,
    fontFamily: fonts.bold,
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
    fontFamily: fonts.bold,
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
    fontFamily: fonts.semiBold,
  },
  cardBioma: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  acoes: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  botaoEditar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accentDim,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  botaoEditarTexto: {
    color: colors.accent,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  botaoExcluir: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.riskCritical + '22',
    borderRadius: radius.sm,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.riskCritical,
  },
  botaoExcluirTexto: {
    color: colors.riskCritical,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  botaoCriar: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    left: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  botaoCriarTexto: {
    color: '#fff',
    fontFamily: fonts.bold,
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
    fontFamily: fonts.regular,
  },
  vazio: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontFamily: fonts.regular,
  },
});
