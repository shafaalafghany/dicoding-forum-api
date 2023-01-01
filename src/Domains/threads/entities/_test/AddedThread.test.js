const AddedThread = require('../AddedThread')

describe('a Added entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'thread-123',
      title: 'sebuah thread',
    }

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      title: 'sebuah thread',
      owner: 123,
    }

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create addedThread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-123',
    }

    const { id, title, owner } = new AddedThread(payload)

    expect(id).toEqual(payload.id)
    expect(title).toEqual(payload.title)
    expect(owner).toEqual(payload.owner)
  })
})
