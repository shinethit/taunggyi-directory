const CACHE_NAME = 'cherry-v18';
const ASSETS = [
  './',
  './index.html',
  './CDST_Logo.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});

// Cache First Strategy (အင်တာနက်ထက် ဖုန်းထဲကဟာကို ဦးစားပေးဖတ်မယ်)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request).then((networkRes) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkRes.clone());
          return networkRes;
        });
      });
    })
  );
});
