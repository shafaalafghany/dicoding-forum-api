class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload)

    this.accessToken = payload.accessToken
    this.refreshToken = payload.refreshToken
  }

  _verifyPayload(payload) {

    if (!payload.accessToken || !payload.refreshToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof payload.accessToken !== 'string' || typeof payload.refreshToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = NewAuth
