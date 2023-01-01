const DetailThread = require('../DetailThread')

describe('a DetailThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'sebuah thread',
    }

    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      body: 123,
      title: 'sebuah thread',
      id: 123,
      created_at: 1,
      username: 1,
      comments: 1,
    }

    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('must create DetailThread object Correctly', () => {
    const payload = {
      body: 'body sebuah thread',
      title: 'sebuah thread',
      id: 'thread-123',
      created_at: '2021-08-08T07:19:09.775Z',
      username: 'dandoeng',
    }

    const {
      body, title, id, date, username,
    } = new DetailThread(payload)

    expect(body).toEqual(payload.body)
    expect(title).toEqual(payload.title)
    expect(id).toEqual(payload.id)
    expect(date).toEqual(payload.created_at)
    expect(username).toEqual(payload.username)
  })
})
