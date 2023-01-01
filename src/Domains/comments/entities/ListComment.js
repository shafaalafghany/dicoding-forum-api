/* eslint-disable camelcase */
class ListComment {
  constructor(payload) {
    this._verifyPayload(payload)

    const {
      id,
      content,
      username,
      created_at,
      is_deleted,
    } = payload
    this.id = id
    this.username = username
    this.date = created_at
    this.content = (!is_deleted) ? content : '**komentar telah dihapus**'
  }

  _verifyPayload(payload) {
    if (
      !payload.id ||
      !payload.content ||
      !payload.username ||
      !payload.created_at ||
      !payload.is_deleted === undefined
    ) {
      throw new Error('LIST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (
      typeof payload.id !== 'string' ||
      typeof payload.content !== 'string' ||
      typeof payload.created_at !== 'string' ||
      typeof payload.is_deleted !== 'boolean'
    ) {
      throw new Error('LIST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = ListComment
