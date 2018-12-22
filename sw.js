self.addEventListener('install',(e) => {
    e.waitUntil(
        caches.open('default')
        .then((cache) => {
            console.log('[Service-Worker] Precaching App Shell')
            cache.addAll([
                '/Adeyemi.Oluwanifemi-deyeminifemi/',
                'index.html',
                'images/favicon.ico',
                'css/index.css',
                'images/svg/search.svg',
                'images/svg/navsmall.svg',
                'js/functions.js',
                'js/index.js',
                'manifest.json'
            ])
        })
    )
})

self.addEventListener('activate', () => {
    return self.clients.claim();
})

self.addEventListener('fetch',(event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response) {
                return response;
            }else{
                return fetch(event.response)
                    .then((data) => {
                        return caches.open('dynamic')
                            .then((cache) => {
                                cache.put(event.request.url,data.clone());
                                return data;
                            })
                    })
            }
        }                                   
    )
    );
})

