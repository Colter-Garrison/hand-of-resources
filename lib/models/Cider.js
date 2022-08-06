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

  static async insert({ name, producer, location, color }) {
    const { rows } = await pool.query('INSERT INTO cider (name, producer, location, color) VALUES ($1, $2, $3, $4) RETURNING *', [name, producer, location, color]);
    return new Cider(rows[0]);    
  }

  static async updateById(id, newAttrs) {
    const cider = await Cider.getById(id);
    if (!cider) return null;
    const updateCider = { ...cider, ...newAttrs };
    const { rows } = await pool.query(
      'UPDATE cider SET name = $2, producer = $3, location = $4, color = $5 WHERE id = $1 RETURNING *;',
      [
        id,
        updateCider.name,
        updateCider.producer,
        updateCider.location,
        updateCider.color,
      ]
    );
    return new Cider(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM cider WHERE id = $1 RETURNING *', [id]);
    return new Cider(rows[0]);
  }
}

module.exports = { Cider };
