const jwt = require('./jwt');

function setCookie(res, payload) {
  const { refreshToken, accessToken } = jwt.generate(payload);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 5 * 60 * 1000
  })
  return refreshToken
}

module.exports = { setCookie };
