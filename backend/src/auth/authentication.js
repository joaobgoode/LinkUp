const bcrypt = require('bcrypt');

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

module.exports = {
  verifyPassword,
  hashPassword
}

