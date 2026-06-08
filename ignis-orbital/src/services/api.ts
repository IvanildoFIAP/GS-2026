// services/api.ts
// Instância central do Axios com interceptor de autenticação JWT

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://ignis-global-production.up.railway.app';
const TOKEN_KEY = '@ignis:token';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro inesperado.'): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string } | string>;
    const data = axiosError.response?.data;

    if (typeof data === 'string' && data.trim()) return data;
    if (data && typeof data === 'object' && data.message) return data.message;
    if (data && typeof data === 'object' && data.error) return data.error;

    const status = axiosError.response?.status;
    if (status === 401) return 'Credenciais inválidas. Verifique e-mail e senha.';
    if (status === 403) return 'Acesso negado. Você não tem permissão para esta ação.';
    if (status === 404) return 'Recurso não encontrado.';
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
