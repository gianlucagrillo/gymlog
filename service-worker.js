const CACHE_NAME = 'gymlog-cache-v33';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png',
  './img/run-road.jpg', './img/hike-sunset.jpg', './img/rain-night.jpg', './img/boxer-backlit.jpg', './img/boxer-blue.jpg',
  './img/shadowbox-sunset.jpg', './img/battle-ropes.jpg', './img/cyclist-climb.jpg', './img/surf-barrel.jpg', './img/high-kick.jpg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Documents come from the network when possible: otherwise, after a deploy you'd
// stay on the old version until a second reload.
// Everything else: cache-first with a background refresh.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // only the app's own files: GitHub sync calls must always reach the network
  if (new URL(req.url).origin !== self.location.origin) return;

  const isDoc = req.mode === 'navigate' || (req.destination === 'document');

  if (isDoc) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
