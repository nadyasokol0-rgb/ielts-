/* Offline mode: app files are cached; updates come from the network when available. */
const CACHE = 'ielts-trainer-v2';
const CORE = ['./', './index.html', './app.js', './content.js', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './fonts/bricolage.woff2', './fonts/instrument-serif.woff2', './fonts/instrument-serif-italic.woff2', './fonts/onest-latin.woff2', './fonts/onest-cyrillic.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function fromCache(req) {
  return caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined));
}
/* Network first (to pick up updates); fall back to cache if the network is slow or offline. */
function networkFirst(req) {
  return new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => fromCache(req).then(finish), 3500);
    fetch(req).then(res => {
      clearTimeout(timer);
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      finish(res);
    }).catch(() => {
      clearTimeout(timer);
      fromCache(req).then(r => { if (!done) { done = true; resolve(r || Response.error()); } });
    });
  });
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) { e.respondWith(networkFirst(req)); return; }
});
