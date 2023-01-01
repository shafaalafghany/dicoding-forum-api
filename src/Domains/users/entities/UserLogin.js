class UserLogin {
  constructor(payload) {
    this._verifyPayload(payload)

    this.username = payload.username
    this.password = payload.password
  }

  _verifyPayload(payload) {

    if (!payload.username || !payload.password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof payload.username !== 'string' || typeof payload.password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = UserLogin
