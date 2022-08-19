const Tokens = require('./tokenModel');

const refreshFcmDeviceToken = async (fcmToken) => {
    try {
        const token = await Tokens.findOneAndUpdate({ token: fcmToken }, { added_at: new Date() }, { upsert: true });
        return token
    } catch (err) {
        return null
    }
}


const deleteFcmDeviceToken = async (fcmToken) => {
    const token = await Tokens.deleteOne({ token: fcmToken });
    return token
}

module.exports = {
    refreshFcmDeviceToken,
    deleteFcmDeviceToken
}