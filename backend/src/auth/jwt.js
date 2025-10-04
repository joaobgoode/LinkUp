const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const EXPIRATION_TIME = '300s'
const REFRESH_EXPIRATION_TIME = `${60 * 60 * 24 * 7}s`

function generate(payload) {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION_TIME });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION_TIME });
  return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
  generate,
  verifyAccessToken,
  verifyRefreshToken
}
