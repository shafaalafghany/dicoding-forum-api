class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload) 

    const { id, username, fullname } = payload

    this.id = id
    this.username = username
    this.fullname = fullname
  }

  _verifyPayload(payload) {
    if (!payload.id || !payload.username || !payload.fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof payload.id !== 'string' || typeof payload.username !== 'string' || typeof payload.fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = RegisteredUser
