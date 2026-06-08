// services/regioes.ts
// Serviço de Regiões — CRUD via API Spring Boot

import { api } from './api';

export type Regiao = {
  id_regiao: number;
  nm_regiao: string;
  ds_bioma: string;
  nr_criticidade_base: number;
};

export type RegiaoPayload = {
  nm_regiao: string;
  ds_bioma: string;
  nr_criticidade_base: number;
};

export async function getRegioes(): Promise<Regiao[]> {
  const { data } = await api.get<Regiao[]>('/api/regioes');
  return data;
}

export async function getRegiaoById(id: number): Promise<Regiao | undefined> {
  const regioes = await getRegioes();
  return regioes.find((r) => r.id_regiao === id);
}

export async function createRegiao(payload: RegiaoPayload): Promise<Regiao> {
  const { data } = await api.post<Regiao>('/api/regioes', payload);
  return data;
}

export async function updateRegiao(id: number, payload: RegiaoPayload): Promise<Regiao> {
  const { data } = await api.put<Regiao>(`/api/regioes/${id}`, payload);
  return data;
}

export async function deleteRegiao(id: number): Promise<void> {
  await api.delete(`/api/regioes/${id}`);
}
