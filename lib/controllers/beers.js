const { Router } = require('express');
const { Beer } = require('../models/Beer');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Beer.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Beer.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });