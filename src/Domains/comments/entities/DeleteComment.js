class DeleteComment {
  constructor(payload) {
    this._verifyPayload(payload)
    const { id, owner, thread } = payload

    this.id = id
    this.owner = owner
    this.thread = thread
  }

  _verifyPayload(payload) {
    if (!payload.id || !payload.owner || !payload.thread) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof payload.id !== 'string' || typeof payload.owner !== 'string' || typeof payload.thread !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = DeleteComment
