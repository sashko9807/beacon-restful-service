const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Sign a json web token
 * @param  userID ID of the user
 * @param  email Email of the user
 * @returns  Object containing `accessToken` and  `refreshToken`
 */

function JWTSignToken(userID, email) {
    const accessToken = jwt.sign(
        { userId: userID, email: email },
        process.env.ACCESS_TOKEN,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
        { userId: userID, email: email },
        process.env.REFRESH_TOKEN,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );

    return [accessToken, refreshToken]
}

/**
 * Verify whether the sent refresh token is valid/expired
 * @param  refreshToken token sent by the user.
 * @returns A new `accessToken` if refresh token is valid. `err` if refresh token is invalid/expired.
 */
function JWTVerifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) return { err };
        const [accessToken] = JWTSignToken(decoded.userId, decoded.email)
        return { accessToken: accessToken }
    });
}

/**
 * Verify whether the sent access token is valid/expired
 * @param accessToken token sent by the user
 * @returns Decoded `userId` and `email` if valid. `err` if invalid/expired 
 * 
 */

function JWTVerifyAccessToken(accessToken) {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) return { err };
        return { userId: decoded.userId, email: decoded.email }
    })
}

module.exports = {
    JWTSignToken,
    JWTVerifyRefreshToken,
    JWTVerifyAccessToken
}
