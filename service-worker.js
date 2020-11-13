importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);
workbox.precaching.precacheAndRoute([
    { url: "/", revision: 1 },
    { url: "/assets/logo_size_152x152.jpg", revision: 1 },
    { url: "/assets/logo_size_invert_152x152.jpg", revision: 1 },
    { url: "/assets/logo_size_192x192.jpg", revision: 1 },
    { url: "/assets/logo_size_invert_192x192.jpg", revision: 1 },
    { url: "/assets/logo_size_480x80.jpg", revision: 1 },
    { url: "/assets/logo_size_invert_480x80.png", revision: 1 },
    { url: "/assets/logo_192x192_invert.png", revision: 1 },
    { url: "/assets/logo_invert_210x80.png", revision: 1 },
    { url: "/assets/logo_invert_480x80.png", revision: 1 },
    { url: "/assets/logo_512x512_invert.png", revision: 1 },
    { url: "/assets/material_icons/codepoints", revision: 1 },
    { url: "/assets/material_icons/material-icons.css", revision: 1 },
    { url: "/assets/material_icons/MaterialIcons-Regular.eot", revision: 1 },
    { url: "/assets/material_icons/MaterialIcons-Regular.ijmap", revision: 1 },
    { url: "/assets/material_icons/MaterialIcons-Regular.ttf", revision: 1 },
    { url: "/assets/material_icons/MaterialIcons-Regular.woff", revision: 1 },
    { url: "/assets/material_icons/MaterialIcons-Regular.woff2", revision: 1 },
    { url: "/sw-register.js", revision: 1 },
    { url: "/push.js", revision: 1 },
    { url: "/manifest.json", revision: 1 },
    { url: "/nav.html", revision: 1 },
    { url: "/sidenav.html", revision: 1 },
    { url: "/index.html", revision: 1 },
    { url: "/detailteam.html", revision: 1 },
    { url: "/pages/home.html", revision: 1 },
    { url: "/pages/saved.html", revision: 1 },
    { url: "/pages/teams.html", revision: 1 },
    { url: "/css/materialize.css", revision: 1 },
    { url: "/css/materialize.min.css", revision: 1 },
    { url: "/css/home.css", revision: 1 },
    { url: "/css/teams.css", revision: 1 },
    { url: "/css/detail.css", revision: 1 },
    { url: "/js/materialize.min.js", revision: 1 },
    { url: "/js/materialize.js", revision: 1 },
    { url: "/js/nav.js", revision: 1 },
    { url: "/js/api.js", revision: 1 },
    { url: "/js/db.js", revision: 1 },
    { url: "/js/idb.js", revision: 1 },
], {
    ignoreUrlParametersMatching: [/.*/],
});

workbox.routing.registerRoute(
    new RegExp('^/assets/'),
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    }),
);
workbox.routing.registerRoute(
    new RegExp('^/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages",
    })
);
workbox.routing.registerRoute(
    new RegExp('^/css/'),
    workbox.strategies.cacheFirst({
        cacheName: 'styles'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "soccer-api",

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