export * from './european-options/options-formulas'

export function roundNumber(n: number, decimal: number) {
  return Number(n.toFixed(decimal));
}
