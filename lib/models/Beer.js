const pool = require('../utils/pool');

class Beer {
  id;
  name;
  style;
  producer;
  location;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.style = row.style;
    this.producer = row.producer;
    this.location = row.location;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM beer;');
    return rows.map((row) => new Beer(row));
  }
}

module.exports = { Beer };
