const AddCommentUseCase = require('../../../../Applications/use_case/comments/AddCommentUseCase')
const DeleteCommentUseCase = require('../../../../Applications/use_case/comments/DeleteCommentUseCase')
const { SUCCESS } = require('../../../../Commons/constants/response')

class CommentHandler {
  constructor(container) {
    this._container = container

    this.postCommentHandler = this.postCommentHandler.bind(this)
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this)
  }

  async postCommentHandler(req, res) {
    const { id: owner } = req.auth.credentials
    const { threadId: thread } = req.params
    Object.assign(req.payload, { owner, thread })

    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name)
    const addedComment = await addCommentUseCase.execute(req.payload)
    const data = { addedComment }

    return SUCCESS(res, 201, 'success', '', data)
  }

  async deleteCommentHandler(req, res) {
    const { threadId: thread, commentId: id } = req.params
    const { id: owner } = req.auth.credentials
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name)
    await deleteCommentUseCase.execute({ id, thread, owner })

    return SUCCESS(res, 200, 'success', 'delete comment success')
  }
}

module.exports = CommentHandler
