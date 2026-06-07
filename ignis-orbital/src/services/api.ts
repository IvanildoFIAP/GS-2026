// services/api.ts
// Instância central do Axios com interceptor de autenticação JWT
// Para trocar mocks por API real: basta atualizar BASE_URL

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚙️ Troque pela URL real da sua API quando o backend estiver pronto
const BASE_URL = 'https://sua-api.com'; // ex: 'https://ignis-api.azurewebsites.net'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: injeta o token JWT em toda requisição automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@ignis:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de resposta: trata erros globais (ex: 401 = token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui você pode adicionar lógica de refresh token futuramente
    return Promise.reject(error);
  },
);
