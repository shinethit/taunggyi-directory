// SERVICE WORKER KILL SWITCH
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // ရှိသမျှ Cache တွေကို အကုန်ဖျက်မယ်
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  // Service Worker ကိုယ်တိုင် Unregister လုပ်မယ်
  self.registration.unregister();
});
