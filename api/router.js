const express = require('express');
const Model = require('./model');

const router = express.Router();

router.get('/:recipe_id', (req, res, next) => {
  Model.getRecipeById(req.params.recipe_id)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
