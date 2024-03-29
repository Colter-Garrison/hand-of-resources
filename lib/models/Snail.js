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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM snails WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Snail(rows[0]);
  }

  static async insert({ name, scientific_name, image }) {
    const { rows } = await pool.query('INSERT INTO snails (name, scientific_name, image) VALUES ($1, $2, $3) RETURNING *', [name, scientific_name, image]);
    return new Snail(rows[0]);    
  }

  static async updateById(id, newAttrs) {
    const snail = await Snail.getById(id);
    if (!snail) return null;
    const updateSnail = { ...snail, ...newAttrs };
    const { rows } = await pool.query(
      'UPDATE snails SET name = $2, scientific_name = $3, image = $4 WHERE id = $1 RETURNING *;',
      [
        id,
        updateSnail.name,
        updateSnail.scientific_name,
        updateSnail.image,
      ]
    );
    return new Snail(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM snails WHERE id = $1 RETURNING *', [id]);
    return new Snail(rows[0]);
  }
}

module.exports = { Snail };
