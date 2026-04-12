const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  correct: {
    type: Number,
    required: true
  },
  wrong: {
    type: Number,
    required: true
  },
  skipped: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number,
    required: true
  },
  breakdown: {
    type: Array, // Could be more strongly typed but Array prevents strictly restricting the schema
    default: []
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
