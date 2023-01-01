const AuthenticationError = require('../../Commons/exceptions/AuthenticationError')
const PasswordHash = require('../../Applications/security/PasswordHash')

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super()
    this._bcrypt = bcrypt
    this._saltRound = saltRound
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound)
  }

  async comparePassword(password, encryptedPassword) {
    const result = await this._bcrypt.compare(password, encryptedPassword)

    if (!result) throw new AuthenticationError('email atau password anda salah')
  }
}

module.exports = BcryptPasswordHash
