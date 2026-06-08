// hooks/use-sobre.ts
// Hook que centraliza os dados exibidos na tela Sobre

import { COMMIT_HASH, INTEGRANTES, PROJETO } from '../constants/sobre';

export function useSobre() {
  return {
    commitHash: COMMIT_HASH,
    integrantes: INTEGRANTES,
    projeto: PROJETO,
  };
}
