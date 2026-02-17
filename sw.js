const CACHE_NAME = 'cherry-v24';
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
  // Network First Strategy (For HTML) - အင်တာနက်ရှိရင် အသစ်ယူ၊ မရှိမှ ဖုန်းထဲကယူ
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
  } else {
    // Cache First Strategy (For Images/CSS) - မြန်အောင် ဖုန်းထဲကယူ
    event.respondWith(
      caches.match(event.request).then(res => res || fetch(event.request))
    );
  }
});
