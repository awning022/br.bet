// Motor original de Aviator/Crash para demo; não reproduz resultados de provedores comerciais.
export function sampleCrashPoint(random = Math.random) {
  const raw = Number(random());
  const r = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 0.999999999) : 0;
  return Math.max(1, Math.floor((0.99 / (1 - r)) * 100) / 100);
}

export function multiplierAtElapsedMs(elapsedMs) {
  const elapsed = Math.max(0, Number(elapsedMs) || 0);
  return Number(Math.pow(1.06, elapsed / 100).toFixed(2));
}

export function calculateAviatorPayout(stake, multiplier) {
  if (!Number.isFinite(stake) || stake <= 0) throw new Error('A aposta deve ser maior que zero.');
  if (!Number.isFinite(multiplier) || multiplier < 1) throw new Error('Multiplicador inválido.');
  return Number((stake * multiplier).toFixed(2));
}
