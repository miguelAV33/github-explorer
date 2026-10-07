// Números con separador de miles en español (251304 -> 251.304).
const formatter = new Intl.NumberFormat('es-ES');

export function formatCount(value: number): string {
  return formatter.format(value);
}
