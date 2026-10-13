import { calculateAviatorPayout, multiplierAtElapsedMs, sampleCrashPoint } from './aviator';

describe('Aviator engine', () => {
  test('multiplier starts at 1.00x and rises with elapsed time', () => {
    expect(multiplierAtElapsedMs(0)).toBe(1);
    expect(multiplierAtElapsedMs(500)).toBeGreaterThan(1);
    expect(multiplierAtElapsedMs(1000)).toBeGreaterThan(multiplierAtElapsedMs(500));
  });

  test('crash point is deterministic with injected random source', () => {
    expect(sampleCrashPoint(() => 0)).toBe(1);
    expect(sampleCrashPoint(() => 0.5)).toBe(1.98);
  });

  test('payout uses the stake locked for the round', () => {
    expect(calculateAviatorPayout(10, 1.75)).toBe(17.5);
  });

  test('rejects invalid payout values', () => {
    expect(() => calculateAviatorPayout(0, 2)).toThrow('maior que zero');
    expect(() => calculateAviatorPayout(10, 0.5)).toThrow('Multiplicador inválido');
  });
});
