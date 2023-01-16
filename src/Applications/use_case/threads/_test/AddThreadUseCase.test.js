const AddThread = require('../../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const AddThreadUseCase = require('../AddThreadUseCase')

describe('AddThreadUseCase', () => {
  it('it should orchestrating the add thread action correctly', async () => {
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'body sebuah thread',
      owner: 'user-123',
    }
    const expectAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-123',
    })

    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.addThread = jest.fn().mockImplementation(
      () => Promise.resolve(new AddedThread({
        id: 'thread-123',
        title: 'sebuah thread',
        owner: 'user-123',
      })),
    )

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    })

    const addedThread = await addThreadUseCase.execute(useCasePayload)
    expect(addedThread).toStrictEqual(expectAddedThread)
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      title: 'sebuah thread',
      body: 'body sebuah thread',
      owner: 'user-123',
    }))
  })
})
