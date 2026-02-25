const SHELL_CACHE = 'ns-kids-shell-v2';
const DATA_CACHE = 'ns-kids-data-v1';
const SHELL_ASSETS = ['/', '/index.html'];

// API URL patterns — cache separately for offline fallback
const API_PATTERNS = [
  'app.ticketmaster.com',
  'raw.githubusercontent.com',
  '.github.io',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== SHELL_CACHE && k !== DATA_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const isAPI = API_PATTERNS.some(p => e.request.url.includes(p));

  if (isAPI) {
    // Network-first for API calls — freshest data, cache for offline
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const clone = r.clone();
          caches.open(DATA_CACHE).then(c => c.put(e.request, clone));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Stale-while-revalidate for app shell — instant load, background update
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request)
          .then(r => {
            const clone = r.clone();
            caches.open(SHELL_CACHE).then(c => c.put(e.request, clone));
            return r;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});
