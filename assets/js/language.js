(() => {
  'use strict';
  const data = document.getElementById('site-language-data');
  if (!data) return;
  const { lang, messages, routes } = JSON.parse(data.textContent);
  window.labTranslate = text => messages[text.replace(/\s+/g, ' ').trim()] || text;
  document.querySelectorAll('[data-language-switch]').forEach(link => {
    // Real URLs work without JS; preserve the current section and query when available.
    link.addEventListener('click', () => { link.href = new URL(link.getAttribute('href'), location.origin).pathname + location.search + location.hash; });
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.dataset.languageSwitch || lang !== 'ko') return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && routes.includes(url.pathname)) {
      url.pathname = '/ko' + url.pathname;
      link.href = url.href;
    }
  }, true);
})();
