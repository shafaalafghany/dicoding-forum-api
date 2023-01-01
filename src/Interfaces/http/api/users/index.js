const routes = require('./routes')
const UserHandler = require('./handler')

module.exports = {
  name: 'users',
  register: async (server, { container }) => {
    const userHandler = new UserHandler(container)
    server.route(routes(userHandler))
  }
}
