const mongoose = require('mongoose');

const tattoueurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  style: String,
  location: String
});

module.exports = mongoose.model('Tattoueur', tattoueurSchema);
