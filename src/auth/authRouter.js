const express = require('express');
const router = express.Router();

require('dotenv').config();

const { JWTVerifyRefreshToken } = require('../utils/JWTSignToken')

router.post('/auth/refreshToken', async (req, res) => {
  const { refreshToken } = req.body;
  const jwt = JWTVerifyRefreshToken(refreshToken);
  if (jwt.err) return res.sendStatus(403)
  res.json({ accessToken: jwt.accessToken })
});

module.exports = router;
