importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);
workbox.precaching.precacheAndRoute([
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
    "/assets/logo_512x512_invert.png",
    "/assets/material_icons/codepoints",
    "/assets/material_icons/material-icons.css",
    "/assets/material_icons/MaterialIcons-Regular.eot",
    "/assets/material_icons/MaterialIcons-Regular.ijmap",
    "/assets/material_icons/MaterialIcons-Regular.ttf",
    "/assets/material_icons/MaterialIcons-Regular.woff",
    "/assets/material_icons/MaterialIcons-Regular.woff2",
    "/sw-register.js",
    "/push.js",
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
], {
    ignoreUrlParametersMatching: [/.*/],
});

// workbox.routing.registerRoute(
//     new RegExp("/assets/"),
//     /\.(?:png|gif|jpg|jpeg|svg)$/,
//     workbox.strategies.cacheFirst({
//         cacheName: 'images',
//         plugins: [
//             new workbox.expiration.Plugin({
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60,
//             }),
//         ],
//     }),
// );
workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages",
    })
);
workbox.routing.registerRoute(
    new RegExp('/css/'),
    workbox.strategies.cacheFirst({
        cacheName: 'styles'
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "soccer-api",
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 30,
            }),
        ],
    })
);

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