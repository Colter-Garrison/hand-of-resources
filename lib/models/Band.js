const pool = require('../utils/pool');

class Band {
  id;
  name;
  members;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.members = row.members;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM bands;');
    return rows.map((row) => new Band(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM bands WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Band(rows[0]);
  }

  static async insert({ name, members, genre }) {
    const { rows } = await pool.query('INSERT INTO bands (name, members, genre) VALUES ($1, $2, $3) RETURNING *', [name, members, genre]);
    return new Band(rows[0]);
  }
}

module.exports = { Band };
