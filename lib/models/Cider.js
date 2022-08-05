const pool = require('../utils/pool');

class Cider {
  id;
  name;
  producer;
  location;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.producer = row.producer;
    this.location = row.location;
    this.color = row.color;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cider;');
    return rows.map((row) => new Cider(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cider WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Cider(rows[0]);
  }
}

module.exports = { Cider };
