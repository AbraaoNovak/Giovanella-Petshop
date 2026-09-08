/**
 * Ponto de entrada do site.
 *
 * O bundle é pequeno e carregado com `type="module"` (defer implícito), então
 * não bloqueia a renderização. Cada módulo é independente e sai silenciosamente
 * caso o elemento correspondente não exista na página — o mesmo bundle serve
 * tanto a home quanto a página de privacidade.
 */

import '../css/main.css';

import { initConfigBindings } from './modules/config-bind.js';
import { initWhatsAppLinks, initPhoneLinks } from './modules/whatsapp.js';
import { initHeader } from './modules/header.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initReveal } from './modules/reveal.js';
import { initPaws } from './modules/paws.js';
import { initContactForm } from './modules/form.js';
import { initMap } from './modules/map.js';
import { initConsent } from './modules/consent.js';
import { initAnalyticsTracking } from './modules/analytics.js';

/**
 * Marca que o JavaScript está ativo. Os estados iniciais das animações
 * dependem desta classe, garantindo que o conteúdo permaneça visível caso
 * o script falhe ao carregar.
 */
document.documentElement.classList.add('js');

function boot() {
  // --- Conteúdo e links (críticos, sempre primeiro) ---
  // Ano do rodapé: evita que o copyright envelheça sozinho.
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });

  initConfigBindings();
  initWhatsAppLinks();
  initPhoneLinks();

  // --- Navegação ---
  initHeader();
  initMobileMenu();

  // --- Interações de conteúdo ---
  initContactForm();
  initMap();

  // --- Privacidade e medição ---
  initConsent();
  initAnalyticsTracking();

  // --- Efeitos visuais (não essenciais) ---
  initReveal();

  // As patinhas são puramente decorativas: entram por último, quando o
  // navegador estiver ocioso, para não competir com o LCP.
  const startPaws = () => initPaws();
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startPaws, { timeout: 2000 });
  } else {
    window.setTimeout(startPaws, 700);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
