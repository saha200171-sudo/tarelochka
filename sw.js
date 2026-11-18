// Service worker: приложение открывается и работает без интернета.
// При выпуске новой версии меняем CACHE — телефон скачает свежие файлы.
const CACHE = 'tarelochka-v6';
const CORE = ['./', './index.html', './styles.css', './app.js', './icons.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Свои файлы: сначала сеть (чтобы обновления приходили), без сети — сохранённая копия
  // (если сеть медленная — через 3 с отдаём копию, чтобы приложение не «висело»)
  if (url.origin === location.origin) {
    const fromCache = () => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'));
    const net = fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    });
    e.respondWith(new Promise(resolve => {
      const t = setTimeout(() => fromCache().then(r => r && resolve(r)), 3000);
      net.then(r => { clearTimeout(t); resolve(r); })
         .catch(() => { clearTimeout(t); fromCache().then(r => resolve(r || Response.error())); });
    }));
    return;
  }
  // Шрифт Nunito: сохраняем один раз и дальше берём из памяти
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
  }
});
