self.addEventListener('install', function (event) {

    self.skipWaiting();

    // event.waitUntil(
    //     caches.open('static').then(function (cache) {
    //         cache.addAll([
    //             '/pwa-todo/',
    //             '/pwa-todo/index.html',
    //             '/pwa-todo/js/main.js',
    //             '/pwa-todo/manifest.json',
    //             '/pwa-todo/icons/favicon-196.png',
    //         ])
    //     })
    // );
});

self.addEventListener('activate', function (event) {
    console.log('SW Activate', event);
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function (event) {
    // event.respondWith(
    //     caches.match(event.request).then(function (response) {
    //         if (response) {
    //             return response
    //         }

    //         return fetch(event.request)
    //     })
    // );
});
