const ListComment = require('../ListComment')

describe('a ListComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'sebuah thread',
    }

    expect(() => new ListComment(payload)).toThrowError('LIST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      content: 'sebuah thread',
      username: 123,
      created_at: 232,
      is_deleted: 121,
    }

    expect(() => new ListComment(payload)).toThrowError('LIST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('must create ListComment object Correctly', () => {
    const payload = {
      id: 'comment-123',
      content: 'comment sebuah thread',
      username: 'dandung',
      is_deleted: true,
      created_at: '2021-08-08T07:19:09.775Z',
    }

    const { id, content, username, date } = new ListComment(payload)

    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(date).toEqual(payload.created_at)
    expect(content).toEqual('**komentar telah dihapus**')
  })

  it('must create ListComment object Correctly when is_delete is false', () => {
    const payload = {
      id: 'comment-123',
      content: 'comment sebuah thread',
      username: 'dandung',
      is_deleted: false,
      created_at: '2021-08-08T07:19:09.775Z',
    };

    const {
      id, content, username, date,
    } = new ListComment(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.created_at);
    expect(content).toEqual(payload.content);
  });
})
