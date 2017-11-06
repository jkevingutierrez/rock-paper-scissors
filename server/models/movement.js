const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  kills: { type: String, trim: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Move', MovementSchema);
