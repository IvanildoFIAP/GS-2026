// services/regioes.ts
// Serviço de Regiões — CRUD via API Spring Boot (Spring Data REST / HAL)

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

type RegiaoApi = {
  id: number;
  nm_regiao: string;
  ds_bioma: string;
  nr_criticidade_base: number;
};

type RegioesHalResponse = {
  _embedded?: {
    regioes?: RegiaoApi[];
  };
};

function mapRegiao(api: RegiaoApi): Regiao {
  return {
    id_regiao: api.id,
    nm_regiao: api.nm_regiao,
    ds_bioma: api.ds_bioma,
    nr_criticidade_base: api.nr_criticidade_base,
  };
}

export async function getRegioes(): Promise<Regiao[]> {
  const { data } = await api.get<RegioesHalResponse>('/api/regioes');
  const regioes = data._embedded?.regioes ?? [];
  return regioes.map(mapRegiao);
}

export async function getRegiaoById(id: number): Promise<Regiao | undefined> {
  try {
    const { data } = await api.get<RegiaoApi>(`/api/regioes/${id}`);
    return mapRegiao(data);
  } catch {
    return undefined;
  }
}

export async function createRegiao(payload: RegiaoPayload): Promise<Regiao> {
  const { data } = await api.post<RegiaoApi>('/api/regioes', payload);
  return mapRegiao(data);
}

export async function updateRegiao(id: number, payload: RegiaoPayload): Promise<Regiao> {
  const { data } = await api.put<RegiaoApi>(`/api/regioes/${id}`, payload);
  return mapRegiao(data);
}

export async function deleteRegiao(id: number): Promise<void> {
  await api.delete(`/api/regioes/${id}`);
}