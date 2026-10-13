import { cashoutMines, createMinesRound, minesMultiplier, revealMinesTile } from './mines';

describe('Mines engine', () => {
  test('creates exactly the requested number of unique mines', () => {
    const round = createMinesRound(10, 5, () => 0.5);
    expect(round.bombs.size).toBe(5);
    expect(round.opened).toEqual([]);
    expect(round.over).toBe(false);
  });

  test('validates mine count', () => {
    expect(() => createMinesRound(10, 0)).toThrow('1 a 24');
    expect(() => createMinesRound(10, 25)).toThrow('1 a 24');
  });

  test('safe picks increase the potential multiplier', () => {
    expect(minesMultiplier(5, 2)).toBeGreaterThan(minesMultiplier(5, 1));
    expect(minesMultiplier(5, 0)).toBe(0);
  });

  test('mine hit ends the round and exposes mine positions', () => {
    const round = { bet: 10, mineCount: 1, bombs: new Set([7]), opened: [], over: false, outcome: 'active' };
    const next = revealMinesTile(round, 7);
    expect(next).toMatchObject({ over: true, outcome: 'mine', revealedBombs: [7] });
  });

  test('cashout pays according to the probability table', () => {
    const round = { bet: 10, mineCount: 5, bombs: new Set([0, 1, 2, 3, 4]), opened: [5, 6], over: false, outcome: 'active' };
    const result = cashoutMines(round);
    expect(result.payout).toBeCloseTo(10 * minesMultiplier(5, 2), 2);
    expect(result.round.outcome).toBe('cashout');
  });

  test('cannot cash out without a safe pick or play after round ends', () => {
    const round = { bet: 10, mineCount: 5, bombs: new Set([0]), opened: [], over: false, outcome: 'active' };
    expect(() => cashoutMines(round)).toThrow('ao menos uma casa segura');
    expect(() => revealMinesTile({ ...round, over: true }, 2)).toThrow('não está ativa');
  });
});
