const CACHE_NAME = 'cherry-v27-rest';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './CDST_Logo.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install & Cache Assets
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// Clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
  )));
  return self.clients.claim();
});

// Network First Strategy (အင်တာနက်ရှိရင် အသစ်ယူ၊ မရှိမှ Cache ယူ)
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Firebase Database ကို Cache လုံးဝ မမှတ်စေရ (Direct Pass)
  if (url.includes('firebaseio.com')) {
    return; 
  }

  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
