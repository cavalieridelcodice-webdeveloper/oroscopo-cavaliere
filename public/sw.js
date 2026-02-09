const CACHE_NAME = 'oroscopo-cavaliere-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  // Aggiungi qui i percorsi delle tue immagini principali
  '/hero-costelazioni.jpg'
];

// Installazione: salviamo i file statici nella cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: intercettiamo le richieste
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se il file è in cache, lo restituiamo, altrimenti andiamo in rete
      return response || fetch(event.request);
    })
  );
});