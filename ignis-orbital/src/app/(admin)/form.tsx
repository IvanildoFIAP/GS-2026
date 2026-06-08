// app/(admin)/form.tsx
// Formulário de Criar/Editar Região
// Se receber "id" nos params, abre em modo edição; senão, em modo criação

import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useAuth } from '../../context/AuthContext';
import { colors, fonts, radius, spacing } from '../../constants/theme';
import { getErrorMessage } from '../../services/api';
import { createRegiao, getRegiaoById, updateRegiao } from '../../services/regioes';

export default function FormRegiao() {
  const { usuario, isCarregando } = useAuth();
  const params = useLocalSearchParams<{ id?: string }>();

  const regiaoId = params.id ? Number(params.id) : null;
  const modoEdicao = regiaoId !== null && !Number.isNaN(regiaoId);

  const [nmRegiao, setNmRegiao] = useState('');
  const [dsBioma, setDsBioma] = useState('');
  const [criticidade, setCriticidade] = useState('');
  const [isLoading, setIsLoading] = useState(modoEdicao);
  const [isSaving, setIsSaving] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!isCarregando && !usuario) {
      router.replace('/(public)/login');
    }
  }, [usuario, isCarregando]);

  useEffect(() => {
    if (modoEdicao && regiaoId) {
      carregarRegiao(regiaoId);
    }
  }, [modoEdicao, regiaoId]);

  async function carregarRegiao(id: number) {
    setIsLoading(true);
    setErro('');
    try {
      const regiao = await getRegiaoById(id);
      if (!regiao) throw new Error('Região não encontrada.');
      setNmRegiao(regiao.nm_regiao);
      setDsBioma(regiao.ds_bioma);
      setCriticidade(String(regiao.nr_criticidade_base));
    } catch (error) {
      const mensagem = getErrorMessage(error, 'Erro ao carregar a região.');
      setErro(mensagem);
      Alert.alert('Erro', mensagem);
    } finally {
      setIsLoading(false);
    }
  }

  if (isCarregando || !usuario) {
    return <LoadingIndicator mensagem="Verificando sessão..." />;
  }

  if (isLoading) {
    return <LoadingIndicator mensagem="Carregando região..." />;
  }

  function validar(): boolean {
    if (!nmRegiao.trim() || !dsBioma.trim() || !criticidade.trim()) {
      setErro('Todos os campos são obrigatórios.');
      return false;
    }
    const num = Number(criticidade);
    if (isNaN(num) || num < 1 || num > 10) {
      setErro('A criticidade deve ser um número entre 1 e 10.');
      return false;
    }
    setErro('');
    return true;
  }

  async function handleSalvar() {
    if (!validar()) return;

    setIsSaving(true);
    const dados = {
      nm_regiao: nmRegiao.trim(),
      ds_bioma: dsBioma.trim(),
      nr_criticidade_base: Number(criticidade),
    };

    try {
      if (modoEdicao && regiaoId) {
        await updateRegiao(regiaoId, dados);
        Alert.alert('Sucesso', 'Região atualizada!');
      } else {
        await createRegiao(dados);
        Alert.alert('Sucesso', 'Região criada!');
      }
      router.back();
    } catch (error) {
      const mensagem = getErrorMessage(error, 'Erro ao salvar. Tente novamente.');
      setErro(mensagem);
      Alert.alert('Erro', mensagem);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>
          {modoEdicao ? 'Editar Região' : 'Nova Região'}
        </Text>

        <Campo
          label="Nome da Região"
          valor={nmRegiao}
          onChange={setNmRegiao}
          placeholder="ex: Pantanal Sul"
        />
        <Campo
          label="Bioma"
          valor={dsBioma}
          onChange={setDsBioma}
          placeholder="ex: Amazônia, Cerrado..."
        />
        <Campo
          label="Criticidade Base (1–10)"
          valor={criticidade}
          onChange={setCriticidade}
          placeholder="ex: 8"
          keyboardType="numeric"
          maxLength={2}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.botao, isSaving && styles.botaoDisabled]}
          onPress={handleSalvar}
          disabled={isSaving}
        >
          {isSaving
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botaoTexto}>{modoEdicao ? 'Salvar Alterações' : 'Criar Região'}</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar} onPress={() => router.back()}>
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Campo({
  label, valor, onChange, placeholder, keyboardType = 'default', maxLength,
}: {
  label: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  maxLength?: number;
}) {
  return (
    <View style={styles.campoWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
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
  titulo: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: fonts.bold,
    marginBottom: spacing.sm,
  },
  campoWrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fonts.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  erro: {
    color: colors.riskCritical,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
  botao: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  botaoDisabled: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  botaoCancelar: {
    padding: spacing.md,
    alignItems: 'center',
  },
  botaoCancelarTexto: {
    color: colors.textSecondary,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
});
