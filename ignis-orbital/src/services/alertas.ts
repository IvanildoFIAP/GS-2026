// services/alertas.ts
// Serviço de Alertas — integração com API Spring Boot

import { api } from './api';

export type Alerta = {
  id_alerta: number;
  regiao_nome: string;
  temperatura: number;
  risco: string;
  status: string;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  data_captura?: string;
  satelite?: string;
};

export async function getAlertas(): Promise<Alerta[]> {
  const { data } = await api.get<Alerta[]>('/api/alertas');
  return data;
}

export async function getAlertaById(id: number): Promise<Alerta> {
  const { data } = await api.get<Alerta>(`/api/alertas/${id}`);
  return data;
}
