// Service worker: РїСЂРёР»РѕР¶РµРЅРёРµ РѕС‚РєСЂС‹РІР°РµС‚СЃСЏ Рё СЂР°Р±РѕС‚Р°РµС‚ Р±РµР· РёРЅС‚РµСЂРЅРµС‚Р°.
// РџСЂРё РІС‹РїСѓСЃРєРµ РЅРѕРІРѕР№ РІРµСЂСЃРёРё РјРµРЅСЏРµРј CACHE вЂ” С‚РµР»РµС„РѕРЅ СЃРєР°С‡Р°РµС‚ СЃРІРµР¶РёРµ С„Р°Р№Р»С‹.
const CACHE = 'tarelochka-v3';
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
  // РЎРІРѕРё С„Р°Р№Р»С‹: СЃРЅР°С‡Р°Р»Р° СЃРµС‚СЊ (С‡С‚РѕР±С‹ РѕР±РЅРѕРІР»РµРЅРёСЏ РїСЂРёС…РѕРґРёР»Рё), Р±РµР· СЃРµС‚Рё вЂ” СЃРѕС…СЂР°РЅС‘РЅРЅР°СЏ РєРѕРїРёСЏ
  // (РµСЃР»Рё СЃРµС‚СЊ РјРµРґР»РµРЅРЅР°СЏ вЂ” С‡РµСЂРµР· 3 СЃ РѕС‚РґР°С‘Рј РєРѕРїРёСЋ, С‡С‚РѕР±С‹ РїСЂРёР»РѕР¶РµРЅРёРµ РЅРµ В«РІРёСЃРµР»РѕВ»)
  if (url.origin === location.origin) {
    const fromCache = () => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'));
    const net = fetch(req).then(res => {
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
  // РЁСЂРёС„С‚ Nunito: СЃРѕС…СЂР°РЅСЏРµРј РѕРґРёРЅ СЂР°Р· Рё РґР°Р»СЊС€Рµ Р±РµСЂС‘Рј РёР· РїР°РјСЏС‚Рё
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
  }
});
