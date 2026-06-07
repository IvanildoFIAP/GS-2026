// services/auth.ts
// Serviço de autenticação com JWT
// O script JWT fornecido nas aulas foi adaptado aqui para contexto React Native

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export type LoginPayload = {
  email: string;
  senha: string;
};

export type AuthResponse = {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    perfil: 'ADMIN' | 'VISITANTE';
  };
};

// ─── Mock de Login (substitua pela chamada real) ───────────────────
// Simula o endpoint POST /api/auth/login
// O token gerado segue a estrutura JWT (Header.Payload.Signature) — igual ao Script-jwt.txt das aulas

function base64Url(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function gerarTokenMock(email: string): string {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body   = base64Url(JSON.stringify({ email, perfil: 'ADMIN', iat: Date.now() }));
  const sig    = base64Url(`${header}.${body}secret`);
  return `${header}.${body}.${sig}`;
}

const MOCK_USUARIOS = [
  { email: 'admin@ignis.com', senha: '123456', nome: 'Administrador', id: 1, perfil: 'ADMIN' as const },
];

// ─── Funções de Autenticação ───────────────────────────────────────

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  // Produção: return (await api.post('/api/auth/login', payload)).data;

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const user = MOCK_USUARIOS.find(
        (u) => u.email === payload.email && u.senha === payload.senha,
      );
      if (!user) return reject(new Error('E-mail ou senha inválidos.'));

      resolve({
        token: gerarTokenMock(user.email),
        usuario: { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil },
      });
    }, 800),
  );
}

export async function salvarToken(token: string): Promise<void> {
  await AsyncStorage.setItem('@ignis:token', token);
}

export async function removerToken(): Promise<void> {
  await AsyncStorage.removeItem('@ignis:token');
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem('@ignis:token');
}
