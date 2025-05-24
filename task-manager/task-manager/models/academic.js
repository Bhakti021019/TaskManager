const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Academic', academicSchema);
