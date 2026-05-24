// src/utils/common.ts

// Garante que nunca retorna null/undefined
export const isNull = (value?: string | null): string => value ?? "";

// Normaliza string para comparação
export const normalize = (value?: string | null): string =>
  (value ?? "").toLowerCase();

