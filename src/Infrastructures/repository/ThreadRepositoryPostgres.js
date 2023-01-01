const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AddedThread = require('../../Domains/threads/entities/AddedThread')
const DetailThread = require('../../Domains/threads/entities/DetailThread')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addThread(addThread) {
    const { title, body, owner } = addThread
    const id = `thread-${this._idGenerator()}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: `
      INSERT INTO threads
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING id, title, owner
      `,
      values: [id, title, body, owner, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    return new AddedThread({ ...result.rows[0] })
  }

  async verifyAvailableIdThread(id) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) throw new NotFoundError('thread tidak ditemukan')
  }

  async getDetailThread(id, comments) {
    const query = {
      text: `
      SELECT t.id, t.title, t.body, t.owner,
      t.created_at, t.updated_at, u.username
      FROM threads t
      JOIN users u ON t.owner = u.id
      WHERE t.id = $1
      `,
      values: [id],
    }
    
    const result = await this._pool.query(query)
    const thread = { ...result.rows[0], comments }
    return new DetailThread(thread)
  }
}

module.exports = ThreadRepositoryPostgres
