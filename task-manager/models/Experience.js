const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Experience', experienceSchema);
