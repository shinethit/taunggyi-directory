const CACHE_NAME = 'cherry-directory-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './CDST_Logo.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ဖုန်းထဲမှာ App ဒီဇိုင်းကို သိမ်းဆည်းခြင်း
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Cache အဟောင်းများကို ရှင်းလင်းခြင်း
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// အင်တာနက်မရှိချိန်တွင် Cache ထဲမှ ထုတ်ပေးခြင်း
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
