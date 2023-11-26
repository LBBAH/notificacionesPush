const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey": "BHRjCWdlrvy3AKfpOReUXmoY63yXwLa9gfY57cwCS9to-IGYAuuxU8pIsTo6iqcAeHYC5zc7OSFiW2uvauNJNkk",
    "privateKey": "qJr2iJLfLdZhlx44epjJX5FXSWin-iZruR_SJ7ZJ3Xo"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {
    

    const { endpoint, keys: { auth, p256dh } } = req.body;


    const pushSubscription = {
        endpoint: endpoint,
        keys: {
            auth: auth,
            p256dh: p256dh
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