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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM beer WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Beer(rows[0]);
  }

  static async insert({ name, style,  producer, location }) {
    const { rows } = await pool.query('INSERT INTO beer (name, style,  producer, location) VALUES ($1, $2, $3, $4) RETURNING *', [name, style,  producer, location]);
    return new Beer(rows[0]);    
  }

  static async updateById(id, newAttrs) {
    const beer = await Beer.getById(id);
    if (!beer) return null;
    const updateBeer = { ...beer, ...newAttrs };
    const { rows } = await pool.query(
      'UPDATE beer SET name = $2, style = $3, producer = $4, location = $5 WHERE id = $1 RETURNING *;',
      [
        id,
        updateBeer.name,
        updateBeer.style,
        updateBeer.producer,
        updateBeer.location,
      ]
    );
    return new Beer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM beer WHERE id = $1 RETURNING *', [id]);
    return new Beer(rows[0]);
  }
}

module.exports = { Beer };
