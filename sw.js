const CACHE_NAME = 'cherry-v29-pro';
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
  
  // 🚨 CRITICAL: Firebase နဲ့ Country API ကို Cache မလုပ်ဘဲ လွှတ်ပေးမယ်
  if (url.includes('firebase') || url.includes('ipapi') || url.includes('google')) {
    return; 
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
