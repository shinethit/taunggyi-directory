// SERVICE WORKER SELF-DESTRUCT MODE (Version 34)
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // 1. Delete ALL Caches
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  // 2. Unregister Self (Stop running forever)
  self.registration.unregister()
    .then(() => console.log('Service Worker: Unregistered'))
    .catch(err => console.log('Service Worker Error:', err));
});
