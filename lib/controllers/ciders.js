const { Router } = require('express');
const { Cider } = require('../models/Cider');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Cider.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
