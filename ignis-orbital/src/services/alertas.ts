// services/alertas.ts
// Serviço de Alertas — dados mockados até o backend estar disponível
// Para usar a API real: descomente as chamadas "api.get/post/..." e remova os mocks

import { api } from './api';

export type Alerta = {
  id_alerta: number;
  regiao: string;
  temperatura: number;
  risco: 'CRÍTICO' | 'ALTO' | 'MÉDIO' | 'BAIXO';
  status: 'DETECTADO' | 'MONITORANDO' | 'EXTINTO';
  coordenadas: { lat: number; lng: number };
  sensor?: string;
  satelite_id?: string;
  descricao_risco?: string;
};

// ─── Dados Mockados ────────────────────────────────────────────────
const MOCK_ALERTAS: Alerta[] = [
  {
    id_alerta: 1,
    regiao: 'Pantanal',
    temperatura: 45.5,
    risco: 'CRÍTICO',
    status: 'DETECTADO',
    coordenadas: { lat: -18.5, lng: -56.2 },
    sensor: 'VIIRS',
    satelite_id: 'NOAA-20',
    descricao_risco: 'Foco de calor em área de alta densidade vegetal. Risco de propagação elevado nas próximas 24h devido ao baixo índice de umidade.',
  },
  {
    id_alerta: 2,
    regiao: 'Amazônia Sul',
    temperatura: 38.2,
    risco: 'ALTO',
    status: 'MONITORANDO',
    coordenadas: { lat: -9.1, lng: -63.3 },
    sensor: 'MODIS',
    satelite_id: 'Terra',
    descricao_risco: 'Área com histórico de desmatamento recente. Temperatura acima da média sazonal.',
  },
  {
    id_alerta: 3,
    regiao: 'Cerrado - TO',
    temperatura: 33.1,
    risco: 'MÉDIO',
    status: 'MONITORANDO',
    coordenadas: { lat: -10.5, lng: -48.8 },
    sensor: 'VIIRS',
    satelite_id: 'Suomi NPP',
    descricao_risco: 'Foco isolado. Brigadas de combate a incêndio foram notificadas.',
  },
  {
    id_alerta: 4,
    regiao: 'Caatinga - BA',
    temperatura: 29.0,
    risco: 'BAIXO',
    status: 'EXTINTO',
    coordenadas: { lat: -12.9, lng: -41.0 },
    sensor: 'MODIS',
    satelite_id: 'Aqua',
    descricao_risco: 'Foco extinto. Sem risco imediato de reativação.',
  },
  {
    id_alerta: 5,
    regiao: 'Mata Atlântica - SP',
    temperatura: 41.0,
    risco: 'ALTO',
    status: 'DETECTADO',
    coordenadas: { lat: -23.5, lng: -46.6 },
    sensor: 'VIIRS',
    satelite_id: 'NOAA-20',
    descricao_risco: 'Foco em área de preservação permanente. Alto risco para comunidades próximas.',
  },
];

// ─── Funções de Serviço ────────────────────────────────────────────

export async function getAlertas(): Promise<Alerta[]> {
  // Produção: return (await api.get('/api/alertas')).data;
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_ALERTAS), 800));
}

export async function getAlertaById(id: number): Promise<Alerta | undefined> {
  // Produção: return (await api.get(`/api/alertas/${id}`)).data;
  return new Promise((resolve) =>
    setTimeout(() => resolve(MOCK_ALERTAS.find((a) => a.id_alerta === id)), 600),
  );
}
