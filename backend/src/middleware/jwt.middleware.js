const jwt = require('../auth/jwt.js');

async function jwtMiddleware(req, res, next) {
  const token = req.cookies?.accessToken;

  if (!token) {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    return res.status(401).json({ message: 'Token ausente.' });
  }

  try {
    const decoded = jwt.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

module.exports = { jwtMiddleware };


