const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [{
    name: { type: String, trim: true },
  }],
  rounds: [{
    moves: [String],
    winner: {
      name: { type: String, trim: true }
    }
  }],
  winner: {
    name: { type: String, trim: true }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
