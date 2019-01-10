const CURRENT_STATIC_CACHE = 'static-v7';
const CURRENT_DYNAMIC_CACHE = 'dynamic-v1'
self.addEventListener('install',(e) => {
    e.waitUntil(
        caches.open(CURRENT_STATIC_CACHE)
        .then((cache) => {
            console.log('[Service-Worker] Precaching App Shell')
            cache.addAll([
                '/Adeyemi.Oluwanifemi-deyeminifemi/',
                '/Adeyemi.Oluwanifemi-deyeminifemi/index.html',
                '/Adeyemi.Oluwanifemi-deyeminifemi/offline.html',
                'css/index.css',      
                'images/svg/search.svg',
                'images/svg/navsmall.svg',
                'js/functions.js',
                'js/index.js',
                'manifest.json',
                '/Adeyemi.Oluwanifemi-deyeminifemi/images/default.jpg',
                'images/svg/bookmark.svg',
                '/Adeyemi.Oluwanifemi-deyeminifemi/favicon.ico'
            ])
        })
    )
})

self.addEventListener('activate', (event) => {
    console.log("[Service Worker] Activating Service Worker")
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(key != CURRENT_STATIC_CACHE && key != CURRENT_DYNAMIC_CACHE){
                    console.log('[Service Worker] Removing old cache',key)
                    return caches.delete(key)
                }
            }));
        })
    )
    return self.clients.claim();        
})



self.addEventListener('fetch',(event) => {
    if(event.request.url.includes('newsapi')){
        event.respondWith(
            caches.open(CURRENT_DYNAMIC_CACHE)
            .then((cache) => {
                return fetch(event.request)
                .then((response) => {
                    cache.put(event.request, response.clone());
                    // console.log(CURRENT_DYNAMIC_CACHE)
                    return response;
                })
            })
        )
    }else{
        event.respondWith(
            caches.match(event.request)
            .then((res) => {
                if(res){
                    return res;
                }else{
                    return fetch(event.request)
                    .then((res) => {
                        return caches.open(CURRENT_DYNAMIC_CACHE)
                        .then((cache) => {
                            cache.put(event.request.url,res.clone());                                
                            return res;
                        })
                    })
                    .catch((err) => {
                        return caches.open(CURRENT_STATIC_CACHE)
                        .then((cache) => {
                            console.log(event.request.url.includes('category'));
                            if(event.request.url.includes('category') || event.request.url.includes('bookmark')){
                                return cache.match('/Adeyemi.Oluwanifemi-deyeminifemi/offline.html')
                            }                            
                            else if(event.request.headers.get('accept').includes('image')){
                                return cache.match('/Adeyemi.Oluwanifemi-deyeminifemi/images/default.jpg')
                            }
                        })
                    })
                }
            })
        )
    }
})

