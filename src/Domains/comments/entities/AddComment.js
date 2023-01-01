class AddComment {
  constructor(payload) {
    this._verifyPayload(payload)

    const { content, thread, owner } = payload

    this.content = content
    this.thread = thread
    this.owner = owner
  }

  _verifyPayload(payload) {
    if (!payload.content || !payload.thread || !payload.owner) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof payload.content !== 'string' || typeof payload.thread !== 'string' || typeof payload.owner !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddComment
