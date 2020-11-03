const CACHE_NAME = 'actual-football';
var urlsToCache = [
    "/",
    "/assets/logo_size_152x152.jpg",
    "/assets/logo_size_invert_152x152.jpg",
    "/assets/logo_size_192x192.jpg",
    "/assets/logo_size_invert_192x192.jpg",
    "/assets/logo_size_480x80.jpg",
    "/assets/logo_size_invert_480x80.jpg",
    "/assets/logo_192x192_invert.png",
    "/assets/logo_invert_210x80.png",
    "/assets/logo_invert_480x80.png",
    "/assets/material_icons/codepoints",
    "/assets/material_icons/material-icons.css",
    "/assets/material_icons/MaterialIcons-Regular.eot",
    "/assets/material_icons/MaterialIcons-Regular.ijmap",
    "/assets/material_icons/MaterialIcons-Regular.ttf",
    "/assets/material_icons/MaterialIcons-Regular.woff",
    "/assets/material_icons/MaterialIcons-Regular.woff2",
    "/sw-register.js",
    "/manifest.json",
    "/nav.html",
    "/sidenav.html",
    "/index.html",
    "/detailteam.html",
    "/pages/home.html",
    "/pages/saved.html",
    "/pages/teams.html",
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/css/home.css",
    "/css/teams.css",
    "/css/detail.css",
    "/js/materialize.min.js",
    "/js/materialize.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/push.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
});
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'assets/logo_invert_210x80.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});