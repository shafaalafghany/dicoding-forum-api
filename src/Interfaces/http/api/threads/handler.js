const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase')
const DetailThreadUseCase = require('../../../../Applications/use_case/threads/DetailThreadUseCase')
const { SUCCESS } = require('../../../../Commons/constants/response')

class ThreadHandler {
  constructor(container) {
    this._container = container

    this.postThreadHandler = this.postThreadHandler.bind(this)
    this.getThreadHandler = this.getThreadHandler.bind(this)
  }

  async postThreadHandler(req, res) {
    const { id: owner } =  req.auth.credentials
    Object.assign(req.payload, { owner })
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)
    const addedThread = await addThreadUseCase.execute(req.payload)
    const data = { addedThread }

    return SUCCESS(res, 201, 'success', '', data)
  }

  async getThreadHandler(req, res) {
    const { threadId } = req.params
    const detailThreadUseCase = this._container.getInstance(DetailThreadUseCase.name)
    const thread = await detailThreadUseCase.execute(threadId)
    const data = { thread }

    return SUCCESS(res, 200, 'success', '', data)
  }
}

module.exports = ThreadHandler
