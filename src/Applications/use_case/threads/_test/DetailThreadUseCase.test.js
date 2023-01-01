const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const ListComment = require('../../../../Domains/comments/entities/ListComment')
const DetailThread = require('../../../../Domains/threads/entities/DetailThread')
const DetailThreadUseCase = require('../DetailThreadUseCase')

describe('DetailThreadUseCase', () => {
  it('it should orchecstrating the get detail action correctly', async () => {
    const threadId = 'thread-123'
    const mockListComment = [
      new ListComment({
        id: 'comment-123',
        content: 'sebuah comment',
        username: 'dicoding',
        created_at: '2021-08-09T07:19:09.775Z',
        is_deleted: true,
      }),
    ]
    const mockDetailThread = new DetailThread({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'body sebuah thread',
      username: 'dicoding',
      created_at: '2021-08-09T07:19:09.775Z',
    })

    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.verifyAvailableIdThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockListComment))
    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailThread))

    const detailThreadUseCase = new DetailThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    })
    const detailThread = await detailThreadUseCase.execute(threadId)

    expect(detailThread).toStrictEqual({ ...mockDetailThread, comments: mockListComment })
    expect(mockThreadRepository.verifyAvailableIdThread).toBeCalledWith(threadId)
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(threadId)
    expect(mockThreadRepository.getDetailThread).toBeCalledWith(threadId)
  })
})
