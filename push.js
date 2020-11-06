var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHgZ3qyiNTvPQsHOwfBPzI3TgapQ1AU3YKJJjH0xjtrDuZxqzcHV4vrDV79HGj47tUY-ooc2qmZbG-FDtq8CJvU",
    "privateKey": "8_eZBbLbggeEmSPBmoLuVGModY7yBBoWJtBF-5mSUK0"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e8fAl1Zb2Fg:APA91bEGIiHboSCtmLztB9e7A23IZeaWMYvpFXNDSfMLzJ46DJkhjn6kIuRw1P06g4ewB8_Bgxc4V7DejnR76EofaGbhCLpGtGjRY0MYCvhY-3rOPUHGZoILTGT6i164JNjd1uiJ8ZI8",
    "keys": {
        "p256dh": "BC65K4LtX8NZnNmTFEIvehLPHLOs0kRmQxjBQ5xcVTJDbl954fSY7wkU6TgSRxzyNurswxXS5OFh2ggqaGZASCo=",
        "auth": "ljngrU+K4Ir8PxQGQn/hzw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '456270329632',
    TTL: 60
};
try {
    webPush.sendNotification(
        pushSubscription,
        payload,
        options
    )
} catch (e) {
    console.log(e)
}