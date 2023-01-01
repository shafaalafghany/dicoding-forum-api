/* eslint-disable camelcase */
class DetailThread {
  constructor(payload) {
    this._verifyPayload(payload)

    const {
      id,
      title,
      body,
      created_at,
      username,
    } = payload

    this.id = id
    this.title = title
    this.body = body
    this.date = created_at
    this.username = username
  }

  _verifyPayload(payload) {
    if (!payload.id || !payload.title || !payload.body || !payload.created_at || !payload.username) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (
      typeof payload.id !== 'string' ||
      typeof payload.title !== 'string' ||
      typeof payload.body !== 'string' ||
      typeof payload.created_at !== 'string' ||
      typeof payload.username !== 'string'
    ) {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = DetailThread
