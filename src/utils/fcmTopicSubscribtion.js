const { admin, firebaseTopics } = require('../config/firebase-admin')

/**
 * Subscribe token to topics vital to the functioning of the app
 * @param token - FCM generated token 
 */
const topicSubscribe = (token) => {
    admin.messaging().subscribeToTopic(token, firebaseTopics.BEACON_DATA_UPDATE)
    admin.messaging().subscribeToTopic(token, firebaseTopics.FCM_TOKEN_REFRESH)
}


/**
 * Unsubscribe token from topics vital to the functioning of the app
 * @param token - FCM generated token 
 */
const topicUnsubscribe = (token) => {
    admin.messaging().unsubscribeFromTopic(token, firebaseTopics.BEACON_DATA_UPDATE)
    admin.messaging().unsubscribeFromTopic(token, firebaseTopics.FCM_TOKEN_REFRESH)
}

module.exports = {
    topicSubscribe,
    topicUnsubscribe
}