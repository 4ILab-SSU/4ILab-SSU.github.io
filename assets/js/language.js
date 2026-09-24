(() => {
  'use strict';
  const data = document.getElementById('site-language-data');
  if (!data) return;
  const { messages } = JSON.parse(data.textContent);
  window.labTranslate = text => messages[text.replace(/\s+/g, ' ').trim()] || text;
  document.querySelectorAll('[data-language-switch]').forEach(link => {
    // Real URLs work without JS; preserve the current section and query when available.
    link.addEventListener('click', () => { link.href = new URL(link.getAttribute('href'), location.origin).pathname + location.search + location.hash; });
  });
})();
