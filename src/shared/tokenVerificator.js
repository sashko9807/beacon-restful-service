const { JWTVerifyAccessToken } = require('../utils/JWTSignToken')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const accessToken = authHeader.substring(7);
  console.log(accessToken)
  const jwt = JWTVerifyAccessToken(accessToken);
  console.log(jwt.err)
  if (jwt.err) return res.sendStatus(403);
  req.userId = jwt.userId;
  req.email = jwt.email;
  next();

};
