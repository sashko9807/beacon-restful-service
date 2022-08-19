const { admin } = require('../config/firebase-admin')

/**
* Sends push notification via FCM
*
* @param payload - Payload data to be send along the push notification
* @param topic - FCM subscription topic
*/

module.exports = (payload, topic) => {
    const notification = {
        data: payload
    }

    const options = {
        priority: 'high'
    }
    admin.messaging()
        .sendToTopic(topic, notification, options)
        .then(result => console.log(result))
        .catch(err => console.log(err))
}