var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BC8xl0kalpIpnEg45Ui0enLLhCbauxQ8eOp23wilsE9sJ_-VjH2e7nFMPqXr0q8XD_Ptom0HKbju73gGqkH55Hk",
    "privateKey": "bGJXJfwKd5hLDVhAmcN5Bmgk4PjjmTdckARKuTHk8qE"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cSVY5Wbb2Gw:APA91bFfn_Ux8CK77xZd0hu8MMp73j214WohEJ2-ww6PDXwMcsu49DxR-bRJxYlXSJCt3Xis7RmKa0Sufc_l3SBoRJxqPutpkTWlfNTlnZnhvj520ul5Jn_nWRHRx2cNFdZFpWFz7vAv",
    "keys": {
        "p256dh": "BGDnGFXN5dEMEyWs1WsSt9mOZst8mIeqXWS0+PRc6QdeInC01c9W2k2IA0BieWggfmNd6p86hlvDuujR6QxmdwA=",
        "auth": "p3QNOQ9KHeCJO37NmUpnpg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '456270329632',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);