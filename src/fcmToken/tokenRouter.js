const express = require('express');

const router = express.Router();

const fcmTokens = require('./tokenService')

const fcm = require('../utils/fcmTopicSubscribtion')


router.post('/fcmToken', async (req, res) => {
    const { token } = req.body;
    const tokenQuery = fcmTokens.refreshFcmDeviceToken(token)
    if (!tokenQuery) {
        res.sendStatus(400);
        return;
    }

    fcm.topicSubscribe(token)
    res.sendStatus(200)

})


module.exports = router