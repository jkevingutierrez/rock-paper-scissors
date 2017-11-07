const mongoose = require('mongoose');

const ParameterSchema = new mongoose.Schema({
  name: { type: String, trim: true, unique: true, required: true },
  value: { type: String, trim: true, required: true },
  type: { type: String, trim: true, default: 'String' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parameter', ParameterSchema);
