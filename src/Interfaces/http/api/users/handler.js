const AddUserUseCase = require('../../../../Applications/use_case/users/AddUserUseCase')
const { SUCCESS } = require('../../../../Commons/constants/response')

class UserHandler {
  constructor(container) {
    this._container = container

    this.postUserHandler = this.postUserHandler.bind(this)
  }

  async postUserHandler(req, res) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name)
    const addedUser = await addUserUseCase.execute(req.payload)
    const data = { addedUser }

    return SUCCESS(res, 201, 'success', '', data)
  }
}

module.exports = UserHandler
