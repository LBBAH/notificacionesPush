const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey": "BKyDwJvKUhpT4q6iqgYoumPeJpAz5yrF_PmV5CV1k_uoIaNJrg8L964aC9MM8Opd_M1j4qNg5MXr2L41aDWRJbI",
    "privateKey": "bFCVy1Ey9uODZkDf52I5RzCEsPhiP7lsisigriBXCCQ"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/cvnWI1iv1n4:APA91bEXvhI0HVrovVh82lI4HhcRKGT6dh28Bs3PpUAthvy68tz54PxZaVNj18cIOk8rK6EuAxZ3DCBdHiFM-v3y6cyD_s--JON13JP8zpaBMJE1fZUmijtzwUIst3QWxkpWgeX4VnGE',
        keys: {
            auth: 'H1UaF1zNA1jPlVJw6nLAGQ',
            p256dh: 'BJIAsd0i40iAtHUinrAzNeR8UGb5HG8oEHCkcyPOda67i9UVIUhtWpD0ULEnITYX9pT8TlMTT6-ZdZFMO0-r7QE'
        }
    };

    const payload = {
        "notification": {
            "title": "¿Ya te registraste?",
            "body": "Subscribete para ver todos los contenidos del sitio te esperamos!!!",
            "vibrate": [100, 50, 100],
            "image": "https://educacionespecialmx.site/idd_Educatio_back/public_html/img/Arte%20y%20Dise%C3%B1o.png",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio subscribete!!' })

}

app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});