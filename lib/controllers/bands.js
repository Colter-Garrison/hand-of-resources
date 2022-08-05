const { Router } = require('express');
const { Band } = require('../models/Band');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Band.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
