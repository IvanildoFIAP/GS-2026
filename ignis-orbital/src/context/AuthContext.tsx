// context/AuthContext.tsx
// Contexto global de autenticação — compartilha o estado de login pelo app inteiro

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  login as loginService,
  salvarToken,
  salvarUsuario,
  removerToken,
  removerUsuario,
  getToken,
  getUsuarioSalvo,
  LoginPayload,
  Usuario,
} from '../services/auth';

type AuthContextData = {
  usuario: Usuario | null;
  isLogado: boolean;
  isCarregando: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isCarregando, setIsCarregando] = useState(true);

  useEffect(() => {
    async function verificarSessao() {
      const token = await getToken();
      const usuarioSalvo = await getUsuarioSalvo();

      if (token && usuarioSalvo) {
        setUsuario(usuarioSalvo);
      } else if (token) {
        await removerToken();
        await removerUsuario();
      }

      setIsCarregando(false);
    }

    verificarSessao();
  }, []);

  async function login(payload: LoginPayload) {
    const resposta = await loginService(payload);
    await salvarToken(resposta.token);
    await salvarUsuario(resposta.usuario);
    setUsuario(resposta.usuario);
  }

  async function logout() {
    await removerToken();
    await removerUsuario();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, isLogado: !!usuario, isCarregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
