import { evaluateFortuneTiger, spinFortuneTiger } from './fortuneTiger';

describe('Fortune Tiger — motor de rodada', () => {
  test('paga a trinca de tigres com o multiplicador definido', () => {
    const result = evaluateFortuneTiger(['tiger', 'tiger', 'tiger']);
    expect(result).toMatchObject({ kind: 'triple', payoutMultiplier: 8, symbol: 'tiger' });
  });

  test('paga um par conforme a tabela do símbolo', () => {
    const result = evaluateFortuneTiger(['gold', 'gold', 'orange']);
    expect(result).toMatchObject({ kind: 'pair', payoutMultiplier: 1.5, symbol: 'gold' });
  });

  test('não paga quando os três símbolos são diferentes', () => {
    const result = evaluateFortuneTiger(['tiger', 'gold', 'orange']);
    expect(result).toMatchObject({ kind: 'miss', payoutMultiplier: 0, symbol: null });
  });

  test('rejeita rodada que não tenha exatamente três rolos', () => {
    expect(() => evaluateFortuneTiger(['tiger', 'gold'])).toThrow('exatamente três rolos');
  });

  test('aceita gerador aleatório injetado para rodada reproduzível', () => {
    const values = [0, 0, 0];
    const result = spinFortuneTiger(() => values.shift());
    expect(result.reels).toEqual(['🐯', '🐯', '🐯']);
    expect(result).toMatchObject({ kind: 'triple', payoutMultiplier: 8 });
  });
});
