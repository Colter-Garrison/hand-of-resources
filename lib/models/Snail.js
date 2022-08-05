const pool = require('../utils/pool');

class Snail {
  id;
  name;
  scientific_name;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.scientific_name = row.scientific_name;
    this.image = row.image;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM snails;');
    return rows.map((row) => new Snail(row));
  }
}

module.exports = { Snail };
