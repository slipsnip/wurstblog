const crypto = require('crypto')

function getSalt (length) {
  // Half the length because we convert to hex string
  return crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
    if (err) throw err
    return buf.toString('hex').slice(0, length)
  })
}

function blake2b512 (password, salt) {
  const hmac = crypto.Hmac('blake2b512', salt)
  const hashed = hmac.update(password).digest('hex')
  return {
    salt,
    hash: hashed
  }
}

exports.hashPassword = (password) => {
  const salt = getSalt(512)
  return blake2b512(password, salt)
}
