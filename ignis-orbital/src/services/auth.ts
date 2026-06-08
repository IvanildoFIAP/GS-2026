// services/auth.ts
// Serviço de autenticação com JWT

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export type LoginPayload = {
  email: string;
  senha: string;
};

export type Usuario = {
  nome: string;
  perfil: 'ADMIN' | 'VISITANTE';
  email?: string;
};

export type AuthResponse = {
  token: string;
  usuario: Usuario;
};

const TOKEN_KEY = '@ignis:token';
const USUARIO_KEY = '@ignis:usuario';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/api/auth/login', payload);
  return {
    token: data.token,
    usuario: {
      ...data.usuario,
      email: payload.email,
    },
  };
}

export async function salvarToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function salvarUsuario(usuario: Usuario): Promise<void> {
  await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export async function removerToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function removerUsuario(): Promise<void> {
  await AsyncStorage.removeItem(USUARIO_KEY);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getUsuarioSalvo(): Promise<Usuario | null> {
  const dados = await AsyncStorage.getItem(USUARIO_KEY);
  if (!dados) return null;
  try {
    return JSON.parse(dados);
  } catch {
    return null;
  }
}
