const CACHE_NAME = 'version1'
self.addEventListener('install', (event) => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll([
                '/pwa-todo/',
                '/pwa-todo/index.html',
                '/pwa-todo/css/style.css',
                '/pwa-todo/js/main.js',
                '/pwa-todo/manifest.json',
                '/pwa-todo/icons/favicon-196.png',
            ])
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());

    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.filter(cacheName => cacheName != CACHE_NAME).map(item => caches.delete(item)))
    }))
});

self.addEventListener('fetch', (event) => {
    // CACHE WITH NETWORK FALLBACK
    // event.respondWith(
    //     caches.match(event.request).then((response) {
    //         return response || fetch(event.request)
    //     })
    // );


    // STALE WHILE REVALIDATE
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchedResponse = fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse)
                    return networkResponse
                })
                return cachedResponse || fetchedResponse
            })
        })
    )
});
