const CACHE_NAME = 'kavyalok-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/style.css',
  '/script.js',
  '/swipe.js',
  '/share.js',
  '/share.html',
  '/Admin/index.html',
  '/Admin/script.js',
  '/Admin/style.css',

  '/auth/index.html',
  '/auth/script.js',
  '/auth/style.css',

  '/Settings/index.html',
  '/Settings/script.js',
  '/Settings/style.css',
];

// Install service worker and cache essential files
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching all files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Intercept requests and serve cached version if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
