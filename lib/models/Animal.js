const pool = require('../utils/pool');

class Animal {
  id;
  name;
  type;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.color = row.color;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM animals;');
    return rows.map((row) => new Animal(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM animals WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Animal(rows[0]);
  }

  static async insert({ name, type, color }) {
    const { rows } = await pool.query('INSERT INTO animals (name, type, color) VALUES ($1, $2, $3) RETURNING *', [name, type, color]);
    return new Animal(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const animal = await Animal.getById(id);
    if (!animal) return null;
    const updateAnimal = { ...animal, ...newAttrs };
    const { rows } = await  pool.query(
      'UPDATE animals SET name = $2, type = $3, color = $4 WHERE id = $1 RETURNING *;',
      [
        id,
        updateAnimal.name,
        updateAnimal.type,
        updateAnimal.color,
      ]
    );
    return new Animal(rows[0]);
  }
}

module.exports = { Animal };
