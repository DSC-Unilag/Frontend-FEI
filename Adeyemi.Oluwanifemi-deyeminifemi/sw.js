self.addEventListener('activate', () => {
    return self.clients.claim();
})

self.addEventListener('fetch',(event) => {
    event.respondWith(fetch(event.request));
})

