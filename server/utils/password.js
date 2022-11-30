const crypto = require('crypto')

function encryptPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt: salt,
    hash: hashedPassword
  }
}

function validatePassword(password, hash, salt) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === verifyHash
}

module.exports = {
  validatePassword,
  encryptPassword
}