// Mecânica original e isolada do Fortune Tiger (créditos fictícios).
// O multiplicador representa o retorno total, incluindo a aposta.
export const FORTUNE_TIGER_SYMBOLS = [
  { id: 'tiger', icon: '🐯', weight: 1, triple: 8, pair: 2 },
  { id: 'gold', icon: '💰', weight: 2, triple: 6, pair: 1.5 },
  { id: 'red-envelope', icon: '🧧', weight: 3, triple: 4, pair: 1.2 },
  { id: 'dragon', icon: '🐲', weight: 4, triple: 3, pair: 1 },
  { id: 'star', icon: '⭐', weight: 5, triple: 2, pair: 0.8 },
  { id: 'orange', icon: '🍊', weight: 6, triple: 1.5, pair: 0.5 },
];

const weightedSymbols = FORTUNE_TIGER_SYMBOLS.flatMap(symbol =>
  Array.from({ length: symbol.weight }, () => symbol)
);

function pickSymbol(random) {
  const value = Number(random());
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), 0.999999999) : 0;
  return weightedSymbols[Math.floor(safeValue * weightedSymbols.length)];
}

export function evaluateFortuneTiger(reels) {
  if (!Array.isArray(reels) || reels.length !== 3) {
    throw new Error('A rodada precisa ter exatamente três rolos.');
  }
  const ids = reels.map(symbol => typeof symbol === 'string' ? symbol : symbol.id);
  const counts = ids.reduce((map, id) => map.set(id, (map.get(id) || 0) + 1), new Map());
  const match = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const symbol = FORTUNE_TIGER_SYMBOLS.find(item => item.id === match[0]);
  if (!symbol) throw new Error('Símbolo inválido na rodada.');

  if (match[1] === 3) {
    return { payoutMultiplier: symbol.triple, kind: 'triple', symbol: symbol.id, message: 'TRINCA! ' + symbol.icon + ' paga ' + symbol.triple + 'x.' };
  }
  if (match[1] === 2) {
    return { payoutMultiplier: symbol.pair, kind: 'pair', symbol: symbol.id, message: 'PAR! ' + symbol.icon + ' paga ' + symbol.pair + 'x.' };
  }
  return { payoutMultiplier: 0, kind: 'miss', symbol: null, message: 'Sem combinação premiada.' };
}

export function spinFortuneTiger(random = Math.random) {
  const reels = [pickSymbol(random), pickSymbol(random), pickSymbol(random)];
  return { reels: reels.map(symbol => symbol.icon), ...evaluateFortuneTiger(reels) };
}
