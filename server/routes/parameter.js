const express = require('express');
const router = express.Router();
const Parameter = require('../models/parameter.js');


/* GET ALL PARAMETERS */
router.get('/', function (req, res, next) {
  Parameter.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PARAMETER BY ID */
router.get('/:id', function (req, res, next) {
  Parameter.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE PARAMETER BY NAME */
router.get('/name/:name', function (req, res, next) {
  Parameter.findOne({name: req.params.name})
    .exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* SAVE PARAMETER */
router.post('/', function (req, res, next) {
  Parameter.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PARAMETER */
router.put('/:id', function (req, res, next) {
  Parameter.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PARAMETER */
router.delete('/:id', function (req, res, next) {
  Parameter.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
