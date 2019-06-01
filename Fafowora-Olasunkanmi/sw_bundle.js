const cacheName = 'v1';

const cacheAssests = [
  'index.html',
  'news_css.css',
  'news.js',
  'Nigerian_politics.html',
  'Tech.html',
  'Sports.html'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installed.');

  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files...');
        cache.addAll(cacheAssests);
      })
      .then(() => self.skipWaiting())
  )
});

// Call Activated event
self.addEventListener('activate', event => {
  console.log('Service Worker Activated.');

  //Remove unwanted caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  ) 
});

//Call Fetch Event
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request)
        .catch(() => caches.match(event.request))
    )
})