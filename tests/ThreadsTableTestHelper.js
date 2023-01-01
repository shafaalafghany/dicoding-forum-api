/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const ThreadsTableTestHelper = {
  async addThread({
    id = 'comment-123',
    title = 'example',
    body = 'example',
    owner = 'user-123',
    createdAt = '2022-12-17T07:19:09.775Z',
    updatedAt = '2022-12-17T07:19:09.775Z'
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, title, body, owner, createdAt, updatedAt],
    }

    await pool.query(query)
  },

  async findThreadById(id) {
    const query = {
      text: 'SELECT id, title, body, owner, created_at, updated_at FROM threads WHERE id = $1',
      values: [id],
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1 = 1')
  },
}

module.exports = ThreadsTableTestHelper
