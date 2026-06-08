// constants/theme.ts
// Identidade visual do Ignis Orbital — Dark Mode

export const colors = {
  // Backgrounds
  bg:         '#0D1117', // fundo principal
  bgCard:     '#161B22', // cards e painéis
  bgInput:    '#21262D', // inputs

  // Primária / Acento
  primary:    '#FF5E00', // laranja — fogo / alerta
  primaryDim: '#7E2F00', // laranja escuro (disabled/borda)

  // Secundária
  accent:     '#1D4ED8', // azul marinho
  accentDim:  '#1E3A5F',

  // Texto
  textPrimary:   '#E6EDF3',
  textSecondary: '#8B949E',

  // Status
  riskCritical: '#F85149', // vermelho
  riskAlto:     '#FF5E00', // laranja
  riskMedio:    '#E3B341', // amarelo
  riskBaixo:    '#3FB950', // verde

  // Borda
  border: '#30363D',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
};

export const fonts = {
  regular: 'Poppins',
  semiBold: 'Poppins-600',
  bold: 'Poppins-700',
};

export const getRiskColor = (risco: string): string => {
  const map: Record<string, string> = {
    CRÍTICO: colors.riskCritical,
    ALTO:    colors.riskAlto,
    MÉDIO:   colors.riskMedio,
    BAIXO:   colors.riskBaixo,
  };
  return map[risco] ?? colors.textSecondary;
};
