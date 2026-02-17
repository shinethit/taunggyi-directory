// SERVICE WORKER KILL SWITCH - VERSION 32
// ဒီကောင်က အရင် Cache တွေကို အကုန်ဖျက်ပြီး သူ့ကိုယ်သူ အနားယူပါလိမ့်မယ်
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.registration.unregister();
});
