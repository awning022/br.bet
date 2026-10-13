// Motor original de Mines para demonstração com créditos fictícios.
export const MINES_BOARD_SIZE = 25;
export const MINES_HOUSE_EDGE = 0.01;

export function createMinesRound(bet, mineCount = 5, random = Math.random) {
  if (!Number.isFinite(bet) || bet <= 0) throw new Error('A aposta deve ser maior que zero.');
  if (!Number.isInteger(mineCount) || mineCount < 1 || mineCount > 24) {
    throw new Error('Escolha de 1 a 24 minas.');
  }
  const tiles = Array.from({ length: MINES_BOARD_SIZE }, (_, index) => index);
  // Fisher–Yates avoids the biased comparator-sort shuffle.
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.max(0, Math.min(0.999999999, random())) * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return { bet, mineCount, bombs: new Set(tiles.slice(0, mineCount)), opened: [], over: false, outcome: 'active' };
}

export function minesMultiplier(mineCount, safeTilesOpened) {
  if (!Number.isInteger(mineCount) || mineCount < 1 || mineCount > 24) {
    throw new Error('Quantidade de minas inválida.');
  }
  if (!Number.isInteger(safeTilesOpened) || safeTilesOpened < 0 || safeTilesOpened > 25 - mineCount) {
    throw new Error('Quantidade de casas abertas inválida.');
  }
  if (safeTilesOpened === 0) return 0;
  let survivalProbability = 1;
  for (let i = 0; i < safeTilesOpened; i++) {
    survivalProbability *= (MINES_BOARD_SIZE - mineCount - i) / (MINES_BOARD_SIZE - i);
  }
  return Number(((1 - MINES_HOUSE_EDGE) / survivalProbability).toFixed(4));
}

export function revealMinesTile(round, index) {
  if (!round || round.over) throw new Error('A rodada não está ativa.');
  if (!Number.isInteger(index) || index < 0 || index >= MINES_BOARD_SIZE) throw new Error('Casa inválida.');
  if (round.opened.includes(index)) throw new Error('Essa casa já foi aberta.');
  if (round.bombs.has(index)) {
    return { ...round, over: true, outcome: 'mine', revealedBombs: [...round.bombs] };
  }
  const opened = [...round.opened, index];
  return { ...round, opened, outcome: 'active', multiplier: minesMultiplier(round.mineCount, opened.length) };
}

export function cashoutMines(round) {
  if (!round || round.over) throw new Error('A rodada não está ativa.');
  if (round.opened.length === 0) throw new Error('Abra ao menos uma casa segura antes de recolher.');
  const multiplier = minesMultiplier(round.mineCount, round.opened.length);
  return { round: { ...round, over: true, outcome: 'cashout' }, multiplier, payout: Number((round.bet * multiplier).toFixed(2)) };
}
