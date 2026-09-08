/**
 * Detecção de ambiente e capacidade do dispositivo.
 * Centraliza as decisões de "ligar ou não" efeitos visuais.
 */

/** @returns {boolean} true se o usuário pediu menos movimento. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Heurística conservadora de desempenho.
 * Em aparelhos com pouca memória, poucos núcleos ou conexão econômica,
 * efeitos decorativos são reduzidos ou desligados.
 * @returns {boolean}
 */
export function isLowPowerDevice() {
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const connection = navigator.connection;

  if (typeof memory === 'number' && memory <= 4) return true;
  if (typeof cores === 'number' && cores <= 4) return true;
  if (connection?.saveData) return true;
  if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return true;

  return false;
}
