// app/(public)/login.tsx
// Tela de Login — autentica o admin e salva o token JWT via AsyncStorage

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppLogo } from '../../components/AppLogo';
import { useAuth } from '../../context/AuthContext';
import { logoAspectRatio, logos } from '../../constants/images';
import { colors, fonts, radius, spacing } from '../../constants/theme';
import { getErrorMessage } from '../../services/api';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (!email.includes('@')) {
      setErro('Digite um e-mail válido.');
      return;
    }

    setErro('');
    setIsLoading(true);

    try {
      await login({ email: email.trim(), senha });
      router.replace('/(admin)/dashboard');
    } catch (error) {
      const mensagem = getErrorMessage(error, 'Erro ao fazer login.');
      setErro(mensagem);
      Alert.alert('Erro', mensagem);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <AppLogo source={logos.login} width={180} aspectRatio={logoAspectRatio.login} />
        </View>
        <Text style={styles.subtitulo}>Acesso Administrador</Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="admin@ignis.com"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            placeholderTextColor={colors.textSecondary}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity
            style={[styles.botao, isLoading && styles.botaoDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botaoTexto}>Entrar</Text>
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.dica}>
          Credencial de teste:{'\n'}admin@ignis.com · senha: 123456
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  subtitulo: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: fonts.regular,
  },
  form: {
    gap: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: fonts.semiBold,
  },
  input: {
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: spacing.sm,
    fontFamily: fonts.regular,
  },
  erro: {
    color: colors.riskCritical,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
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
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  dica: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.xl,
    lineHeight: 18,
    opacity: 0.6,
    fontFamily: fonts.regular,
  },
});
