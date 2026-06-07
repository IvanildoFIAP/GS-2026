// context/AuthContext.tsx
// Contexto global de autenticação — compartilha o estado de login pelo app inteiro

import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, salvarToken, removerToken, getToken, LoginPayload } from '../services/auth';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: 'ADMIN' | 'VISITANTE';
};

type AuthContextData = {
  usuario: Usuario | null;
  isLogado: boolean;
  isCarregando: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario]       = useState<Usuario | null>(null);
  const [isCarregando, setIsCarregando] = useState(true);

  // Verifica se já há token salvo ao iniciar o app
  useEffect(() => {
    async function verificarSessao() {
      const token = await getToken();
      if (token) {
        // Em produção: valide o token com o backend aqui
        // Por ora, decodificamos o payload do mock para recuperar o usuário
        try {
          const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
          setUsuario({ id: 1, nome: 'Administrador', email: payload.email, perfil: 'ADMIN' });
        } catch {
          await removerToken();
        }
      }
      setIsCarregando(false);
    }
    verificarSessao();
  }, []);

  async function login(payload: LoginPayload) {
    const resposta = await loginService(payload);
    await salvarToken(resposta.token);
    setUsuario(resposta.usuario);
  }

  async function logout() {
    await removerToken();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, isLogado: !!usuario, isCarregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para usar o contexto facilmente
export function useAuth() {
  return useContext(AuthContext);
}
