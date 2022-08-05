const { Router } = require('express');
const { Snail } = require('../models/Snail');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Snail.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
