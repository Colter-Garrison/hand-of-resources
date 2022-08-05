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
}

module.exports = { Cider };
