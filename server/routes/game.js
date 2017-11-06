const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');


/* GET ALL GAMES */
router.get('/', function (req, res, next) {
  Game.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE GAME BY ID */
router.get('/:id', function (req, res, next) {
  Game.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE GAME */
router.post('/', function (req, res, next) {
  Game.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE GAME */
router.put('/:id', function (req, res, next) {
  Game.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE GAME */
router.delete('/:id', function (req, res, next) {
  Game.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
