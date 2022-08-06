const { Router } = require('express');
const { Animal } = require('../models/Animal');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Animal.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Animal.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Animal.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
