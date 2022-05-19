self.addEventListener('install', function (event) {
    console.log('SW installed', event);
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log('SW Activate', event);
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function (event) {
    console.log('Fetch', event)
});
