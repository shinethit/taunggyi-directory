// SERVICE WORKER KILLER (VERSION 33)
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Cache အားလုံးကို ဖျက်မည်
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  // Service Worker ကို ဖြုတ်မည်
  self.registration.unregister();
});
