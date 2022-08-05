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
}

module.exports = { Band };
