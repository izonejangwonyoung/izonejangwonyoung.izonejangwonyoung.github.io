const CACHE_NAME = 'drum-metronome-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/vite.svg',
  '/manifest.json',
  '/src/main.jsx',
  // 필요시 추가 파일 경로
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
}); 