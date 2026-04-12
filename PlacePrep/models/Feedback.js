const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String, default: 'Anonymous' },
  suggestion: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
