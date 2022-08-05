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
  });
