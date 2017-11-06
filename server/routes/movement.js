const express = require('express');
const router = express.Router();
const Movement = require('../models/movement.js');


/* GET ALL MOVEMENTS */
router.get('/', function (req, res, next) {
  Movement.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE MOVEMENT BY ID */
router.get('/:id', function (req, res, next) {
  Movement.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE MOVEMENT BY NAME */
router.get('/name/:name', function (req, res, next) {
  Movement.findOne({ name: req.params.name })
    .exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* SAVE MOVEMENT */
router.post('/', function (req, res, next) {
  Movement.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MOVEMENT */
router.put('/:id', function (req, res, next) {
  Movement.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE MOVEMENT */
router.delete('/:id', function (req, res, next) {
  Movement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
