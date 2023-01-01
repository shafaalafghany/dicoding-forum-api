/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    content = 'example',
    owner = 'user-123',
    thread = 'thread-123',
    createdAt = '2022-12-17T07:19:09.775Z',
    updatedAt = '2022-12-17T07:19:09.775Z',
    isDeleted = false,
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6, $7)',
      values: [id, content, owner, thread, createdAt, updatedAt, isDeleted],
    }

    await pool.query(query)
  },

  async findCommentById(id) {
    const query = {
      text: `
      SELECT id, content, owner, thread,
      created_at, updated_at, is_deleted
      FROM comments
      WHERE id = $1
      `,
      values: [id],
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1 = 1')
  },
}

module.exports = CommentsTableTestHelper
