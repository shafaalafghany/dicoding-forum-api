const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')
const AddedComment = require('../../Domains/comments/entities/AddedComment')
const ListComment = require('../../Domains/comments/entities/ListComment')
const CommentRepository = require('../../Domains/comments/CommentRepository')

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addComment(addComment) {
    const { content, thread, owner } = addComment
    const id = `comment-${this._idGenerator()}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: `
      INSERT INTO comments
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING id, content, owner
      `,
      values: [id, content, owner, thread, createdAt, updatedAt],
    }

    const result = await this._pool.query(query)

    return new AddedComment({ ...result.rows[0] })
  }

  async verifyAvailableIdComment(id) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) throw new NotFoundError('comment tidak ditemukan')
  }

  async deleteComment(id) {
    const updatedAt = new Date().toISOString()
    const content = "**komentar telah dihapus**"
    const query = {
      text: `
      UPDATE comments
      SET is_deleted = true, content = $2, updated_at = $3
      WHERE id = $1
      `,
      values: [id, content, updatedAt],
    }

    await this._pool.query(query)
  }

  async isTrueOwner(id, owner) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1',
      values: [id],
    }

    const result = await this._pool.query(query)
    if (result.rows[0].owner !== owner) throw new AuthorizationError('akses ditolak!')
  }

  async getCommentsByThreadId(thread) {
    const query = {
      text: `
      SELECT c.id, c.content, c.owner, c.thread,
      c.created_at, c.updated_at, c.is_deleted, u.username
      FROM comments c
      JOIN users u ON c.owner = u.id
      WHERE c.thread = $1
      ORDER BY c.created_at ASC
      `,
      values: [thread]
    }

    const result = await this._pool.query(query)
    const comments = result.rows.map((comment) => new ListComment(comment))
    return comments
  }
}

module.exports = CommentRepositoryPostgres
