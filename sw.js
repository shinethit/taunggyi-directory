const CACHE_NAME = 'cherry-v26';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './CDST_Logo.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 🚨 CRITICAL FIX: Firebase & Google API တွေကို Service Worker က လုံးဝ မထိပါစေနဲ့
  if (url.includes('firebaseio.com') || url.includes('googleapis.com')) {
    return; // Network only (Let it pass through)
  }

  // ကျန်တာတွေကို Offline အတွက် သိမ်းမယ်
  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      // Cache ထဲမှာရှိရင် ယူသုံး၊ မရှိရင် Network ကဆွဲပြီး Cache ထဲထည့်
      return cachedRes || fetch(event.request).then((networkRes) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkRes.clone());
          return networkRes;
        });
      });
    })
  );
});
