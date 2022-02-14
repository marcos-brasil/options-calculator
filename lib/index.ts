export * from './european-black-scholes'

export function roundNumber(n: number, decimal: number) {
  return Number(n.toFixed(decimal));
}
