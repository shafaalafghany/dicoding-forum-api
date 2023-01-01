const AddComment = require('../../../../Domains/comments/entities/AddComment')
const AddedComment = require('../../../../Domains/comments/entities/AddedComment')
const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const AddCommentUseCase = require('../AddCommentUseCase')

describe('AddCommentUseCase', () => {
  it('it should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      content: 'sebuah comment',
      thread: 'thread-123',
      owner: 'user-123',
    }
    const expectComment = new AddedComment({
      id: 'comment-123',
      content: 'sebuah comment',
      owner: 'user-123',
    })

    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.verifyAvailableIdThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.addComment = jest.fn().mockImplementation(
      () => Promise.resolve(expectComment),
    )

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    })

    const addedComment = await addCommentUseCase.execute(useCasePayload)
    expect(addedComment).toStrictEqual(expectComment)
    expect(mockThreadRepository.verifyAvailableIdThread).toBeCalledWith(useCasePayload.thread)
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      content: 'sebuah comment',
      thread: 'thread-123',
      owner: 'user-123',
    }))
  })
})
