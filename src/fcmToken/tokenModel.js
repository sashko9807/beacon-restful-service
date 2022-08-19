const mongoose = require('mongoose');

const fcmTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    added_at: { type: String, required: true },
});

const fcmTokenModel = new mongoose.model('fcmTokens', fcmTokenSchema);
module.exports = fcmTokenModel;