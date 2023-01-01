const LoginUserUseCase = require('../../../../Applications/use_case/auth/LoginUserUseCase')
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/auth/RefreshAuthenticationUseCase')
const LogoutUserUseCase = require('../../../../Applications/use_case/auth/LogoutUserUseCase')
const { SUCCESS } = require('../../../../Commons/constants/response')

class AuthenticationsHandler {
  constructor(container) {
    this._container = container

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this)
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this)
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this)
  }

  async postAuthenticationHandler(req, res) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name)
    const { accessToken, refreshToken } = await loginUserUseCase.execute(req.payload)
    const data = { accessToken, refreshToken }
    
    return SUCCESS(res, 201, 'success', 'login berhasil', data)
  }

  async putAuthenticationHandler(req, res) {
    const refreshAuthenticationUseCase = this._container.getInstance(RefreshAuthenticationUseCase.name)
    const accessToken = await refreshAuthenticationUseCase.execute(req.payload)
    const data = { accessToken }

    return SUCCESS(res, 200, 'success', '', data)
  }

  async deleteAuthenticationHandler(req, res) {
    const logoutUseruseCase = this._container.getInstance(LogoutUserUseCase.name)
    await logoutUseruseCase.execute(req.payload)
    
    return SUCCESS(res, 200, 'success', 'logout success')
  }
}

module.exports = AuthenticationsHandler
