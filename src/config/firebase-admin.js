const admin = require("firebase-admin");

const serviceAccount = require("../../firebase.json");

const firebaseInit = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
module.exports = {
    admin: firebaseInit,
    firebaseTopics: {
        BEACON_DATA_UPDATE: 'beacon_data_update',
        FCM_TOKEN_REFRESH: 'fcm_token_refresh'
    }
}