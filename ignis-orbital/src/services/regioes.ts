// services/regioes.ts
// Serviço de Regiões — CRUD completo com mocks
// Para usar a API real: descomente as chamadas "api.get/post/put/delete/..."

import { api } from './api';

export type Regiao = {
  id_regiao: number;
  nm_regiao: string;
  ds_bioma: string;
  ds_estado: string;
  nr_criticidade_base: number; // 1 a 10
};

// ─── Dados Mockados ────────────────────────────────────────────────
let MOCK_REGIOES: Regiao[] = [
  { id_regiao: 1, nm_regiao: 'Amazônia Sul',      ds_bioma: 'Amazônia',     ds_estado: 'PA', nr_criticidade_base: 8 },
  { id_regiao: 2, nm_regiao: 'Pantanal Central',   ds_bioma: 'Pantanal',     ds_estado: 'MS', nr_criticidade_base: 9 },
  { id_regiao: 3, nm_regiao: 'Cerrado Norte',      ds_bioma: 'Cerrado',      ds_estado: 'TO', nr_criticidade_base: 7 },
  { id_regiao: 4, nm_regiao: 'Caatinga Interior',  ds_bioma: 'Caatinga',     ds_estado: 'BA', nr_criticidade_base: 6 },
  { id_regiao: 5, nm_regiao: 'Mata Atlântica Sul', ds_bioma: 'Mata Atlântica', ds_estado: 'SP', nr_criticidade_base: 5 },
];

let nextId = 6;

// ─── Funções de Serviço ────────────────────────────────────────────

export async function getRegioes(): Promise<Regiao[]> {
  // Produção: return (await api.get('/api/regioes')).data;
  return new Promise((resolve) => setTimeout(() => resolve([...MOCK_REGIOES]), 800));
}

export async function createRegiao(data: Omit<Regiao, 'id_regiao'>): Promise<Regiao> {
  // Produção: return (await api.post('/api/regioes', data)).data;
  return new Promise((resolve) =>
    setTimeout(() => {
      const nova = { ...data, id_regiao: nextId++ };
      MOCK_REGIOES.push(nova);
      resolve(nova);
    }, 600),
  );
}

export async function updateRegiao(id: number, data: Omit<Regiao, 'id_regiao'>): Promise<Regiao> {
  // Produção: return (await api.put(`/api/regioes/${id}`, data)).data;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const idx = MOCK_REGIOES.findIndex((r) => r.id_regiao === id);
      if (idx === -1) return reject(new Error('Região não encontrada'));
      MOCK_REGIOES[idx] = { ...data, id_regiao: id };
      resolve(MOCK_REGIOES[idx]);
    }, 600),
  );
}

export async function deleteRegiao(id: number): Promise<void> {
  // Produção: await api.delete(`/api/regioes/${id}`);
  return new Promise((resolve) =>
    setTimeout(() => {
      MOCK_REGIOES = MOCK_REGIOES.filter((r) => r.id_regiao !== id);
      resolve();
    }, 600),
  );
}
