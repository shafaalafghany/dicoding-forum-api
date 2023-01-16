const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const pool = require('../../database/postgres/pool')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const AddThread = require('../../../Domains/threads/entities/AddThread')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addThread function', () => {
    it('should persist add thread correctly', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' })
      const addThread = new AddThread({
        title: 'sebuah thread',
        body: 'body sebuah thread',
        owner: 'user-123',
      })

      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
      await threadRepositoryPostgres.addThread(addThread)
      const threads = await ThreadsTableTestHelper.findThreadById('thread-123')
      expect(threads).toHaveLength(1)
    })

    it('should return add thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' })
      const addThread = new AddThread({
        title: 'sebuah thread',
        body: 'body sebuah thread',
        owner: 'user-123',
      })
      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread)

      // Assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'sebuah thread',
        owner: 'user-123',
      }))
    })

    describe('function verifyAvailableIdThread', () => {
      it('should not throw NotFoundError when id exist', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' })
        await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        await expect(threadRepositoryPostgres.verifyAvailableIdThread('thread-123')).resolves.not.toThrowError(NotFoundError)
      })

      it('should throw NotFoundError when id not exist', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        await expect(threadRepositoryPostgres.verifyAvailableIdThread('thread-123')).rejects.toThrowError(NotFoundError)
      })
    })
  })

  describe('function getDetailThread', () => {
    it('should persis get detail thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' })
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' })
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

      // Action
      const thread = await threadRepositoryPostgres.getDetailThread('thread-123')
      // Arrange
      expect(thread.id).toEqual('thread-123')
      expect(thread.title).toEqual('example')
      expect(thread.body).toEqual('example')
      expect(thread.date).toEqual('2022-12-17T07:19:09.775Z')
      expect(thread.username).toEqual('dicoding')
    })
  })
})
