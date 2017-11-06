const mongoose = require('mongoose');

const ParameterSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  value: { type: String, trim: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parameter', ParameterSchema);
